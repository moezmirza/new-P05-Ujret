import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {deleteButton} from '../../../themes/allstyles/components';
const LogoutButton = ({onPress}) => {
  return (
    <TouchableOpacity style={deleteButton.button} onPress={onPress}>
      <Text style={deleteButton.text}>Delete</Text>
    </TouchableOpacity>
  );
};
export default LogoutButton;
