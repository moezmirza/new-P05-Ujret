import React from 'react';
import { TouchableRipple,Text } from 'react-native-paper';
import { onboardingStyles } from '../../../themes/styles'

const PrimaryButton = ({ text, onPress, style }) => {
  return (
    <TouchableRipple
      onPress={onPress}
      rippleColor="rgba(255, 255, 255, .32)"
      style={[onboardingStyles.button, style]}
      borderless={true}
    >
      <Text style={onboardingStyles.text}>{text}</Text>
    </TouchableRipple>
  );
};
export default PrimaryButton;
