// ServiceModeScreen2.js

import React from 'react';
import {View, Button, Image, Text} from 'react-native';
import {serviveModeScreen} from '../themes/allscreens/service_mode_screen';
import ListItem from '../components/molecules/edit_profile_list_items';
import ServiceItem from '../components/molecules/service_mode_list';
import {ColorsLight} from '../themes/colors';
import PrimaryButton from '../components/atoms/buttons/primary_button';
import H4SubMain from '../components/atoms/headings/h4_sub_main';

const ServiceModeScreen2 = () => {
  return (
    <View style={serviveModeScreen.container}>
      <View>
        <Image
          source={require('../assets/images/user-online.png')}
          style={serviveModeScreen.image}
        />
        <H4SubMain color={ColorsLight.primaryGreen}>
          You're online now
        </H4SubMain>
      </View>
      <PrimaryButton text={'Turn Offline'}></PrimaryButton>
      <Text>Screen 2</Text>
    </View>
  );
};

export default ServiceModeScreen2;
