import React from 'react';
import {TouchableRipple, Text} from 'react-native-paper';
import {buttonsStyles} from '../../../themes/styles';

const LargeBtn = ({text, onPress, variant}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'action':
        return [
          buttonsStyles.large_btn.sizing,
          buttonsStyles.large_btn.action.styles,
        ];
      case 'secondary':
        return [
          buttonsStyles.large_btn.sizing,
          buttonsStyles.large_btn.secondary.styles,
        ];
      case 'ghost':
        return [
          buttonsStyles.large_btn.sizing,
          buttonsStyles.large_btn.ghost.styles,
        ];
      case 'cancel':
        return [
          buttonsStyles.large_btn.sizing,
          buttonsStyles.large_btn.cancel.styles,
        ];
      default:
        return [
          buttonsStyles.large_btn.sizing,
          buttonsStyles.large_btn.action.styles,
        ];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'action':
        return buttonsStyles.large_btn.action.textStyle;
      case 'secondary':
        return buttonsStyles.large_btn.secondary.textStyle;
      case 'ghost':
        return buttonsStyles.large_btn.ghost.textStyle;
      case 'cancel':
        return buttonsStyles.large_btn.cancel.textStyle;
      default:
        return buttonsStyles.large_btn.action.textStyle;
    }
  };

  return (
    <TouchableRipple
      onPress={onPress}
      rippleColor="rgba(255, 255, 255, .32)"
      style={getButtonStyle()}
      borderless={true}>
      <Text style={getTextStyle()}>{text}</Text>
    </TouchableRipple>
  );
};

export default LargeBtn;
