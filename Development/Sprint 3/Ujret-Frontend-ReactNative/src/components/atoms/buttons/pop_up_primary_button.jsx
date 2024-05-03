import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {confirmButton} from '../../../themes/allstyles/components';

const LogoutButton = ({onPress, text = 'Log out'}) => {
  return (
    <TouchableOpacity style={confirmButton.button} onPress={onPress}>
      <Text style={confirmButton.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;
