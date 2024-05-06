import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Linking,
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  H4SubMainStyles,
  H6XSmallStyles,
  registerMoreInfoScreenStyle,
  ujretStyles,
} from '../themes/styles';
import TopBackStrip from '../components/molecules/top_back_button_strip';
import Ionicons from 'react-native-vector-icons/Ionicons';
import H4SubMain from '../components/atoms/headings/h4_sub_main';
import P2Main from '../components/atoms/paragraphs/p2_main';
import P3Small from '../components/atoms/paragraphs/p3_small';
import H2Large from '../components/atoms/headings/h2_large';
import H7XXSmall from '../components/atoms/headings/h7_xxsmall';

// theme and style imports
import {scaleSize} from './../themes/metrics';
import {ColorsLight, Colors} from '../themes/colors';
import {Metrics} from './../themes/metrics';
import {H2MainStyles, H7XXSmallStyles} from '../themes/styles';

// API layer
import {getHandymanCompleteProfile} from '../api_layer/handymen_apis';

const TaskerProfileViewScreen = ({navigation, route}) => {
  // Get route params
  const {handymanId} = route.params;
  console.log('Handyman ID:', handymanId);

  // State variable
  const [handymanDetails, setHandymanDetails] = useState(null);

  // Fetching tasker/Handynan details from the backend through API layer
  useEffect(() => {
    const fetchTaskerDetails = async () => {
      try {
        const response = await getHandymanCompleteProfile(handymanId);
        console.log('Tasker details:', response);

        // Set the tasker details in the state variable if Successful event
        if (response.status_code === 200) {
          setHandymanDetails(response.data);
          // setLoading(true);
        } else {
          Alert.alert(
            'Error',
            `Could not fetch tasker details here ${response.data.message}`,
            [
              {
                text: 'OK',
                onPress: () => {
                  // Navigate back to the last screen
                  navigation.goBack();
                },
              },
            ],
          );
        }
      } catch (error) {
        Alert.alert(
          'Error',
          `Could not fetch tasker details ${error.message}`,
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigate back to the last screen
                navigation.goBack();
              },
            },
          ],
        );
      }
    };

    fetchTaskerDetails();
  }, []);

  const openWhatsApp = (text, phoneNumber) => {
    // The number must be in international format
    const url = `whatsapp://send?text=${encodeURIComponent(
      text, // change this text, if needed
    )}&phone=${phoneNumber}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'WhatsApp is not installed');
    });
  };
  // Placeholder function for the call action
  const makeCall = phoneNumber => {
    let url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to make a call');
    });
  };

  const renderStars = rating => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <View key={i}>
          <Ionicons
            name={i < rating ? 'star' : 'star-outline'}
            size={15}
            color={i < rating ? ColorsLight.yellow1 : ColorsLight.grey3}
          />
        </View>,
      );
    }
    return stars;
  };

  // Task Offers Sorting by Created At
  const sortReviewsByCreatedAt = (reviews, ascending = false) => {
    return reviews.sort((a, b) => {
      const dateA = new Date(a.review_created_at);
      const dateB = new Date(b.review_created_at);
      if (ascending) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  };

  if (!handymanDetails) {
    // Render a loading indicator while fetching data
    return (
      <View
        contentContainerStyle={{
          backgroundColor: ColorsLight.primaryWhite,
          alignItems: 'center',
          justifyContent: 'center',
          verticalAlign: 'center',
        }}>
        <ActivityIndicator size="large" color={ColorsLight.green3} />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: ColorsLight.primaryWhite,
        flexGrow: 2,
      }}>
      {/* Top gradient background */}
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.9, y: 1.0}}
        locations={[0, 0.6]}
        colors={ujretStyles.moduleCon.gradientColors}
        style={registerMoreInfoScreenStyle.topContainer}>
        {/* Top back button strip */}
        <View style={registerMoreInfoScreenStyle.topStripOuter}>
          <TopBackStrip
            navigation={navigation}
            variant={'white'}></TopBackStrip>
        </View>
        <View style={styles.topContainerText}>
          <View style={styles.taskerRatingWrapper}>
            <Text style={styles.taskerNameText}>
              {handymanDetails.handyman_name.split(' ')[0]}
            </Text>
            <View style={styles.rating}>
              {renderStars(handymanDetails.rating)}
              <Text
                style={{
                  ...H7XXSmallStyles.textStyle,
                  color: ColorsLight.primaryWhite,
                  margin: 0,
                  padding: 0,
                  marginLeft: 4,
                }}>
                ({Math.ceil(handymanDetails.rating)})
              </Text>
            </View>
          </View>
          <View style={styles.contactIcons}>
            <View style={styles.iconWrapper}>
              <TouchableOpacity
                onPress={() => makeCall(handymanDetails.handyman_phone_number)}>
                <Ionicons
                  name="call-outline"
                  size={20}
                  color={Colors.primaryColor}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.iconWrapper}>
              <TouchableOpacity
                onPress={() =>
                  openWhatsApp(
                    `Hello ${
                      handymanDetails.handyman_name.split(' ')[0]
                    } ! I found you on Ujret and I need your help with a task. Can you help me with this?`,
                    handymanDetails.handyman_phone_number,
                  )
                }>
                <Ionicons
                  name="logo-whatsapp"
                  size={20}
                  color={Colors.primaryColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'space-between',
          width: '60%',
        }}>
        <View
          style={{
            width: scaleSize(120),
          }}>
          <LinearGradient
            start={{x: 0.0, y: 0.0}}
            end={{x: 1.0, y: 1.0}}
            colors={ujretStyles.moduleCon.gradientColors}
            style={{
              padding: Metrics.mediumPadding,
              borderRadius: 12,
            }}>
            <H2Large color={ColorsLight.primaryWhite}>
              {handymanDetails.total_tasks_completed}
            </H2Large>
            <H7XXSmall color={ColorsLight.primaryWhite}>Tasks Done</H7XXSmall>
          </LinearGradient>
        </View>
        <View
          style={{
            width: scaleSize(120),
          }}>
          <LinearGradient
            start={{x: 0.0, y: 0.0}}
            end={{x: 1.0, y: 1.0}}
            colors={ujretStyles.moduleCon.gradientColors}
            style={{
              padding: Metrics.mediumPadding,
              borderRadius: 12,
            }}>
            <H2Large color={ColorsLight.primaryWhite}>
              {Math.ceil(handymanDetails.days_since_created)}
            </H2Large>
            <H7XXSmall color={ColorsLight.primaryWhite}>Days Spent</H7XXSmall>
          </LinearGradient>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View>
          <Text style={styles.heading}>About</Text>
          <P2Main>{handymanDetails.about}</P2Main>
        </View>
        <View style={styles.reviewsContainer}>
          <Text style={styles.heading}>Review</Text>
          {sortReviewsByCreatedAt(handymanDetails.reviews).map(
            (review, index) => {
              return (
                <View key={index} style={styles.reviewContainer}>
                  <View style={styles.header}>
                    <Text style={styles.subHeading}>
                      {review.reviewer_name.split(' ')[0]}
                    </Text>
                    <View style={styles.rating}>
                      {renderStars(review.rating)}
                    </View>
                  </View>
                  <P2Main>{review.review}</P2Main>
                </View>
              );
            },
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topContainerText: {
    paddingVertical: Metrics.x_large_Padding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskerNameText: {
    fontSize: Metrics.heading_font,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: Metrics.small_margin,
  },
  iconWrapper: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 15,
  },
  contactIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Metrics.medium_margin,
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    verticalAlign: 'center',
  },
  taskerRatingWrapper: {
    marginVertical: Metrics.large_margin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    alignItems: 'flex-start',
    margin: Metrics.baseMargin,
  },
  reviewsContainer: {
    marginVertical: Metrics.medium_margin,
    width: '100%',
  },
  reviewContainer: {
    paddingVertical: Metrics.smallPadding,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: ColorsLight.grey3,
  },
  heading: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: ColorsLight.primaryBlack,
  },
  subHeading: {
    ...H6XSmallStyles.textStyle,
    color: ColorsLight.primaryBlack,
    textAlign: 'left',
    fontFamily: 'Poppins-SemiBold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default TaskerProfileViewScreen;
