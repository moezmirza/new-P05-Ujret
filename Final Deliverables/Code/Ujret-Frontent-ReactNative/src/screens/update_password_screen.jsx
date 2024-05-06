// React and React Native imports
import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Alert} from 'react-native';

// Component imports
import TopBackStrip from '../components/molecules/top_back_button_strip';
import HeaderText from '../components/atoms/headings/sub_heading';
import PasswordInput from '../components/molecules/password_input_field';
import LargeBtn from '../components/atoms/buttons/large_btn';

// Theme and style imports
import {editProfileDetails} from '../themes/allscreens/edit_profile_details_style';
import {registerMoreInfoScreenStyle} from '../themes/styles';

// Constant imports
import {Strings} from '../stores/constant';

// Redux imports
import {useSelector} from 'react-redux';

// Main screen component
const UpdatePassword = ({navigation}) => {
  // State hooks
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [userId, setUserId] = useState('');

  // Access user information from Redux store
  const userInfo = useSelector(state => state.user.userInfo);
  useEffect(() => {
    if (userInfo) {
      setUserId(userInfo.uid);
    }
  }, [userInfo]);

  // Function to validate password strength and match
  const validatePassword = (oldPassword, newPassword) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (oldPassword === newPassword) {
      Alert.alert('Error', 'New password cannot be the same as old password.');
      return false;
    }

    if (!passwordRegex.test(newPassword)) {
      Alert.alert('Error', 'Password is not strong enough.');
      return false;
    }

    return true;
  };

  // Function to handle password update
  const handleUpdatePassword = async () => {
    if (!validatePassword(password, newPassword)) {
      return;
    }
    setTimeout(() => {
      const simulatedResponse = {
        success: true,
        message: 'Password Updated Successfully',
        data: {
          password: password,
          newPassword: newPassword,
          userId: userId,
        },
      };

      if (simulatedResponse.success) {
        Alert.alert('Success', simulatedResponse.message);
        console.log('Passwords:', simulatedResponse.data);
      } else {
        Alert.alert(
          simulatedResponse.message ||
            Strings.registrationScreen.accountCreationError,
        );
      }
    }, 1000);
  };

  return (
    // Main SafeAreaView container
    <SafeAreaView style={editProfileDetails.mainContainer}>
      <View style={editProfileDetails.rowContainer}>
        {/* Top back navigation strip */}
        <TopBackStrip navigation={navigation}></TopBackStrip>
        {/* Header text */}
        <HeaderText style={editProfileDetails.headerText}>
          Edit Profile
        </HeaderText>
        <View style={editProfileDetails.spacer} />
      </View>

      {/* Old Password input field */}
      <PasswordInput
        value={password}
        setValue={setPassword}
        text="Old Password *"
      />
      {/* New Password input field */}
      <PasswordInput
        value={newPassword}
        setValue={setNewPassword}
        text="New Password *"
      />

      {/* Button container */}
      <View style={registerMoreInfoScreenStyle.buttonsContainer}>
        {/* Update Password button */}
        <LargeBtn
          variant={'action'}
          text={Strings.registrationScreen.save}
          onPress={handleUpdatePassword}
        />
      </View>
    </SafeAreaView>
  );
};

export default UpdatePassword;
