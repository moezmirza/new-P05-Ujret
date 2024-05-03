import React from 'react';

// react native imports
import {Text, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Thenes inport
import {ColorsLight} from '../../themes/colors';
import {H5SmallStyles} from '../../themes/styles';

const SortButtonTwo = ({text, onPress, active = false}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: active ? ColorsLight.primaryGreen : ColorsLight.green7,
        padding: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        flexDirection: 'row',
      }}>
      <FontAwesome5
        name="filter"
        size={H5SmallStyles.textStyle.fontSize}
        color={active ? ColorsLight.green7 : ColorsLight.primaryGreen}
        style={{marginRight: 8}}
      />
      <Text
        style={{
          ...H5SmallStyles.textStyle,
          color: active ? ColorsLight.green7 : ColorsLight.primaryGreen,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default SortButtonTwo;
