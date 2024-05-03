import React from 'react';
import {View} from 'react-native';
import {ColorsLight} from '../../../themes/colors';

const IndicatorDot = ({isActive}) => (
  <View
    style={{
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: isActive ? ColorsLight.red1 : ColorsLight.primaryGreen,
      marginHorizontal: 5,
    }}
  />
);

export default IndicatorDot;
