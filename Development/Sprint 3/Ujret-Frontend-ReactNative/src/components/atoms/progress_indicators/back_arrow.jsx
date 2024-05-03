import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {backArrow} from '../../../themes/styles';

const BackButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={require('../../../assets/images/back_arrow.png')}
        style={backArrow.backButton}
      />
    </TouchableOpacity>
  );
};
export default BackButton;
