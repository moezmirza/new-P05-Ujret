import React from 'react';
import {View} from 'react-native';
import {ShapeContainerStyles} from '../../themes/styles';

const ShapeContainer = () => {
  return (
    <View style={ShapeContainerStyles.outerContainer}>
      <View style={ShapeContainerStyles.rightShape}></View>
      <View style={ShapeContainerStyles.leftShape}></View>
    </View>
  );
};

export default ShapeContainer;
