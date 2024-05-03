import React from 'react';
import {View, TextInput} from 'react-native';
import {Metrics} from '../../themes/metrics';
import {H5SmallStyles, inputFieldStyles} from '../../themes/styles';

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
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        style={inputStyle}
        keyboardType="email-address"
      />

      <TextInput
        placeholderTextColor="grey"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={inputStyle}
        secureTextEntry
      />
      {isSignUp && (
        <TextInput
          placeholderTextColor="grey"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={inputStyle}
          secureTextEntry
        />
      )}
    </View>
  );
};

export default AuthFields;
