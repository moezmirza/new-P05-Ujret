import React from 'react';
import {Text} from 'react-native';
import {headerTextStyle} from '../../../themes/styles';

const HeaderText = ({children}) => (
  <Text style={headerTextStyle.textStyle}>{children}</Text>
);

export default HeaderText;
