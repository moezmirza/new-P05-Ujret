import React from 'react';
import {View, Dimensions} from 'react-native';
import H2Large from '../atoms/headings/h2_large';
import H5Small from '../atoms/headings/h5_small';
import {onboardingStyles} from '../../themes/styles';

const OnboardingContent = ({headerText, subHeaderText}) => {
  return (
    <View style={onboardingStyles.headerOuter}>
      <H2Large>{headerText}</H2Large>
      <View style={onboardingStyles.headerInner}>
        <H5Small>{subHeaderText}</H5Small>
      </View>
    </View>
  );
};

export default OnboardingContent;
