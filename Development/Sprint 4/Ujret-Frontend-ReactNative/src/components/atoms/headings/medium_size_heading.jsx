import React from 'react';
import {Text} from 'react-native';
import {mediumHeaderTextStyle} from '../../../themes/styles';

const MediumHeaderText = ({children}) => (
  <Text style={mediumHeaderTextStyle.textStyle}>{children}</Text>
);

export default MediumHeaderText;
