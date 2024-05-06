import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import {Icon} from 'react-native-elements'; // Import Icon from react-native-elements
import {passwordInput, registration} from '../../themes/styles';

const PasswordInput = ({text, value, setValue}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={registration.fieldContainer}>
      <Text style={registration.label}>{text}</Text>

      <View style={passwordInput.inputContainer}>
        <TextInput
          placeholderTextColor="grey"
          placeholder={text}
          value={value}
          onChangeText={setValue}
          style={passwordInput.input}
          secureTextEntry={!passwordVisible}
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
    </View>
  );
};

export default PasswordInput;
