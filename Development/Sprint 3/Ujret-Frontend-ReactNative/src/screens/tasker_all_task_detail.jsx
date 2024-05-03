//  TaskProviderScreen.js

import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
// Component imports
import H2Large from '../components/atoms/headings/h2_large';
import H6XSmall from '../components/atoms/headings/h6_xsmall';

import TaskDetailCard from '../components/organisms/headers/task_detail_card'; // Correct the path to your TaskDetailCard component if necessary
import TopBackStrip from '../components/molecules/top_back_button_strip';
import TaskRequestCard from '../components/organisms/headers/task_request_card';
import LargeBtn from '../components/atoms/buttons/large_btn';
import SortButtonTwo from '../components/molecules/sort_button';

// Theme and style imports
import {Colors, ColorsLight} from '../themes/colors';
import {filterContainer} from '../themes/allstyles/components';

// Redux
import {useSelector} from 'react-redux';

// API
import {getRelevantTasks} from '../api_layer/tasks_apis';

// Component for the TaskProviderScreen
const TaskProviderScreen = ({navigation}) => {
  const [taskOffers, setTaskOffers] = useState([]);
  const [sortingOption, setSortingOption] = useState(null);

  // Fetching Handyman fron Redux
  const handymanInfo = useSelector(state => state.handyman.handymanInfo);
  console.log('handymanInfo:', handymanInfo);

  // Task Offers Sorting by Created At
  const sortBidsByCreatedAt = (bids, ascending = false) => {
    return bids.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      if (ascending) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  };

  // Task Offers Sorting by Price
  const sortBidsByPrice = (bids, ascending = false) => {
    return bids.sort((a, b) => {
      if (ascending) {
        return a.budget - b.budget;
      } else {
        return b.budget - a.budget;
      }
    });
  };

  // UseEffect
  useEffect(() => {
    handleFetchAllTasks();
  }, [navigation]);

  // Fetch task bids for the current task
  const handleFetchAllTasks = async () => {
    try {
      // Call the getThisTaskBids API with the task ID
      console.log(
        'handymanInfo category on TaskProviderScreen:',
        handymanInfo.categories,
      );
      const tasks = await getRelevantTasks(handymanInfo.categories);

      // Sort the bids by created_at
      const sortedTasks = sortBidsByCreatedAt(tasks.data);

      // Calculate the time elapsed since bid creation
      const currentTime = new Date();
      const updatedTasks = sortedTasks.map(task => {
        const createdTime = new Date(task.createdAt);
        const timeElapsed = Math.floor(
          (currentTime - createdTime) / (1000 * 60),
        ); // in minutes
        return {
          ...task,
          timeElapsed: timeElapsed,
        };
      });

      // Update the state with sorted and updated bids
      console.log('updatedTasks:', updatedTasks);
      setTaskOffers(updatedTasks);
      setSortingOption('');
    } catch (error) {
      // Alert.alert('Info', `Failed to fetch task bids: ${error.message}`);
      console.log(error);
    }
  };

  const handleViewDetails = task => {
    navigation.navigate('TaskerResponce', {task: task});
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
        <H2Large color={ColorsLight.primaryBlack}>Task</H2Large>
      </View>
      <View
        style={[filterContainer.mainContainer, {justifyContent: 'flex-start'}]}>
        <H6XSmall color={ColorsLight.primaryBlack} marginRight={10}>
          Sort By:
        </H6XSmall>
        <SortButtonTwo
          text={'Price'}
          onPress={() => {
            setTaskOffers(sortBidsByPrice(taskOffers));
          }}
          active={sortingOption === 'price'}
        />
      </View>

      <View style={{alignItems: 'center', marginVertical: 16}}>
        <LargeBtn
          text={taskOffers.length === 0 ? 'Load Tasks' : 'Load More Tasks'}
          onPress={handleFetchAllTasks}
        />
      </View>

      {/* Task Request cards */}
      {taskOffers.map(task => (
        <TaskRequestCard
          key={task.task_id}
          task={task}
          onViewDetails={() => {
            handleViewDetails(task);
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

export default TaskProviderScreen;

// import React, {useState} from 'react';
// import {View, Text, StyleSheet, FlatList, Alert, Button} from 'react-native';
// import TaskDetailCard from '../components/organisms/headers/task_detail_card'; // Make sure this path is correct

// const TaskProviderScreen = ({navigation}) => {
//   const [availableTasks, setAvailableTasks] = useState([]);

//   // Function to fetch tasks from backend
//   const fetchTasks = async () => {
//     try {
//       // Replace 'your-backend-endpoint' with the actual endpoint
//       const response = await fetch('https://your-backend-endpoint.com/tasks');
//       const tasks = await response.json();
//       setAvailableTasks(tasks);
//     } catch (error) {
//       console.error('Failed to fetch tasks:', error);
//       Alert.alert('Error', 'Failed to fetch tasks from the server');
//     }
//   };

//   const handleSelectTask = task => {
//     // Pass the entire task object to the next screen
//     navigation.navigate('TaskerResponse', {task});
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Available Tasks</Text>
//         <Button title="Fetch Tasks" onPress={fetchTasks} />
//       </View>
//       <FlatList
//         data={availableTasks}
//         keyExtractor={item => item.task_id.toString()}
//         renderItem={({item}) => (
//           <TaskDetailCard task={item} onSelect={() => handleSelectTask(item)} />
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     padding: 20,
//     alignItems: 'center',
//     backgroundColor: '#0D5C5E',
//     color: '#fff',
//     borderBottomRightRadius: 20,
//     borderBottomLeftRadius: 20,
//     textDecorationColor: '#fff',
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   // ... additional styles
// });

// export default TaskProviderScreen;
