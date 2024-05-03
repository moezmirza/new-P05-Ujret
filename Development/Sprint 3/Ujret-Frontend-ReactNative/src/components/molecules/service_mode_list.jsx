// ServiceItem.js

import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {editProfileItems} from '../../themes/allstyles/components';
import {Checkbox} from 'react-native-paper';
import {ColorsLight} from '../../themes/colors';

const ServiceItem = ({labelText, onPress, textColor, borderColor}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <TouchableOpacity
      style={[
        editProfileItems.listItem,
        {borderColor: borderColor || editProfileItems.listItem.borderColor},
      ]}
      onPress={() => {
        handleCheckboxToggle();
        onPress && onPress(!isChecked); // Pass the current checked state to the parent component
      }}>
      <Text
        style={[
          editProfileItems.listItemText,
          {
            color: textColor || editProfileItems.listItemText.color,
            fontSize: 19,
          },
        ]}>
        {labelText}
      </Text>
      <Checkbox
        status={isChecked ? 'checked' : 'unchecked'}
        color={ColorsLight.green6}
      />
    </TouchableOpacity>
  );
};

export default ServiceItem;
