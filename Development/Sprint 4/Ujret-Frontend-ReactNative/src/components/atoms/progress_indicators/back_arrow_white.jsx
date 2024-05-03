import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {backArrow} from '../../../themes/styles';

const BackButtonWhite = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={require('../../../assets/images/back_arrow_white.png')}
        style={backArrow.backButton}
      />
    </TouchableOpacity>
  );
};
export default BackButtonWhite;
