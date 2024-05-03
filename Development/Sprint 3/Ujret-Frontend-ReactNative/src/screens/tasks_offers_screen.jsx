// Task Offers Screen
// React and React Native imports
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';

// Component imports
import H2Large from '../components/atoms/headings/h2_large';
import H6XSmall from '../components/atoms/headings/h6_xsmall';
import H3Main from '../components/atoms/headings/h3_main';
import PrimaryButton from '../components/atoms/buttons/primary_button';
import SortButton from '../components/atoms/buttons/small_btn_text';
import PriceFilterAtom from '../components/atoms/buttons/price_filter_button';
import TopBackStrip from '../components/molecules/top_back_button_strip';
import TaskOfferCard from '../components/organisms/headers/task_offers_card';
import LargeBtn from '../components/atoms/buttons/large_btn';
import SortButtonTwo from '../components/molecules/sort_button';

// Theme and style imports
import {Colors, ColorsLight} from '../themes/colors';
import {filterContainer} from '../themes/allstyles/components';
import {
  screenContainerStyleWhite,
  H6XSmallStyles,
  H5SmallStyles,
} from '../themes/styles';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {setTask} from '../stores/task_slice';

// API
import {
  getThisTaskBids,
  acceptTaskBid,
  declineTaskBid,
} from '../api_layer/tasks_apis';

// Main screen component
const TasksOffersScreen = ({navigation}) => {
  const [taskOffers, setTaskOffers] = useState([]);

  // Dispatch
  const dispatch = useDispatch();

  // Extract the task data from the Redux store
  const taskInfo = useSelector(state => state.task.taskInfo);
  console.log('Task data:', taskInfo);

  // State variable to track the current sorting option
  const [sortingOption, setSortingOption] = useState(null);

  // Task Offers Sorting by Created At
  const sortBidsByCreatedAt = (bids, ascending = false) => {
    return bids.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      if (ascending) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  };

  // Task Offers Sorting by Price
  const sortBidsByPrice = (bids, ascending = true) => {
    return bids.sort((a, b) => {
      if (ascending) {
        return a.amount - b.amount;
      } else {
        return b.amount - a.amount;
      }
    });
  };

  // Task Offers Sorting by Rating
  const sortBidsByRating = (bids, ascending = true) => {
    return bids.sort((a, b) => {
      if (ascending) {
        return a.rating - b.rating;
      } else {
        return b.rating - a.rating;
      }
    });
  };

  // Handle Sorting clicked
  const handleSortingBy = sortBy => {
    switch (sortBy) {
      case 'price':
        setSortingOption('price');
        setTaskOffers(sortBidsByPrice(taskOffers));
        break;
      case 'rating':
        setSortingOption('rating');
        setTaskOffers(sortBidsByRating(taskOffers));
        break;
      // case 'createdAt':
      //   setSortingOption('createdAt');
      //   setTaskOffers(sortBidsByCreatedAt(taskOffers));
      //   break;
      default:
        break;
    }
  };

  // Fetch task bids for the current task
  const handleFetchThisTaskBids = async () => {
    try {
      // Call the getThisTaskBids API with the task ID
      const taskBids = await getThisTaskBids((taskId = taskInfo.taskId));
      console.log('Task bids:', taskBids.data);

      // Sort the bids by created_at
      const sortedBids = sortBidsByCreatedAt(taskBids.data);

      // Calculate the time elapsed since bid creation
      const currentTime = new Date();
      const updatedBids = sortedBids.map(bid => {
        const createdTime = new Date(bid.created_at);
        const timeElapsed = Math.ceil(
          (currentTime - createdTime) / (1000 * 60),
        ); // in minutes
        return {
          ...bid,
          timeElapsed: timeElapsed,
        };
      });

      // Update the state with sorted and updated bids
      setTaskOffers(updatedBids);
      setSortingOption('');
    } catch (error) {
      Alert.alert('Info', `Bid List Empty, ${error.message}`);
    }
  };

  // Handle accepting an offer
  const handleAcceptOffer = async updatedDetails => {
    try {
      const response = await acceptTaskBid(updatedDetails.bidId);
      console.log('Accept task bid response:', response);

      // If the bid was accepted successfully, Dispatch the TaskInfo to the store
      if (response.status_code === 201) {
        dispatch(
          setTask({...taskInfo, ...updatedDetails, taskStatus: 'INPROGRESS'}),
        );

        // Navigate to TaskAccept screen
        navigation.navigate('TaskAccept');
        console.log('Bid Accepted !');
      }
    } catch (error) {
      Alert.alert('Info', `Failed to accept task bid: ${error.message}`);
    }
  };

  // Handle declining an offer
  const handleDeclineOffer = async bidId => {
    try {
      const response = await declineTaskBid(bidId);
      console.log('Decline task bid response:', response);

      if (response.status_code === 201) {
        //  remove the declined bid from the taskOffers state
        const updatedTaskOffers = taskOffers.filter(
          offer => offer.bid_id !== bidId,
        );
        setTaskOffers(updatedTaskOffers);
      }
    } catch (error) {
      Alert.alert('Info', `Failed to decline task bid: ${error.message}`);
    }
  };

  return (
    <ScrollView style={styles.screenContainer}>
      {/* Top back navigation strip */}
      <View
        style={{
          alignItems: 'center',
          marginVertical: 16,
          paddingHorizontal: 20,
        }}>
        <TopBackStrip navigation={navigation} />
      </View>

      {/* Title section */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <H2Large color={ColorsLight.primaryGreen}>Pick Your </H2Large>
        <H2Large color={ColorsLight.primaryBlack}>Tasker</H2Large>
      </View>
      <View style={filterContainer.mainContainer}>
        <H6XSmall color={ColorsLight.primaryBlack}>Sort By:</H6XSmall>
        <SortButtonTwo
          text={'Rating'}
          onPress={() => {
            handleSortingBy('rating');
          }}
          active={sortingOption === 'rating'}
        />
        <SortButtonTwo
          text={'Price'}
          onPress={() => {
            handleSortingBy('price');
            console.log('Sorting by price');
          }}
          active={sortingOption === 'price'}
        />
      </View>

      <View style={{alignItems: 'center', marginVertical: 16}}>
        <LargeBtn
          text={taskOffers.length === 0 ? 'Load Bids' : 'Load More Bids'}
          onPress={handleFetchThisTaskBids}
        />
      </View>

      {/* Task offer cards */}
      {taskOffers.map(offer => (
        <TaskOfferCard
          key={offer.bid_id} // use bid_id for unique key
          description={offer.description}
          handyman_name={offer.handyman_name}
          handyman_number={offer.handyman_number}
          price={offer.amount} // Assuming price should be amount from the data
          rating={offer.handyman_rating}
          reviewsCount={offer.handyman_reviews_count}
          time={offer.timeElapsed}
          // Implement onAccept and onDecline and pass down to TaskOfferCard
          onAccept={() => {
            /* Implement accept offer functionality */
            console.log('Accept offer:', offer.bid_id);
            const updatedDetails = {
              createdAt: offer.created_at,
              bidId: offer.bid_id,
              bidPrice: offer.amount,
              bidDescription: offer.description,
              handymanId: offer.handyman_id,
              handymanName: offer.handyman_name,
              handymanPhoneNumber: offer.handyman_number,
            };
            handleAcceptOffer(updatedDetails);
          }}
          onDecline={() => {
            /* Implement decline offer functionality */
            console.log('Declined offer:', offer.bid_id);
            handleDeclineOffer(offer.bid_id);
          }}
          onShowProfile={() => {
            console.log('Show profile:', offer.handyman_id);
            // Implement navigation to TaskerProfileViewScreen
            navigation.navigate('TaskerProfileViewScreen', {
              handymanId: offer.handyman_id,
            });
          }}
        />
      ))}
    </ScrollView>
  );
};

// Styles for the TasksOffersScreen component
const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    horizontalAlign: 'center',
    padding: 4,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  // Add any additional styles you may need for the screen
});

export default TasksOffersScreen;
