// React and React Native imports
import React, {useState, useEffect} from 'react';
import {ScrollView, TouchableOpacity, Text, Alert, View} from 'react-native';

// Firebase authentication imports
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

// Component imports
import OnboardingContent from '../components/molecules/intro_screen_content';
import AuthFields from '../components/molecules/auth_input_fields';
import LargeBtn from '../components/atoms/buttons/large_btn';
import TopBackStrip from '../components/molecules/top_back_button_strip';

// Styles and constants
import {registration, registerMoreInfoScreenStyle} from '../themes/styles';
import {Metrics} from '../themes/metrics';
import {Strings} from '../stores/constant';

// Redux
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../stores/user_slice';
import {setHandyman} from '../stores/handyman_slice';

// APIS
import {getUserDetails} from '../api_layer/user_apis';
import {getHandymanByUid} from '../api_layer/handymen_apis';

// Utils
import {generateUuidFromFirebaseUid} from '../utils/utilities';

// Component definition
const LoginScreen = ({navigation}) => {
  // State initialization
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redux dispatcher
  const dispatch = useDispatch();

  // Firebase authentication instance
  const auth = getAuth();

  // Redux state
  const userInfo = useSelector(state => state.user.userInfo);

  useEffect(() => {
    console.log(
      'On login Screen, Already registered in user info:\n',
      userInfo,
    );
  }, [navigation]);

  // Effect to log user info
  useEffect(() => {
    if (userInfo) {
      setPhoneNumber(userInfo.phoneNumber ? userInfo.phoneNumber : phoneNumber);
      setEmail(userInfo.email ? userInfo.email : email);
    }
  }, [userInfo]);
  const handleForgotPassword = async () => {
    if (email.trim() === '') {
      Alert.alert(
        'Error',
        'Please enter your email address to reset your password.',
      );
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Success', 'Please check your email to reset your password.');
    } catch (error) {
      console.error('Forgot password error:', error);
      Alert.alert('Error', error.message);
    }
  };

  // Function to handle user login
  const handleLogin = async () => {
    // Validation check for email and password
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      // Sign in with Firebase authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      const uuid = generateUuidFromFirebaseUid(user.uid);

      // Fetch user details
      const userDetails = await getUserDetails(uuid);
      console.log('Fetched User details on Login:\n', userDetails);

      // Dispatch user information to Redux store
      dispatch(
        setUser({
          firebaseUid: user.uid,
          uid: userDetails.data.id,
          firstName: userDetails.data.first_name,
          lastName: userDetails.data.last_name,
          gender: null,
          cnic: userDetails.data.cnic,
          phoneNumber: userDetails.data.phone_number,
          email: userDetails.data.email,
        }),
      );

      // Fetch Handyman Details if exists on this uid
      const handymanDetails = await getHandymanByUid(userDetails.data.id);
      console.log('Fetched Handyman details Login:\n', handymanDetails);

      if (handymanDetails.data) {
        // Dispatch handyman information to Redux store
        dispatch(
          setHandyman({
            handymanId: handymanDetails.data.handyman_id,
            userId: handymanDetails.data.user_id,
            handymanName: handymanDetails.data.handyman_name,
            handymanPhoneNumber: handymanDetails.data.handyman_phone_number,
            categories: handymanDetails.data.category_list,
            experience: handymanDetails.data.experience,
            about: handymanDetails.data.about,
            address: handymanDetails.data.address,
            onlineStatus: handymanDetails.data.online_status,
          }),
        );
      }

      // Alert user about successful login
      Alert.alert(
        'Success',
        Strings.loginScreen.logInSuccess + ' User ID: ' + user.uid,
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to Ujret home screen
              navigation.navigate('Ujret');
            },
          },
        ],
      );
    } catch (error) {
      // Handle login errors
      Alert.alert('Error', Strings.loginScreen.logInError + ' \n' + error);
    }
  };

  // Rendering UI
  return (
    <ScrollView style={registration.container}>
      {/* Top back button strip */}
      <TopBackStrip navigation={navigation} lastScreen={'registration'} />
      <View style={{marginBottom: Metrics.x_x_large_margin}}>
        {/* Onboarding content */}
        <OnboardingContent
          headerText={Strings.loginScreen.headerText}
          subHeaderText={Strings.loginScreen.subHeaderText}
        />
      </View>

      {/* Authentication fields */}
      <AuthFields
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        isSignUp={false}
      />

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={registration.forgotPasswordText}>
          Forgot your password?
        </Text>
      </TouchableOpacity>

      <View style={registerMoreInfoScreenStyle.buttonsContainer}>
        {/* Large button for login */}
        <LargeBtn
          variant={'action'}
          text={Strings.loginScreen.loginButtonText}
          onPress={handleLogin}
        />
        <LargeBtn
          variant={'ghost'}
          text={'Create new account'}
          onPress={() => navigation.navigate('registration')}
        />
      </View>
    </ScrollView>
  );
};

// Exporting the component
export default LoginScreen;
