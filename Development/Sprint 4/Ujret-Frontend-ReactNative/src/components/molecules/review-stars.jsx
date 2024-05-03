import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ColorsLight} from '../../themes/colors';

const ReviewStars = ({rating, setRating}) => {
  const handleStarPress = index => {
    setRating(index + 1);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
          activeOpacity={0.7}
          style={{marginHorizontal: 5}}>
          <Ionicons
            name={'star'}
            size={35}
            color={i < rating ? ColorsLight.yellow1 : ColorsLight.grey3}
          />
        </TouchableOpacity>,
      );
    }
    return stars;
  };

  return <View style={styles.container}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReviewStars;
