// ServiceModeScreen1

// React and React Native imports
import React from 'react';
import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import {Icon} from 'react-native-elements'; // Import Icon from react-native-elements

// Theme and style imports
import {serviveModeScreen} from '../themes/allscreens/service_mode_screen';
import {H4SubMainStyles, H3MainStyles} from '../themes/styles';
import {editProfileItems} from '../themes/allstyles/components';
import {Metrics} from '../themes/metrics';

// Colors import
import {ColorsLight} from '../themes/colors';

// Component imports
import ListItem from '../components/molecules/edit_profile_list_items';
import ServiceModeBtnItem from '../components/molecules/service_mode_btn_item';
import ServiceItem from '../components/molecules/service_mode_list';
import PrimaryButton from '../components/atoms/buttons/primary_button';

// List of ujret app modules
const ujretAppModules = [
  {
    nextScreen: 'TaskProviderTasks',
    service: 'Handymen',
    textColor: ColorsLight.green6,
  },
  {
    nextScreen: 'AddRentingToolScreen',
    service: 'Tool Renting',
    textColor: ColorsLight.green6,
  },
  {
    nextScreen: 'Ujret',
    service: 'Carpooling',
    textColor: ColorsLight.grey3,
  },
  {
    nextScreen: 'Ujret',
    service: 'Freelancing',
    textColor: ColorsLight.grey3,
  },
];

// Main screen component
const ServiceModeScreen1 = ({navigation}) => {
  // // Function to handle service item press
  // const handleServiceItemPress = (index, isChecked) => {
  //   // Log whether the service is checked or unchecked
  //   console.log(`Service ${index} is ${isChecked ? 'checked' : 'unchecked'}`);
  // };

  // // Function to handle button press
  // const handlePress = () => {
  //   navigation.navigate('ServiceModeScreen2');
  // };

  return (
    // Main container view
    <View style={serviveModeScreen.container}>
      <View>
        {/* Edit service profile list item */}
        <ListItem
          key={`edit-service-profile`}
          iconName={'pen'}
          iconColor={ColorsLight.green6}
          labelText={'Edit Service Profile'}
          borderColor={ColorsLight.green6}
          textColor={ColorsLight.primaryBlack}
          onPress={() => navigation.navigate('ServiceProviderInfo')}
        />
        {/* Service items */}
        {/* {ujretAppModules.map((item, index) => (
          <ServiceItem
            key={`profile-item-${index}`}
            labelText={item.service}
            borderColor={item.borderColor}
            textColor={item.color}
            onPress={isChecked => handleServiceItemPress(index, isChecked)}
          />
        ))} */}

        {/* ALl list */}
        {ujretAppModules.map((item, index) => (
          <ServiceModeBtnItem
            key={`profile-item-${index}`}
            service={item.service}
            nextScreen={item.nextScreen}
            textColor={item.textColor}
            navigation={navigation}
          />
        ))}
      </View>
      {/* Turn Online button */}
      {/* <PrimaryButton text={'Turn Online'} onPress={handlePress}></PrimaryButton> */}
    </View>
  );
};

export default ServiceModeScreen1;
