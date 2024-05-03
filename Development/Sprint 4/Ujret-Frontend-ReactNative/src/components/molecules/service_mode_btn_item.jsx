// ServiceModeScreen1

// React and React Native imports
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements'; // Import Icon from react-native-elements

// Theme and style imports
import {H4SubMainStyles, H3MainStyles} from '../../themes/styles';
import {editProfileItems} from '../../themes/allstyles/components';
import {Metrics} from '../../themes/metrics';

// Colors import
import {ColorsLight} from '../../themes/colors';

// Main screen component
const ServiceModeBtnItem = ({navigation, service, nextScreen, textColor}) => {
  console.log('ServiceModeBtnItem', service, nextScreen, textColor);

  // Function to handle button press
  const handlePress = () => {
    navigation.navigate(nextScreen);
  };

  return (
    <TouchableOpacity
      style={{
        ...editProfileItems.listItem,
        paddingVertical: Metrics.basePadding,
        borderColor: textColor,
      }}
      onPress={() => {
        handlePress();
      }}>
      <Text
        style={{
          ...editProfileItems.listItemText,
          ...H4SubMainStyles.textStyle,
          color: textColor,
          textAlign: 'left',
          textAlignVertical: 'center',
        }}>
        {service}
      </Text>
      <Icon
        name="chevron-right"
        type="font-awesome-5"
        size={H3MainStyles.textStyle.fontSize}
        color={textColor}
      />
    </TouchableOpacity>
  );
};

export default ServiceModeBtnItem;
