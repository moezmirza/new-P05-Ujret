// React and React Native imports
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  Alert,
  View,
  ScrollView,
} from 'react-native';

// Redux imports
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../stores/user_slice';

// Component imports
import PrimaryButton from '../components/atoms/buttons/primary_button';
import OnboardingContent from '../components/molecules/intro_screen_content';
import TopBackStrip from '../components/molecules/top_back_button_strip';
import StaticBottomSheet from '../components/organisms/headers/bottom_model_sheet';
import AuthFields from '../components/molecules/auth_input_fields';
import LargeBtn from '../components/atoms/buttons/large_btn';

// API call
import {createUser} from '../api_layer/user_apis';

// Styles and constants
import {registration, registerMoreInfoScreenStyle} from '../themes/styles';
import {Strings} from '../stores/constant';
import {Metrics} from '../themes/metrics';

// Component definition
const RegistrationScreen = ({navigation}) => {
  // Redux dispatcher
  const dispatch = useDispatch();

  // Redux state
  const userInfo = useSelector(state => state.user.userInfo);
  console.log('On reg Screen, Already registered in user info:\n', userInfo);

  // State initialization
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Function to validate user inputs
  const validateInputs = () => {
    // Regular expressions for validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const phoneNumberRegex = /^\+923\d{9}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Validation checks
    if (!email || !phoneNumber || !password || !confirmPassword) {
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

    if (!passwordRegex.test(password)) {
      Alert.alert(
        Strings.registrationScreen.errorString,
        Strings.registrationScreen.fillPasswordError,
      );
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        Strings.registrationScreen.errorString,
        Strings.registrationScreen.fillPasswordSameError,
      );
      return false;
    }

    return true;
  };

  // Function to close bottom sheet
  const closeBottomSheet = () => {
    setIsBottomSheetVisible(false);
    navigation.navigate('login');
  };

  // Function to handle account creation
  const handleCreateAccount = async () => {
    const validationCheck = validateInputs();
    if (validationCheck) {
      try {
        const response = await createUser(phoneNumber, email, password);

        // Handle successful registration
        dispatch(
          setUser({
            firebaseUid: null,
            uid: response.data,
            firstName: null,
            lastName: null,
            gender: null,
            cnic: null,
            phoneNumber: phoneNumber,
            email: email,
          }),
        );

        // Alert user about successful acc creation
        Alert.alert(
          'Success',
          response.message + ' User ID: ' + response.data,
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigate to Ujret home screen
                navigation.navigate('login');
              },
            },
          ],
        );
      } catch (error) {
        // Handle registration errors
        Alert.alert(
          'Registration Error',
          `Please Re-check your inputs. ${error.message}`,
        );
      }
    } else {
      return;
    }
  };

  // Rendering UI
  return (
    <ScrollView style={registration.container}>
      {/* Top back button strip */}
      <TopBackStrip navigation={navigation}></TopBackStrip>
      <View style={{marginBottom: Metrics.x_x_large_margin}}>
        {/* Onboarding content */}
        <OnboardingContent
          headerText={Strings.registrationScreen.headerText}
          subHeaderText={Strings.registrationScreen.subHeaderText}
        />
      </View>

      {/* Static bottom sheet */}
      <StaticBottomSheet
        visible={isBottomSheetVisible}
        onClose={closeBottomSheet}
      />

      {/* Authentication fields */}
      <AuthFields
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        isSignUp={true}
      />
      <TouchableOpacity>
        {/* Forgot password text */}
        <Text style={registration.forgotPasswordText}>
          Forgot your password?
        </Text>
      </TouchableOpacity>

      <View style={registerMoreInfoScreenStyle.buttonsContainer}>
        {/* Large button for registration */}
        <LargeBtn
          variant={'action'}
          text={Strings.registrationScreen.registerButtonText}
          onPress={handleCreateAccount}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        {/* Login text */}
        <Text style={registration.loginText}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Exporting the component
export default RegistrationScreen;

// import React, {useState, useEffect} from 'react';
// import {
//   SafeAreaView,
//   TouchableOpacity,
//   Text,
//   Alert,
//   View,
//   ScrollView,
// } from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import PrimaryButton from '../components/atoms/buttons/primary_button';
// import OnboardingContent from '../components/molecules/intro_screen_content';
// import TopBackStrip from '../components/molecules/top_back_button_strip';
// import StaticBottomSheet from '../components/organisms/headers/bottom_model_sheet';
// import {createUser} from '../api_layer/user_apis';
// import AuthFields from '../components/molecules/auth_input_fields';
// import {registration} from '../themes/styles';
// import {setUser} from '../stores/user_slice';
// import {Strings} from '../stores/constant';
// import {Metrics} from '../themes/metrics';
// import LargeBtn from '../components/atoms/buttons/large_btn';
// import {registerMoreInfoScreenStyle} from '../themes/styles';

// const RegistrationScreen = ({navigation}) => {
//   const dispatch = useDispatch();
//   const userInfo = useSelector(state => state.user.userInfo);
//   // useEffect(() => {
//   //   // fetchUserFromAsync Storage and set it in redux store
//   //   dispatch(fetchUserFromAsync());
//   // }, [navigation]);
//   console.log('On reg Screen, Already registered in user info:\n', userInfo);

//   const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const validateInputs = () => {
//     const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
//     const phoneNumberRegex = /^\+923\d{9}$/;
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//     if (!email || !phoneNumber || !password || !confirmPassword) {
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

//     if (!passwordRegex.test(password)) {
//       Alert.alert(
//         Strings.registrationScreen.errorString,
//         Strings.registrationScreen.fillPasswordError,
//       );
//       return false;
//     }

//     if (password !== confirmPassword) {
//       Alert.alert(
//         Strings.registrationScreen.errorString,
//         Strings.registrationScreen.fillPasswordSameError,
//       );
//       return false;
//     }

//     return true;
//   };

//   const closeBottomSheet = () => {
//     setIsBottomSheetVisible(false);
//     navigation.navigate('login');
//   };

//   const handleCreateAccount = async () => {
//     const validationCheck = validateInputs();
//     if (validationCheck) {
//       try {
//         const response = await createUser(phoneNumber, email, password);

//         // Handle successful registration, e.g., navigate to another screen
//         console.log('Response from createUser:', response.message);
//         Alert.alert('Success', 'Account created successfully.');
//         dispatch(
//           setUser({
//             firebaseUid: null,
//             uid: response.data,
//             firstName: null,
//             lastName: null,
//             gender: null,
//             cnic: null,
//             phoneNumber: phoneNumber,
//             email: email,
//           }),
//         );
//         navigation.navigate('login');
//       } catch (error) {
//         // Handle different types of errors
//         console.error('Error during registration:', error.message);
//         // Alert.alert('Registration Error', `Bad Request - ${error.message}`);
//         Alert.alert('Registration Error', `Please Re-check your inputs.`);
//       }
//     } else {
//       return;
//     }
//   };

//   return (
//     <ScrollView style={registration.container}>
//       <TopBackStrip navigation={navigation}></TopBackStrip>
//       <View style={{marginBottom: Metrics.x_x_large_margin}}>
//         <OnboardingContent
//           headerText={Strings.registrationScreen.headerText}
//           subHeaderText={Strings.registrationScreen.subHeaderText}
//         />
//       </View>

//       <StaticBottomSheet
//         visible={isBottomSheetVisible}
//         onClose={closeBottomSheet}
//       />

//       <AuthFields
//         phoneNumber={phoneNumber}
//         setPhoneNumber={setPhoneNumber}
//         email={email}
//         setEmail={setEmail}
//         password={password}
//         setPassword={setPassword}
//         confirmPassword={confirmPassword}
//         setConfirmPassword={setConfirmPassword}
//         isSignUp={true}
//       />
//       <TouchableOpacity>
//         <Text style={registration.forgotPasswordText}>
//           Forgot your password?
//         </Text>
//       </TouchableOpacity>

//       <View style={registerMoreInfoScreenStyle.buttonsContainer}>
//         <LargeBtn
//           variant={'action'}
//           text={Strings.registrationScreen.registerButtonText}
//           onPress={handleCreateAccount}
//         />
//       </View>

//       <TouchableOpacity onPress={() => navigation.navigate('login')}>
//         <Text style={registration.loginText}>
//           Already have an account? Login
//         </Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default RegistrationScreen;
