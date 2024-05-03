import React from 'react';
import { View } from 'react-native';
import IndicatorDot from '../atoms/progress_indicators/indicator_dots';

const PaginationIndicator = ({ currentIndex, totalCount }) => (
  <View style={{ flexDirection: 'row', marginTop: 120 }}>
    {Array.from({ length: totalCount }, (_, index) => (
      <IndicatorDot key={index} isActive={index === currentIndex} />
    ))}
  </View>
);

export default PaginationIndicator;
