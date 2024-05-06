import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements'; // Import Icon from react-native-elements

// Themes and Styles Import
import {ColorsLight} from '../../../themes/colors';
import {
  H3MainStyles,
  H4SubMainStyles,
  H5SmallStyles,
  P2MainStyles,
} from '../../../themes/styles';

// Define the given colors directly in the component for simplicity
const Colors = {
  primaryColor: '#0D5C5E',
  secondaryColor: '#0A7A7B',
  background: '#FFFFFF',
  text: '#000000',
  activeDot: '#FF6347',
  inactiveDot: '#0D5C5E',
  inputColor: '#EAFFF9',
  borderColor: '#ddd',
  greyColor: 'grey',
};

const TaskOfferCard = ({
  description,
  bid_id,
  handyman_id,
  task_id,
  handyman_name,
  handyman_number,
  price,
  rating,
  reviewsCount,
  time,
  onAccept,
  onDecline,
  onShowProfile,
}) => {
  // Ensure rating is within the range of 0 to 5
  const sanitizedRating = Math.max(0, Math.min(5, rating));

  // Render star icons based on the rating
  const renderStars = () => {
    const stars = [];
    const ceilRating = Math.ceil(sanitizedRating); // Round up the sanitized rating
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= ceilRating ? 'star' : 'star-outline'} // Use filled star for rating and outline for the rest
          type="ionicon"
          size={20}
          color={ColorsLight.yellow1}
        />,
      );
    }
    return stars;
  };

  return (
    <View style={styles.card}>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={() => {
            onShowProfile();
          }}>
          <Text style={styles.name}>{handyman_name.split(' ')[0]}</Text>
        </TouchableOpacity>
        <Text style={styles.price}>PKR {price}</Text>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.ratingContainer}>
          {/* Render star icons representing the rating */}
          <View style={styles.starContainer}>{renderStars()}</View>
          <Text style={styles.ratingText}>({reviewsCount} reviews)</Text>
        </View>
        <Text style={styles.timeText}>{time} m ago</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.detail}>Contact: {handyman_number}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.description}>Bid Description: {description}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonDecline}
          onPress={() => {
            onDecline();
          }}>
          <Text style={styles.declineButtonText}>Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonAccept}
          onPress={() => {
            onAccept();
          }}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: ColorsLight.primaryWhite,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: ColorsLight.grey3,
    borderWidth: 1,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    verticalAlign: 'middle',
  },
  name: {
    ...H3MainStyles.textStyle,
    color: ColorsLight.green3,
    margin: 0,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: ColorsLight.green3,
  },
  price: {
    ...H3MainStyles.textStyle,
    color: Colors.primaryColor,
    margin: 0,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'left',
    verticalAlign: 'middle',
  },
  starContainer: {
    flexDirection: 'row',
    marginRight: 8,
    verticalAlign: 'middle',
  },
  ratingText: {
    ...H5SmallStyles.textStyle,
    color: Colors.greyColor,
    margin: 0,
    marginRight: 8,
  },
  timeText: {
    ...H5SmallStyles.textStyle,
    color: ColorsLight.primaryBlack,
    margin: 0,
  },
  detail: {
    ...H5SmallStyles.textStyle,
    color: ColorsLight.primaryBlack,
    margin: 0,
  },
  description: {
    ...P2MainStyles.textStyle,
    color: Colors.greyColor,
    margin: 0,
    marginBottom: 16,
    textAlign: 'left',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonAccept: {
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 20,
    flex: 0.45,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primaryColor,
  },
  buttonDecline: {
    padding: 10,
    borderRadius: 20,
    flex: 0.45,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.activeDot,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  declineButtonText: {
    color: Colors.activeDot,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskOfferCard;
