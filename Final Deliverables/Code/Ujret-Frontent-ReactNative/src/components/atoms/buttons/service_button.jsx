import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements'; // Import Icon from react-native-elements
import {editProfileItems} from '../../../themes/allstyles/components';
import {Metrics} from '../../../themes/metrics';
import {ColorsLight} from '../../../themes/colors';

import {inputFieldStyles} from '../../../themes/styles';

const ServiceButton = ({labelText, onPress}) => {
  return (
    <TouchableOpacity
      style={[
        editProfileItems.listItem,
        {
          backgroundColor: ColorsLight.green7,
        },
      ]}
      onPress={onPress}>
      <Text
        style={[
          editProfileItems.listItemText,
          {
            color:
              ColorsLight.primaryGreen || editProfileItems.listItemText.color,
          },
          {
            ...inputFieldStyles.textInputStyles.font,
            color: ColorsLight.primaryGreen,
          },
        ]}>
        {labelText}
      </Text>
      <Icon
        name="chevron-down"
        type="font-awesome-5" // Specify the icon set for FontAwesome5
        size={Metrics.medium_margin}
        color="black"
        style={editProfileItems.chevronIconStyle}
      />
    </TouchableOpacity>
  );
};

export default ServiceButton;
