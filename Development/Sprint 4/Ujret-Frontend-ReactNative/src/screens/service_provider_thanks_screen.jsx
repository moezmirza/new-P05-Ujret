// React and React Native imports
import React, {useEffect, useState} from 'react';
import {View, Alert} from 'react-native';

// Component imports
import H3Main from '../components/atoms/headings/h3_main';
import H2Large from '../components/atoms/headings/h2_large';

// Style imports
import {ThanksScreen} from '../themes/styles';

// Colors import
import {ColorsLight} from '../themes/colors';

// Redux
import {useDispatch} from 'react-redux';
import {setHandyman} from '../stores/handyman_slice';

// APIS
import {getHandyman} from '../api_layer/handymen_apis';

// Main screen component
const ServiveProviderThanksScreen = ({route, navigation}) => {
  // Extracting parameters from route
  const {handymanId} = route.params;
  console.log('handymanId:', handymanId);

  // Redux dispatcher
  const dispatch = useDispatch();

  // Get handyman fron handymanId and dispatch to store
  const handler = async () => {
    try {
      // Fetch Handyman Details if exists on this uid
      const handymanDetails = await getHandyman(handymanId);
      console.log('Fetched Handyman details:', handymanDetails);

      if (handymanDetails.data) {
        // Dispatch handyman information to Redux store
        dispatch(
          setHandyman({
            handymanId: handymanDetails.data.handyman_id,
            userId: handymanDetails.data.user_id,
            handymanName: handymanDetails.data.handyman_name,
            handymanPhoneNumber: handymanDetails.data.handyman_phone_number,
            categories: handymanDetails.data.category_list,
            experience: handymanDetails.data.experience,
            about: handymanDetails.data.about,
            address: handymanDetails.data.address,
            onlineStatus: handymanDetails.data.online_status,
          }),
        );
      }

      setTimeout(() => {
        // Alert user about successful Process
        Alert.alert('Success', 'Your Status confirmed successfully. ', [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to Ujret home screen
              navigation.navigate('Ujret');
            },
          },
        ]);
      }, 2000);
    } catch (error) {
      console.error('Error: Fetching handyman', error);
    }
  };

  useEffect(() => {
    handler();
  }, []);

  return (
    // Main container view
    <View style={ThanksScreen.container}>
      <View>
        {/* Main heading */}
        <H2Large color={ColorsLight.primaryGreen} marginBottom={20}>
          Thanks You for submitting the request
        </H2Large>
        {/* Subheading */}
        <H3Main color={ColorsLight.green3}>
          You'll get a confirmation about your Status in a while, Please wait.
        </H3Main>
      </View>
    </View>
  );
};

export default ServiveProviderThanksScreen;
