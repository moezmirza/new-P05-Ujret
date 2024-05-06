import React, {useState, useEffect} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements'; // Import Icon from react-native-elements
import {Metrics} from '../../themes/metrics';
import {ColorsLight} from '../../themes/colors';
import {
  H5SmallStyles,
  inputFieldStyles,
  passwordInput,
  registration,
} from '../../themes/styles';

const AuthFields = ({
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isSignUp,
}) => {
  const inputStyle = [
    inputFieldStyles.textInputStyles.input,
    inputFieldStyles.textInputStyles.font,
    {marginBottom: Metrics.large_margin},
  ];

  const [passwordVisible, setPasswordVisible] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={{marginTop: isSignUp ? 0 : Metrics.x_large_margin}}>
      <TextInput
        placeholderTextColor="grey"
        placeholder="Phone Number*"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={inputStyle}
        keyboardType="phone-pad"
      />

      <TextInput
        placeholderTextColor="grey"
        placeholder="Email Address*"
        value={email}
        onChangeText={setEmail}
        style={inputStyle}
        keyboardType="email-address"
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: Metrics.medium_inputFieldWidth,
          height: Metrics.medium_inputFieldHeight,
          backgroundColor: ColorsLight.green7,
          borderRadius: Metrics.small_inputFieldRadius,
          marginBottom: Metrics.large_margin,
        }}>
        <TextInput
          placeholderTextColor="grey"
          placeholder="Password"
          style={{
            ...inputFieldStyles.textInputStyles.font,
            padding: Metrics.mediumPadding,
            width: Metrics.medium_inputFieldWidth - 60,
          }}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={passwordVisible}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={passwordInput.icon}>
          <Icon
            name={passwordVisible ? 'eye-slash' : 'eye'}
            type="font-awesome" // Specify the icon set
            size={20}
            color="grey"
          />
        </TouchableOpacity>
      </View>

      {isSignUp && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: Metrics.medium_inputFieldWidth,
            height: Metrics.medium_inputFieldHeight,
            backgroundColor: ColorsLight.green7,
            borderRadius: Metrics.small_inputFieldRadius,
            marginBottom: Metrics.large_margin,
          }}>
          <TextInput
            placeholderTextColor="grey"
            placeholder="Confirm Password"
            style={{
              ...inputFieldStyles.textInputStyles.font,
              padding: Metrics.mediumPadding,
              width: Metrics.medium_inputFieldWidth - 60,
            }}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={passwordVisible}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={passwordInput.icon}>
            <Icon
              name={passwordVisible ? 'eye-slash' : 'eye'}
              type="font-awesome" // Specify the icon set
              size={20}
              color="grey"
            />
          </TouchableOpacity>
        </View>
      )}

      {/* <TextInput
        placeholderTextColor="grey"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={inputStyle}
        secureTextEntry={true}
      /> */}
      {/* {isSignUp && (
        <TextInput
          placeholderTextColor="grey"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={inputStyle}
          secureTextEntry
        />
      )} */}
    </View>
  );
};

export default AuthFields;
