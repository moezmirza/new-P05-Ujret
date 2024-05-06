import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {filterContainer} from '../../../themes/allstyles/components';
const SortButton = ({title, isActive, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={isActive ? filterContainer.activeButton : filterContainer.button}>
    <Text style={isActive ? filterContainer.activeText : filterContainer.text}>
      Top Rated
    </Text>
  </TouchableOpacity>
);

export default SortButton;
