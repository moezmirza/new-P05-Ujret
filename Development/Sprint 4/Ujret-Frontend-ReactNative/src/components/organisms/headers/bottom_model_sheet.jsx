import React, {useState, createRef, useSelector} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
  navigate,
  navigation,
} from 'react-native';
import PrimaryButton from '../../atoms/buttons/primary_button';
import OnboardingContent from '../../molecules/intro_screen_content';
import {bottomsheet} from '../../../themes/allstyles/components';
import {H3MainStyles, P2MainStyles} from '../../../themes/styles';

const StaticBottomSheet = ({visible, onClose}) => {
  // const user = useSelector(state => state.user.userInfo);
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = Array.from({length: 4}, () => createRef());

  const handleCodeInput = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    console.log(newCode);
    if (text && index < code.length - 1) {
      inputRefs[index + 1].current.focus();
    }
    if (!text && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const verifyOtp = () => {
    const otp = code.join('');
    const simulatedCorrectOtp = '1234'; // This is a placeholder for the correct OTP

    if (otp === simulatedCorrectOtp) {
      Alert.alert('Success', 'OTP verified successfully.');
      onClose(); // Close the bottom sheet
    } else {
      Alert.alert('ErrorInvalid OTP. Please try again.');
    }
  };

  // const verifyOtp = async () => {
  // const otp = code.join('');
  // try {
  //   const response = await fetch('http://127.0.0.1:5000/api/v1/verify-user', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email: user.email,
  //       otp: otp,
  //     }),
  //   });
  //   const data = await response.json();
  //   if (data.success) {
  //     Alert.alert('Success', 'OTP verified successfully.');
  //     onClose(); // Close the bottom sheet
  //     navigation.navigate('login'); // Navigate to the login screen
  //   } else {
  //     Alert.alert('Error', 'Invalid OTP. Please try again.');
  //   }
  // } catch (error) {
  //   console.error(error);
  //   Alert.alert('Error', 'An error occurred during OTP verification.');
  // }
  // };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableOpacity
        style={bottomsheet.centeredView}
        activeOpacity={1}
        onPressOut={onClose}>
        <View style={bottomsheet.modalView}>
          <Text style={H3MainStyles.textStyle}>Please check your phone</Text>
          <Text style={P2MainStyles.textStyle}>we send an otp at +9231***</Text>

          <View style={bottomsheet.codeInputContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                style={bottomsheet.codeInput}
                onChangeText={text => handleCodeInput(text, index)}
                value={digit}
                maxLength={1}
                keyboardType="number-pad"
                textContentType="oneTimeCode" // For iOS autofill from SMS
                returnKeyType="done"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry // Optionally make the input secure
              />
            ))}
          </View>
          <View style={bottomsheet.resendTextContainer}>
            <Text style={bottomsheet.resendText}>Did not receive code?</Text>
            <TouchableOpacity>
              <Text style={bottomsheet.resendButtonText}>Resend code</Text>
            </TouchableOpacity>
          </View>
          <PrimaryButton text="Verify" onPress={verifyOtp} />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default StaticBottomSheet;
