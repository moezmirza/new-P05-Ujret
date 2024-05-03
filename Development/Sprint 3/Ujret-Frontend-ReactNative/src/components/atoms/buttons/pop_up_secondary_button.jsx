import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {cancelButton} from '../../../themes/allstyles/components';

const CancelButton = ({onPress}) => {
  return (
    <TouchableOpacity style={cancelButton.button} onPress={onPress}>
      <Text style={cancelButton.text}>Cancel</Text>
    </TouchableOpacity>
  );
};
export default CancelButton;
