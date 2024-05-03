// Register More Info Screen

// React and React Native imports
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';

// Strings
import {Strings} from '../stores/constant';

// Components
import LargeBtn from '../components/atoms/buttons/large_btn';
import TopBackStrip from '../components/molecules/top_back_button_strip';

// Styles
import {
  screenContainerStyleWhite,
  H5SmallStyles,
  inputFieldStyles,
  registerMoreInfoScreenStyle,
  ujretStyles,
} from '../themes/styles';

// Redux Store
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../stores/user_slice';
import {setHandyman} from '../stores/handyman_slice';

// Api files
import {updateUserDetails} from '../api_layer/user_apis';

// Utility functions
import {formatCnic} from '../utils/utilities';

// Component definition
const RegisterMoreInfoScreen = ({route, navigation}) => {
  // Route parameters
  const {service} = route.params;

  // Redux state
  const userInfo = useSelector(state => state.user.userInfo);
  const handymanInfo = useSelector(state => state.handyman.handymanInfo);
  const dispatch = useDispatch();

  // State variables
  const [userId, setUserId] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [cnic, setCnic] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  // Effect to initialize state with user info
  useEffect(() => {
    if (userInfo) {
      setUserId(userInfo.uid ? userInfo.uid : userId);
      setFullName(
        userInfo.firstName
          ? userInfo.firstName + ' ' + userInfo.lastName
          : fullName,
      );
      setGender(userInfo.gender ? userInfo.gender : gender);
      setCnic(userInfo.cnic ? userInfo.cnic : cnic);
      setPhoneNumber(userInfo.phoneNumber ? userInfo.phoneNumber : phoneNumber);
      setEmail(userInfo.email ? userInfo.email : email);
    }
  }, [userInfo]);

  // Function to validate form inputs
  const validateInputs = () => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const phoneNumberRegex = /^\+923\d{9}$/;
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;

    if (!fullName || !gender || !cnic || !phoneNumber || !email) {
      Alert.alert(
        Strings.registrationScreen.errorString,
        Strings.registrationScreen.fillAllFieldsError,
      );
      return false;
    }

    if (!emailRegex.test(email)) {
      Alert.alert(
        Strings.registrationScreen.errorString,
        Strings.registrationScreen.fillEmailError,
      );
      return false;
    }

    if (!phoneNumberRegex.test(phoneNumber)) {
      Alert.alert(
        Strings.registrationScreen.errorString,
        Strings.registrationScreen.fillPhoneError,
      );
      return false;
    }

    if (!cnicRegex.test(cnic)) {
      Alert.alert(
        Strings.registrationScreen.errorString,
        Strings.registrationScreen.fillCnicError,
      );
      return false;
    }

    return true;
  };

  // Function to handle image upload
  const handleImageUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        // Set the selected image to the state
        setProfileImage(image.path);
      })
      .catch(error => {
        console.log('Image picker error:', error);
      });
  };

  // Function to handle registration
  const handleRegisterMoreInfo = async () => {
    const validationCheck = validateInputs();
    if (validationCheck) {
      const [firstName, ...lastNameArray] = fullName.split(' ');
      const lastName = lastNameArray.join(' ');
      try {
        const updatedData = {
          userId: userId,
          firebaseUid: userInfo.firebaseUid,
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          cnic: cnic,
          phoneNumber: phoneNumber,
          email: email,
        };
        const response = await updateUserDetails(updatedData);

        // Dispatch user information to Redux store on successful update on backend
        dispatch(
          setUser({
            firebaseUid: userInfo.firebaseUid,
            uid: userId,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            cnic: cnic,
            phoneNumber: phoneNumber,
            email: email,
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

        // Display success message
        Alert.alert('Success', response.message, [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to TaskDetail screen
              navigation.navigate('TaskDetail', {service: service});
            },
          },
        ]);
      } catch (error) {
        // Update failed, display the error message
        Alert.alert('Error', `Failed to update user: ${error}`);
      }
    } else {
      return;
    }
  };

  // Rendering UI
  return (
    <ScrollView
      contentContainerStyle={{...screenContainerStyleWhite, flexGrow: 2}}>
      {/* Top gradient background */}
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.9, y: 1.0}}
        locations={[0, 0.6]}
        colors={ujretStyles.moduleCon.gradientColors}
        style={registerMoreInfoScreenStyle.topContainer}>
        {/* Top back button strip */}
        <View style={registerMoreInfoScreenStyle.topStripOuter}>
          <TopBackStrip
            navigation={navigation}
            variant={'white'}></TopBackStrip>
        </View>
        {/* Image upload circle */}
        <View style={registerMoreInfoScreenStyle.imageUploadContainer}>
          <TouchableOpacity onPress={handleImageUpload}>
            <View style={registerMoreInfoScreenStyle.imageUploadCircle}>
              {profileImage ? (
                <Image
                  source={{uri: profileImage}}
                  style={registerMoreInfoScreenStyle.imageUploadPreview}
                />
              ) : (
                <Text style={registerMoreInfoScreenStyle.imageUploadText}>
                  Upload Image
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Display info required before proceeding */}
      {userInfo.cnic ? (
        ''
      ) : (
        <Text>
          Following Information is required before you proceed further
        </Text>
      )}

      {/* Form inputs */}
      <View style={registerMoreInfoScreenStyle.formContainer}>
        {/* Full Name */}
        <View style={inputFieldStyles.outerContainer}>
          <Text style={H5SmallStyles.textStyle}>Name*</Text>
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
          <Text style={H5SmallStyles.textStyle}>CNIC*</Text>
          <TextInput
            placeholderTextColor="grey"
            placeholder="CNIC* (e.g., XXXXX-XXXXXXX-X)"
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
          <Text style={{...H5SmallStyles.textStyle, color: 'red'}}>
            Phone - Not Editable
          </Text>
          <TextInput
            editable={false}
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

      {/* Buttons */}
      <View style={registerMoreInfoScreenStyle.buttonsContainer}>
        {/* Submit button */}
        <LargeBtn text={'Submit'} onPress={handleRegisterMoreInfo} />
        {/* Skip button */}
        {/* <LargeBtn
          variant={'cancel'}
          text={'Skip for now >'}
          onPress={() => navigation.navigate('Onboarding2')}
        /> */}
      </View>
    </ScrollView>
  );
};

// Exporting the component
export default RegisterMoreInfoScreen;

// // register more info screen
// import React, {useState, useEffect} from 'react';
// import {
//   ScrollView,
//   View,
//   Text,
//   TextInput,
//   Alert,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {Picker} from '@react-native-picker/picker';
// import ImagePicker from 'react-native-image-crop-picker';

// // Strings
// import {Strings} from '../stores/constant';

// // Components
// import LargeBtn from '../components/atoms/buttons/large_btn';
// import TopBackStrip from '../components/molecules/top_back_button_strip';

// // Styles
// import {
//   screenContainerStyleWhite,
//   H5SmallStyles,
//   inputFieldStyles,
//   registerMoreInfoScreenStyle,
//   ujretStyles,
// } from '../themes/styles';

// // Redux Store
// import {useSelector, useDispatch} from 'react-redux';
// import {setUser} from '../stores/user_slice';

// // Api files
// import {updateUserDetails} from '../api_layer/user_apis';

// const RegisterMoreInfoScreen = ({route, navigation}) => {
//   const {service} = route.params;

//   const userInfo = useSelector(state => state.user.userInfo);
//   const dispatch = useDispatch();

//   const [userId, setUserId] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [gender, setGender] = useState('');
//   const [cnic, setCnic] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [profileImage, setProfileImage] = useState(null);

//   useEffect(() => {
//     if (userInfo) {
//       setUserId(userInfo.uid ? userInfo.uid : userId);
//       setFullName(
//         userInfo.firstName
//           ? userInfo.firstName + ' ' + userInfo.lastName
//           : fullName,
//       );
//       setGender(userInfo.gender ? userInfo.gender : gender);
//       setCnic(userInfo.cnic ? userInfo.cnic : cnic);
//       setPhoneNumber(userInfo.phoneNumber ? userInfo.phoneNumber : phoneNumber);
//       setEmail(userInfo.email ? userInfo.email : email);
//     }
//   }, [userInfo]);

//   const validateInputs = () => {
//     const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
//     const phoneNumberRegex = /^\+923\d{9}$/;
//     const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;

//     if (!fullName || !gender || !cnic || !phoneNumber || !email) {
//       Alert.alert(
//         Strings.registrationScreen.errorString,
//         Strings.registrationScreen.fillAllFieldsError,
//       );
//       return false;
//     }

//     if (!emailRegex.test(email)) {
//       Alert.alert(
//         Strings.registrationScreen.errorString,
//         Strings.registrationScreen.fillEmailError,
//       );
//       return false;
//     }

//     if (!phoneNumberRegex.test(phoneNumber)) {
//       Alert.alert(
//         Strings.registrationScreen.errorString,
//         Strings.registrationScreen.fillPhoneError,
//       );
//       return false;
//     }

//     if (!cnicRegex.test(cnic)) {
//       Alert.alert(
//         Strings.registrationScreen.errorString,
//         Strings.registrationScreen.fillCnicError,
//       );
//       return false;
//     }

//     return true;
//   };

//   const handleImageUpload = () => {
//     ImagePicker.openPicker({
//       width: 300,
//       height: 300,
//       cropping: true,
//     })
//       .then(image => {
//         // Set the selected image to the state
//         setProfileImage(image.path);
//       })
//       .catch(error => {
//         console.log('Image picker error:', error);
//       });
//   };

//   const handleRegisterMoreInfo = async () => {
//     // if (userInfo.cnic === null) {
//     //   Alert.alert(
//     //     'CNIC Required',
//     //     'Following Information is required before you proceed further',
//     //   );
//     // } else {
//     const validationCheck = validateInputs();
//     if (validationCheck) {
//       const [firstName, ...lastNameArray] = fullName.split(' ');
//       const lastName = lastNameArray.join(' ');
//       try {
//         const updatedData = {
//           userId: userId,
//           firebaseUid: userInfo.firebaseUid,
//           firstName: firstName,
//           lastName: lastName,
//           gender: gender,
//           cnic: cnic,
//           phoneNumber: phoneNumber,
//           email: email,
//         };
//         const response = await updateUserDetails(updatedData);
//         console.log('Response from updateUserDetails:', response);
//         dispatch(
//           setUser({
//             firebaseUid: userInfo.firebaseUid,
//             uid: userId,
//             firstName: firstName,
//             lastName: lastName,
//             gender: gender,
//             cnic: cnic,
//             phoneNumber: phoneNumber,
//             email: email,
//           }),
//         );
//         // Handle successful registration, e.g., navigate to another screen
//         navigation.navigate('TaskDetail', {service: service});
//       } catch (error) {
//         // Handle different types of errors
//         console.error('Error during registration:', error.message);
//         Alert.alert('Registration Error', `Please Re-check your inputs.`);
//       }
//     } else {
//       return;
//     }
//     // }
//   };

//   const formatCnic = input => {
//     // CNIC formatting logic
//     const formattedCnic = input
//       .replace(/\D/g, '') // Remove non-numeric characters
//       .replace(/(\d{5})(\d{7})(\d{1})/, '$1-$2-$3'); // Format as XXXXX-XXXXXXX-X
//     setCnic(formattedCnic);
//   };

//   return (
//     <ScrollView
//       contentContainerStyle={{...screenContainerStyleWhite, flexGrow: 2}}>
//       <LinearGradient
//         start={{x: 0.0, y: 0.25}}
//         end={{x: 0.9, y: 1.0}}
//         locations={[0, 0.6]}
//         colors={ujretStyles.moduleCon.gradientColors}
//         style={registerMoreInfoScreenStyle.topContainer}>
//         <View style={registerMoreInfoScreenStyle.topStripOuter}>
//           <TopBackStrip
//             navigation={navigation}
//             variant={'white'}></TopBackStrip>
//         </View>
//         {/* Image upload circle */}
//         <View style={registerMoreInfoScreenStyle.imageUploadContainer}>
//           <TouchableOpacity onPress={handleImageUpload}>
//             <View style={registerMoreInfoScreenStyle.imageUploadCircle}>
//               {profileImage ? (
//                 <Image
//                   source={{uri: profileImage}}
//                   style={registerMoreInfoScreenStyle.imageUploadPreview}
//                 />
//               ) : (
//                 <Text style={registerMoreInfoScreenStyle.imageUploadText}>
//                   Upload Image
//                 </Text>
//               )}
//             </View>
//           </TouchableOpacity>
//         </View>
//       </LinearGradient>

//       {userInfo.cnic ? (
//         ''
//       ) : (
//         <Text>
//           Following Information is required before you proceed further
//         </Text>
//       )}

//       <View style={registerMoreInfoScreenStyle.formContainer}>
//         <View style={inputFieldStyles.outerContainer}>
//           <Text style={H5SmallStyles.textStyle}>Name*</Text>
//           <TextInput
//             placeholderTextColor="grey"
//             placeholder="Name"
//             value={fullName}
//             onChangeText={setFullName}
//             style={[
//               inputFieldStyles.textInputStyles.input,
//               inputFieldStyles.textInputStyles.font,
//             ]}
//           />
//         </View>

//         <View style={inputFieldStyles.outerContainer}>
//           <Text style={H5SmallStyles.textStyle}>Gender</Text>
//           <Picker
//             style={[
//               inputFieldStyles.dropDownStyles.input,
//               inputFieldStyles.dropDownStyles.font,
//             ]}
//             selectedValue={gender}
//             onValueChange={itemValue => setGender(itemValue)}>
//             <Picker.Item
//               label={Strings.registrationScreen.selectGender}
//               value=""
//               style={inputFieldStyles.dropDownStyles.font}
//             />
//             <Picker.Item
//               label={Strings.registrationScreen.male}
//               value={Strings.registrationScreen.male}
//               style={inputFieldStyles.dropDownStyles.font}
//             />
//             <Picker.Item
//               label={Strings.registrationScreen.female}
//               value={Strings.registrationScreen.female}
//               style={inputFieldStyles.dropDownStyles.font}
//             />
//             <Picker.Item
//               label={Strings.registrationScreen.other}
//               value={Strings.registrationScreen.other}
//               style={inputFieldStyles.dropDownStyles.font}
//             />
//           </Picker>
//         </View>

//         <View style={inputFieldStyles.outerContainer}>
//           <Text style={H5SmallStyles.textStyle}>CNIC*</Text>
//           <TextInput
//             placeholderTextColor="grey"
//             placeholder="CNIC* (e.g., XXXXX-XXXXXXX-X)"
//             value={cnic}
//             onChangeText={input => formatCnic(input)}
//             style={[
//               inputFieldStyles.textInputStyles.input,
//               inputFieldStyles.textInputStyles.font,
//             ]}
//             keyboardType="numeric"
//           />
//         </View>

//         <View style={inputFieldStyles.outerContainer}>
//           <Text style={H5SmallStyles.textStyle}>Phone*</Text>
//           <TextInput
//             placeholderTextColor="grey"
//             placeholder="Phone*"
//             value={phoneNumber}
//             onChangeText={setPhoneNumber}
//             style={[
//               inputFieldStyles.textInputStyles.input,
//               inputFieldStyles.textInputStyles.font,
//             ]}
//             keyboardType="phone-pad"
//           />
//         </View>

//         <View style={inputFieldStyles.outerContainer}>
//           <Text style={H5SmallStyles.textStyle}>Email</Text>
//           <TextInput
//             placeholderTextColor="grey"
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//             style={[
//               inputFieldStyles.textInputStyles.input,
//               inputFieldStyles.textInputStyles.font,
//             ]}
//             keyboardType="email-address"
//           />
//         </View>
//       </View>

//       <View style={registerMoreInfoScreenStyle.buttonsContainer}>
//         <LargeBtn text={'Submit'} onPress={handleRegisterMoreInfo} />
//         <LargeBtn
//           variant={'cancel'}
//           text={'Skip for now >'}
//           onPress={() => navigation.navigate('Onboarding2')}
//         />
//       </View>
//     </ScrollView>
//   );
// };

// export default RegisterMoreInfoScreen;
