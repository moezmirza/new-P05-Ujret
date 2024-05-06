import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

// import components
import LargeBtn from '../components/atoms/buttons/large_btn';
import H3Main from '../components/atoms/headings/h3_main';
import H5Small from '../components/atoms/headings/h5_small';

// Styles, Themes, Metrics
import {
  H5SmallStyles,
  H3MainStyles,
  inputFieldStyles,
  registerMoreInfoScreenStyle,
  H4SubMainStyles,
  P2MainStyles,
  ujretStyles,
} from '../themes/styles';
import {Metrics} from '../themes/metrics';
import {Colors, ColorsLight} from '../themes/colors';

// Redux
import {useSelector, useDispatch} from 'react-redux'; // Import useSelector to access Redux store state

// Util
import {catListChangeToSmallCase} from '../utils/utilities';

// Api
import {checkThisBidStatus} from '../api_layer/tasks_apis';

// component Definition
const TaskStatusScreen = ({navigation}) => {
  // get data taskInfo from the Redux
  const task = useSelector(state => state.task.taskInfo);
  console.log('taskInfo on TaskStatusScreen:\n', task);
  const [currentStatus, setCurrentStatus] = useState(false);

  // Open WhatsApp with a predefined message
  const openWhatsApp = (text, phoneNumber) => {
    // The number must be in international format
    const url = `whatsapp://send?text=${encodeURIComponent(
      text,
    )}&phone=${phoneNumber}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'WhatsApp is not installed');
    });
  };

  // Placeholder function for the call action
  const makeCall = phoneNumber => {
    let url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to make a call');
    });
  };

  const checkStatus = async () => {
    // status check called
    console.log('Check Status Called');
    try {
      const response = await checkThisBidStatus(task.bidId);
      console.log('Check Status Response:', response);

      // if status is 201, then Bid is completed
      if (response.status_code === 201) {
        if (response.data === 'PENDING') {
          Alert.alert('Status', 'Your Bid is still pending');
        } else if (response.data === 'ACCEPTED') {
          Alert.alert(
            'Status',
            'Your Bid is accepted, Navigate to Task Details',
            [
              {
                text: 'OK',
                onPress: () => {
                  // Navigate to Ujret home screen
                  navigation.navigate('AcceptTaskBidScreen');
                },
              },
            ],
          );
        } else if (response.data === 'DECLINED') {
          Alert.alert(
            'Status',
            'Your Bid is rejected, Bid to other Task or try decreasing Bid price for this Task',
            [
              {
                text: 'OK',
                onPress: () => {
                  // Navigate to Ujret home screen
                  navigation.navigate('TaskProviderTasks');
                },
              },
            ],
          );
        }
      }
    } catch (error) {
      console.log('Error in checkStatus:', error);
      Alert.alert('Error', 'Failed in checking status' + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <H3Main color={Colors.primaryColor}>Task Details and Bid Status</H3Main>
      </View>

      {/* Task Details Block */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.name}>
            {task.serviceSeekerName.split(' ')[0]}
          </Text>
          <Text style={styles.price}>PKR {task.price}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.category}>
            {task.category
              .toLowerCase()
              .replace(/(?:^|\s)\w/g, function (match) {
                return match.toUpperCase();
              })}{' '}
            Required
          </Text>
          <Text style={styles.duration}>{task.duration} hr Long</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.description}>Address: {task.address}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.description}>
            Description: I want{' '}
            {catListChangeToSmallCase(task.subCategories).join(', ')} services.{' '}
            {task.description}
          </Text>
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              makeCall(task.handymanPhoneNumber);
            }}>
            <LinearGradient
              start={{x: 0.0, y: 0.0}}
              end={{x: 1.0, y: 1.0}}
              colors={ujretStyles.moduleCon.gradientColors}
              style={{
                padding: Metrics.mediumPadding,
                borderRadius: 30,
              }}>
              <Ionicons name="call-outline" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              openWhatsApp(
                `Hello ${
                  task.handymanName.split(' ')[0]
                } ! \n I accepted your Bid offer at *Ujret*, When You'll reach at the address ?`,
                task.handymanPhoneNumber,
              );
            }}>
            <LinearGradient
              start={{x: 0.0, y: 0.0}}
              end={{x: 1.0, y: 1.0}}
              colors={ujretStyles.moduleCon.gradientColors}
              style={{
                padding: Metrics.mediumPadding,
                borderRadius: 30,
              }}>
              <Ionicons name="logo-whatsapp" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Submit Button */}
      <View style={registerMoreInfoScreenStyle.buttonsContainer}>
        <LargeBtn text={'Check Bid Status'} onPress={checkStatus} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: Metrics.baseMargin,
    alignItems: 'center',
  },
  card: {
    backgroundColor: ColorsLight.primaryWhite,
    borderRadius: 8,
    padding: 16,
    borderColor: ColorsLight.green6,
    borderWidth: 1,
    width: '100%',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  name: {
    ...H3MainStyles.textStyle,
    color: ColorsLight.primaryBlack,
  },
  price: {
    ...H3MainStyles.textStyle,
    color: ColorsLight.green6,
  },
  category: {
    ...H4SubMainStyles.textStyle,
    color: ColorsLight.primaryBlack,
  },
  duration: {
    ...H4SubMainStyles.textStyle,
    color: ColorsLight.green6,
  },
  description: {
    ...P2MainStyles.textStyle,
    color: ColorsLight.primaryBlack,
    textAlign: 'left',
    fontFamily: 'Poppins-Medium',
  },
  header: {
    alignItems: 'center',
    marginTop: Metrics.large_margin,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  bidField: {
    alignItems: 'flex-start',
    marginBottom: Metrics.medium_margin,
  },
});

export default TaskStatusScreen;
