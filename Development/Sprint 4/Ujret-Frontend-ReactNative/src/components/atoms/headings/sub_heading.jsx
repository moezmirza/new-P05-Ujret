import React from 'react';
import {Text} from 'react-native';
import {subHeaderTextStyle} from '../../../themes/styles';

const HeaderText = ({children}) => (
  <Text style={subHeaderTextStyle.textStyle}>{children}</Text>
);

export default HeaderText;
