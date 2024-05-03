import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import LargeBtn from '../components/atoms/buttons/large_btn';
import {Picker} from '@react-native-picker/picker';
import {Strings} from '../stores/constant';
import {
  screenContainerStyleWhite,
  H5SmallStyles,
  inputFieldStyles,
  registerMoreInfoScreenStyle,
} from '../themes/styles';
import {ColorsLight} from '../themes/colors';
import H6XSmall from '../components/atoms/headings/h6_xsmall';
import H5Small from '../components/atoms/headings/h5_small';
import {smallBtnStyles} from '../themes/allstyles/button-styles';

const ServiceProviderPersonalInfo = ({navigation}) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [cnic, setCnic] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [Images, setImages] = useState([]);

  const handleRegister = () => {
    navigation.navigate('ProfessionalInfo');
    // Perform registration logic here
    console.log('Registering user:', name, gender, cnic, phoneNumber, email);
  };

  const formatCnic = input => {
    // CNIC formatting logic
    const formattedCnic = input
      .replace(/\D/g, '') // Remove non-numeric characters
      .replace(/(\d{5})(\d{7})(\d{1})/, '$1-$2-$3'); // Format as XXXXX-XXXXXXX-X
    setCnic(formattedCnic);
  };

  const handleImageUpload = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    // Launch the image picker for the first image
    launchImageLibrary(options, response1 => {
      //   console.log(response1);
      if (response1.didCancel) {
        console.log('User cancelled image picker');
      } else if (response1.error) {
        console.log('ImagePicker Error: ', response1.error);
      } else if (response1['assets'][0].uri) {
        setImages([response1['assets'][0].uri]);
        // Launch the image picker for the second image
        launchImageLibrary(options, response2 => {
          console.log('resp2:', response2);
          if (response2.didCancel) {
            console.log('User cancelled image picker');
          } else if (response2.error) {
            console.log('ImagePicker Error: ', response2.error);
          } else if (response2['assets'][0].uri) {
            // Update the state with both image URIs
            setImages([response1['assets'][0].uri, response2['assets'][0].uri]);
          }
        });
      }
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{...screenContainerStyleWhite, flexGrow: 2}}>
      <View style={registerMoreInfoScreenStyle.formContainer}>
        <H6XSmall color={ColorsLight.red1} marginRight={20} marginLeft={20}>
          If your name and info is not according to you CNIC Please correct
          here.
        </H6XSmall>
        <View style={inputFieldStyles.outerContainer}>
          <Text style={H5SmallStyles.textStyle}>Name*</Text>
          <TextInput
            placeholderTextColor="grey"
            placeholder="Name"
            value={name}
            onChangeText={setName}
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

        <View style={inputFieldStyles.outerContainer}>
          <Text style={H5SmallStyles.textStyle}>CNIC*</Text>
          <TextInput
            placeholderTextColor="grey"
            placeholder="CNIC* (e.g., XXXXX-XXXXXXX-X)"
            value={cnic}
            onChangeText={input => formatCnic(input)}
            style={[
              inputFieldStyles.textInputStyles.input,
              inputFieldStyles.textInputStyles.font,
            ]}
            keyboardType="numeric"
          />
        </View>

        <View style={inputFieldStyles.outerContainer}>
          <Text style={H5SmallStyles.textStyle}>Phone*</Text>
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

        <View style={inputFieldStyles.outerContainer}>
          <Text style={H5SmallStyles.textStyle}>Email</Text>
          <TextInput
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
        <View style={inputFieldStyles.outerContainer}>
          <H5Small>Upload your CNIC pictures*</H5Small>
          <TouchableOpacity onPress={handleImageUpload}>
            <Text style={smallBtnStyles}>Attach Photos</Text>
          </TouchableOpacity>
        </View>
      </View>

      {Images.map((image, index) => (
        <View key={index} style={inputFieldStyles.outerContainer}>
          {console.log(image)}
          <Image
            source={{uri: image}}
            style={{width: 100, height: 100, marginVertical: 5}}
          />
        </View>
      ))}
      <View style={registerMoreInfoScreenStyle.buttonsContainer}>
        <LargeBtn text={'Submit'} onPress={handleRegister} />
      </View>
    </ScrollView>
  );
};

export default ServiceProviderPersonalInfo;
