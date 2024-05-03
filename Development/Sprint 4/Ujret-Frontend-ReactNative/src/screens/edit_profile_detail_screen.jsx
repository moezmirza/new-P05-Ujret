// React and React Native imports
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Alert,
  Text,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

// Component imports
import TopBackStrip from '../components/molecules/top_back_button_strip';
import HeaderText from '../components/atoms/headings/sub_heading';
import UserAvatar from '../components/atoms/image_container/user_avatar';
import EditProfileInput from '../components/molecules/edit_profile_input_fields';
import LargeBtn from '../components/atoms/buttons/large_btn';

// Constants imports
import {Strings} from '../stores/constant';

// Style imports
import {
  screenContainerStyleWhite,
  inputFieldStyles,
  H5SmallStyles,
} from '../themes/styles';
import {registerMoreInfoScreenStyle} from '../themes/styles';
import {editProfileDetails} from '../themes/allscreens/edit_profile_details_style';

// Redux imports
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../stores/user_slice';
import {setHandyman} from '../stores/handyman_slice';

// Api layer imports
import {updateUserDetails} from '../api_layer/user_apis';

// Utility functions
import {formatCnic} from '../utils/utilities';

// Component definition
const EditProfileDetailsScreen = ({navigation}) => {
  // Redux state
  const userInfo = useSelector(state => state.user.userInfo);
  const handymanInfo = useSelector(state => state.handyman.handymanInfo);
  const dispatch = useDispatch();

  // State variables
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [cnic, setCnic] = useState('');
  const [gender, setGender] = useState('');
  const [userId, setUserId] = useState('');

  // Effect to initialize state with user info
  useEffect(() => {
    if (userInfo) {
      setPhoneNumber(userInfo.phoneNumber ? userInfo.phoneNumber : phoneNumber);
      setEmail(userInfo.email ? userInfo.email : email);
      setFullName(
        userInfo.firstName
          ? userInfo.firstName + ' ' + userInfo.lastName
          : fullName,
      );
      setCnic(userInfo.cnic ? userInfo.cnic : cnic);
      setGender(userInfo.gender ? userInfo.gender : gender);
      setUserId(userInfo.uid ? userInfo.uid : userId);
    }
  }, [userInfo]);

  // Function to handle the update account button press
  const handleUpdateAccount = async () => {
    // Split the full name into an array using the space as a separator
    const nameArray = fullName.split(' ');
    const firstName = nameArray[0];
    const lastName = nameArray.slice(1).join('');

    try {
      // Validate inputs here if needed
      const updateResult = await updateUserDetails({
        userId: userId,
        firebaseUid: userInfo.firebaseUid,
        firstName: firstName,
        lastName: lastName,
        cnic: cnic,
        gender: gender,
        email: email,
        phoneNumber: phoneNumber,
      });

      // Update was successful
      dispatch(
        setUser({
          ...userInfo,
          firstName: firstName,
          lastName: lastName,
          cnic: cnic,
          gender: gender,
          phoneNumber: phoneNumber,
        }),
      );

      // Dispatch handyman information to Redux store if user is a service provider
      if (handymanInfo) {
        dispatch(
          setHandyman({
            ...handymanInfo,
            handymanName: fullName,
            handymanPhoneNumber: phoneNumber,
          }),
        );
      }

      // Alert user about successful update
      Alert.alert('Success', updateResult.message, [
        {
          text: 'OK',
          onPress: () => {
            // Navigate to EditProfile screen
            navigation.navigate('EditProfile');
          },
        },
      ]);
    } catch (error) {
      // Update failed, display the error message
      Alert.alert('Error', `Failed to update user: ${error}`);
    }
  };

  // Render UI
  return (
    <ScrollView
      contentContainerStyle={{...screenContainerStyleWhite, flexGrow: 2}}>
      <TopBackStrip navigation={navigation}></TopBackStrip>

      <View style={editProfileDetails.mainContainer}>
        <View style={editProfileDetails.rowContainer}>
          {/* <BackButton onPress={() => console.log()} /> */}

          <HeaderText style={editProfileDetails.headerText}>
            Edit Profile
          </HeaderText>
          <View style={editProfileDetails.spacer} />
        </View>
        <UserAvatar imageUrl={null} />

        {/* Form inputs */}
        <View style={registerMoreInfoScreenStyle.formContainer}>
          {/* Full Name */}
          <View style={inputFieldStyles.outerContainer}>
            <Text style={H5SmallStyles.textStyle}>Name</Text>
            <TextInput
              placeholderTextColor="grey"
              placeholder="Name"
              value={fullName}
              onChangeText={setFullName}
              style={[
                inputFieldStyles.textInputStyles.input,
                inputFieldStyles.textInputStyles.font,
              ]}
            />
          </View>

          {/* Gender */}
          <View style={inputFieldStyles.outerContainer}>
            <Text style={H5SmallStyles.textStyle}>Gender</Text>
            <Picker
              style={[
                inputFieldStyles.dropDownStyles.input,
                inputFieldStyles.dropDownStyles.font,
              ]}
              selectedValue={gender}
              onValueChange={itemValue => setGender(itemValue)}>
              <Picker.Item
                label={Strings.registrationScreen.selectGender}
                value=""
                style={inputFieldStyles.dropDownStyles.font}
              />
              <Picker.Item
                label={Strings.registrationScreen.male}
                value={Strings.registrationScreen.male}
                style={inputFieldStyles.dropDownStyles.font}
              />
              <Picker.Item
                label={Strings.registrationScreen.female}
                value={Strings.registrationScreen.female}
                style={inputFieldStyles.dropDownStyles.font}
              />
              <Picker.Item
                label={Strings.registrationScreen.other}
                value={Strings.registrationScreen.other}
                style={inputFieldStyles.dropDownStyles.font}
              />
            </Picker>
          </View>

          {/* CNIC */}
          <View style={inputFieldStyles.outerContainer}>
            <Text style={H5SmallStyles.textStyle}>CNIC</Text>
            <TextInput
              placeholderTextColor="grey"
              placeholder="CNIC (e.g., XXXXX-XXXXXXX-X)"
              value={cnic}
              onChangeText={input => {
                setCnic(formatCnic(input));
              }}
              style={[
                inputFieldStyles.textInputStyles.input,
                inputFieldStyles.textInputStyles.font,
              ]}
              keyboardType="numeric"
            />
          </View>

          {/* Phone Number */}
          <View style={inputFieldStyles.outerContainer}>
            <Text style={{...H5SmallStyles.textStyle}}>Phone Number</Text>
            <TextInput
              placeholderTextColor="grey"
              placeholder="Phone*"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={[
                inputFieldStyles.textInputStyles.input,
                inputFieldStyles.textInputStyles.font,
              ]}
              keyboardType="phone-pad"
            />
          </View>

          {/* Email */}
          <View style={inputFieldStyles.outerContainer}>
            <Text style={{...H5SmallStyles.textStyle, color: 'red'}}>
              Email - Not Editable
            </Text>
            <TextInput
              editable={false}
              placeholderTextColor="grey"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={[
                inputFieldStyles.textInputStyles.input,
                inputFieldStyles.textInputStyles.font,
              ]}
              keyboardType="email-address"
            />
          </View>
        </View>

        <View style={registerMoreInfoScreenStyle.buttonsContainer}>
          <LargeBtn
            variant={'action'}
            text={Strings.registrationScreen.save}
            onPress={handleUpdateAccount}
          />
        </View>
      </View>
    </ScrollView>
  );
};
export default EditProfileDetailsScreen;
