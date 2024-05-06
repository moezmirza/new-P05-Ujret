import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements'; // Import Icon from react-native-elements
import {editProfileItems} from '../../themes/allstyles/components';
import {Metrics} from '../../themes/metrics';
import {Colors} from '../../themes/colors';

const ListItem = ({
  iconName,
  iconColor,
  labelText,
  onPress,
  textColor,
  borderColor,
}) => {
  return (
    <TouchableOpacity
      style={[
        editProfileItems.listItem,
        {borderColor: borderColor || editProfileItems.listItem.borderColor},
      ]}
      onPress={onPress}>
      <Icon
        name={iconName}
        type="font-awesome-5"
        size={Metrics.baseMargin}
        color={iconColor || Colors.textColor}
        style={editProfileItems.iconStyle}
      />
      <Text
        style={[
          editProfileItems.listItemText,
          {color: textColor || editProfileItems.listItemText.color},
        ]}>
        {labelText}
      </Text>
      <Icon
        name="chevron-right"
        type="font-awesome-5"
        size={Metrics.medium_margin}
        color={Colors.textColor}
        style={editProfileItems.chevronIconStyle}
      />
    </TouchableOpacity>
  );
};

export default ListItem;
