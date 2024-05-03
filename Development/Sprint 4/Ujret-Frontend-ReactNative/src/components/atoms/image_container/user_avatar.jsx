import React from 'react';
import {Image} from 'react-native';
import {avatarStyles} from '../../../themes/allstyles/components';

const UserAvatar = ({imageUrl, style}) => (
  <Image
    source={
      imageUrl
        ? {uri: imageUrl}
        : require('../../../assets/images/profile_pic.jpg')
    }
    style={[avatarStyles.avatar, style]}
  />
);

export default UserAvatar;
