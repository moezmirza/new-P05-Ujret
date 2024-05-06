// React and React Native imports
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';

// Map-related imports
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

// Icon import
import {Icon} from 'react-native-elements';

// Component imports
import LargeBtn from '../components/atoms/buttons/large_btn';
import H6XSmall from '../components/atoms/headings/h6_xsmall';
import TopBackStrip from '../components/molecules/top_back_button_strip';

// Style imports
import {
  H3MainStyles,
  H5SmallStyles,
  inputFieldStyles,
  registerMoreInfoScreenStyle,
  fullScreenWhite,
  registration,
} from '../themes/styles';

// themes import
import {ColorsLight} from '../themes/colors';
import {Spacing, Metrics} from '../themes/metrics';

// Api layer import
import {createHandyman} from '../api_layer/handymen_apis';

// Redux imports
import {setHandyman} from '../stores/handyman_slice';

// Main screen component
const ProfessionalInfo = ({route, navigation}) => {
  // Redux Dispatcher
  const dispatch = useDispatch();

  // State hooks
  const {categories} = route.params;
  console.log('Selected Categories:', categories);

  const userInfo = useSelector(state => state.user.userInfo);
  const [experience, setExperience] = useState(0);
  const [about, setAbout] = useState('');
  const [address, setAddress] = useState('');
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (userInfo) {
      setUserId(userInfo.uid ? userInfo.uid : userId);
    }
  }, [userInfo]);

  // Function to handle registration
  const handleRegister = async () => {
    // Perform registration logic here
    console.log(
      'Registering Service Provider:',
      userId,
      categories,
      experience,
      about,
      address,
    );

    // Check if timeRequired, budget, and address meet the conditions
    if (address === '') {
      // Alert the user to fill in the required details
      Alert.alert('Alert', 'Please fill in all required details.');
      return;
    }

    try {
      const response = await createHandyman(
        userId,
        categories,
        experience,
        about,
        address,
      );
      console.log('Handyman created:', response.data);

      // Dispatch handyman information to Redux store
      dispatch(
        setHandyman({
          handymanId: response.data,
          userId: userId,
          handymanName: null,
          handymanPhoneNumber: null,
          categories: categories.map(category =>
            category.toUpperCase().replace(/ /g, '_'),
          ),
          experience: experience,
          about: about,
          address: address,
          onlineStatus: false,
        }),
      );

      Alert.alert('Success', response.message, [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('ServiveProviderThanksScreen', {
              handymanId: response.data,
            });
          },
        },
      ]);
    } catch (error) {
      // console.error('Error in creating handyman:', error);
      Alert.alert('Error', 'Failed to create Service profile ' + error.message);
    }
  };

  return (
    // Main container view
    // <View style={{...fullScreenWhite, padding: Metrics.baseMargin}}>
    <ScrollView
      style={{
        ...registration.container,
        padding: Metrics.baseMargin,
        backgroundColor: ColorsLight.primaryWhite,
      }}
      contentContainerStyle={{flexGrow: 1}}>
      {/* Modal for map view */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={isMapVisible}
        onRequestClose={() => setIsMapVisible(false)}>
        <View style={{flex: 1}}>
          {/* Map view */}
          <MapView
            style={{flex: 1}}
            initialRegion={{
              latitude: 31.5497,
              longitude: 74.3436,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            // Add onPress or onLongPress depending on how you want to capture the location
            onPress={e => {
              const coords = e.nativeEvent.coordinate;
              Geocoder.from(coords.latitude, coords.longitude)
                .then(json => {
                  const addressComponent = json.results[0].formatted_address;
                  setAddress(addressComponent);
                })
                .catch(error => console.warn(error));
              setIsMapVisible(false);
            }}
          />
          {/* Button to close the modal */}
          <TouchableOpacity onPress={() => setIsMapVisible(false)}>
            <Text>Close Map</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TopBackStrip
        navigation={navigation}
        lastScreen={'ServiceProviderInfo'}
      />
      <Text
        style={{
          ...H3MainStyles.textStyle,
          marginTop: -20,
          color: ColorsLight.primaryBlack,
        }}>
        Services Profile
      </Text>

      {/* Header */}
      <H6XSmall color={ColorsLight.red1} marginTop={30} marginBottom={30}>
        Update Your Information
      </H6XSmall>
      {/* Form container */}
      <View style={{gap: Spacing.small}}>
        {/* Experience input field */}
        <View style={inputFieldStyles.outerContainer}>
          <Text style={H5SmallStyles.textStyle}>Years of Experience*</Text>
          <TextInput
            placeholderTextColor="grey"
            placeholder="0"
            value={experience.toString()}
            onChangeText={text => {
              // Check if the input is a valid number or empty string
              const parsedExperience = /^\d+$/.test(text) ? parseInt(text) : '';
              setExperience(parsedExperience);
            }}
            style={[
              inputFieldStyles.textInputStyles.input,
              inputFieldStyles.textInputStyles.font,
            ]}
          />
        </View>
        {/* Address input field */}
        <TouchableOpacity onPress={() => setIsMapVisible(true)}>
          <View style={inputFieldStyles.outerContainer}>
            <Text style={H5SmallStyles.textStyle}>Address*</Text>
            <TextInput
              placeholderTextColor="grey"
              placeholder="Enter Your Address."
              value={address}
              onChangeText={setAddress}
              style={[
                inputFieldStyles.textInputStyles.description,
                inputFieldStyles.textInputStyles.font,
              ]}
              multiline={true}
              maxLength={250}
            />
            {/* Map marker icon */}
            <Icon
              name="map-marker"
              type="font-awesome"
              size={30}
              color="#000"
              onPress={() => setIsMapVisible(true)}
            />
          </View>
        </TouchableOpacity>
        {/* About input field */}
        <View style={inputFieldStyles.outerContainer}>
          <Text style={H5SmallStyles.textStyle}>About</Text>
          <TextInput
            placeholderTextColor="grey"
            placeholder="Please add details about you here. i.e. your services, your experience, etc."
            value={about}
            onChangeText={setAbout}
            style={[
              inputFieldStyles.textInputStyles.description,
              {
                // height: Math.max(35, about.split('\n').length * 100),
                color: ColorsLight.primaryBlack,
              },
            ]}
            multiline={true}
          />
        </View>
      </View>

      {/* Submit button */}
      <View style={registerMoreInfoScreenStyle.buttonsContainer}>
        <LargeBtn text={'Submit'} onPress={handleRegister} />
      </View>
    </ScrollView>
    // </View>
  );
};

export default ProfessionalInfo;
