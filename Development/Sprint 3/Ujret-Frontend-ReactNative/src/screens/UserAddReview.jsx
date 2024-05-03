import React, {useState, useEffect} from 'react';
import {Text, TextInput, View, StyleSheet, Alert} from 'react-native';
import {Colors, ColorsLight} from '../themes/colors';
import ReviewStars from '../components/molecules/review-stars';
import H3Main from '../components/atoms/headings/h3_main';
import H5Small from '../components/atoms/headings/h5_small';
import {
  H5SmallStyles,
  H2LargeStyles,
  inputFieldStyles,
  registerMoreInfoScreenStyle,
} from '../themes/styles';
import LargeBtn from '../components/atoms/buttons/large_btn';

import {Metrics} from '../themes/metrics';
import {useSelector} from 'react-redux';

// Apis
import {addReview} from '../api_layer/review_apis';

const UserAddReview = ({navigation}) => {
  // Fetched fron redux
  const taskInfo = useSelector(state => state.task.taskInfo);
  const userInfo = useSelector(state => state.user.userInfo);

  // State variables
  const [review, setReview] = useState(
    'Really Good Experience! Recommend to everyone!',
  );
  const [rating, setRating] = useState(0);

  const handleSubmit = async () => {
    console.log('submitted', rating, review, taskInfo.handymanId, userInfo.uid);

    try {
      const response = await addReview({
        handymanId: taskInfo.handymanId,
        userId: userInfo.uid,
        rating,
        review,
      });
      console.log('response', response);

      // Alert user about successful update
      Alert.alert('Success', `${response.message}, Go back to Home Screen`, [
        {
          text: 'OK',
          onPress: () => {
            // Navigate to HandymenHome screen
            navigation.navigate('HandymenHome');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', `Failed to add review ${error.message}`);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <H3Main color={Colors.primaryColor}>Leave a Review for</H3Main>
        <Text style={styles.taskerNameText}>
          {taskInfo.handymanName.split(' ')[0]}
        </Text>
      </View>
      <View style={styles.rating}>
        <View style={styles.ratingHeading}>
          <H5Small>Ratings</H5Small>
        </View>
        <View style={styles.reviewStars}>
          <ReviewStars rating={rating} setRating={setRating} />
        </View>
      </View>
      <View style={inputFieldStyles.outerContainer}>
        <Text style={H5SmallStyles.textStyle}>Review</Text>
        <TextInput
          placeholderTextColor="grey"
          placeholder="Really Good Experience! Recommend to everyone!"
          value={review}
          onChangeText={setReview}
          style={[
            inputFieldStyles.textInputStyles.description,
            {
              height: Math.max(35, review.split('\n').length * 100),
              color: ColorsLight.primaryBlack,
            },
          ]}
          multiline={true}
        />
      </View>
      <View style={registerMoreInfoScreenStyle.buttonsContainer}>
        <LargeBtn text={'Submit'} onPress={handleSubmit} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: Metrics.baseMargin,
  },
  header: {
    alignItems: 'center',
    paddingTop: Metrics.large_padding,
  },
  taskerNameText: {
    marginVertical: Metrics.small_margin,
    ...H2LargeStyles.textStyle,
  },
  rating: {
    marginVertical: Metrics.large_margin,
  },
  ratingHeading: {
    alignItems: 'flex-start',
  },
  reviewStars: {
    alignItems: 'center',
  },
});
export default UserAddReview;
