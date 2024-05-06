import React from 'react';
import {View, TextInput, Text} from 'react-native';
import {registration} from '../../themes/styles';
import {Picker} from '@react-native-picker/picker';
import {Strings} from '../../stores/constant';
import {useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import {H5SmallStyles, inputFieldStyles} from '../../themes/styles';

const EditProfileInput = ({
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  fullName,
  setFullName,
  gender,
  setGender,
}) => {
  const [userPhoneNumber, setUserPhoneNumber] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const userInfo = useSelector(state => state.user.userInfo);

  // useEffect(() => {
  //   if (userInfo) {
  //     setUserEmail(userInfo.email || null);
  //     setUserPhoneNumber(userInfo.displayName || null);
  //   }
  // }, [userInfo]);

  return (
    <View>
      <View style={registration.fieldContainer}>
        <Text style={registration.label}>
          {Strings.registrationScreen.fullName}
        </Text>

        <TextInput
          placeholderTextColor="grey"
          placeholder={Strings.registrationScreen.fullName}
          value={fullName}
          onChangeText={setFullName}
          style={[
            inputFieldStyles.textInputStyles.input,
            inputFieldStyles.textInputStyles.font,
          ]}
        />
      </View>

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

      <View style={registration.fieldContainer}>
        <Text style={registration.label}>
          {Strings.registrationScreen.phoneNumber}
        </Text>
        <TextInput
          placeholderTextColor="grey"
          placeholder={userPhoneNumber}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={[
            inputFieldStyles.textInputStyles.input,
            inputFieldStyles.textInputStyles.font,
          ]}
          keyboardType="phone-pad"
        />
      </View>

      <View style={registration.fieldContainer}>
        <Text style={registration.label}>
          {Strings.registrationScreen.email}
        </Text>

        <TextInput
          placeholderTextColor="grey"
          placeholder={userEmail}
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
  );
};

export default EditProfileInput;
