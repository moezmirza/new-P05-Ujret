import React from 'react';
import {View, Text} from 'react-native';

const StarRating = ({rating}) => {
  const filledStars = '★'.repeat(rating);
  const unfilledStars = '☆'.repeat(5 - rating);

  return (
    <View>
      <Text style={{color: '#FFD700'}}>{filledStars}</Text>
      <Text style={{color: '#CCCCCC'}}>{unfilledStars}</Text>
    </View>
  );
};

export default StarRating;
