import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

// import components
import H3Main from '../components/atoms/headings/h3_main';
import H5Small from '../components/atoms/headings/h5_small';
import LargeBtn from '../components/atoms/buttons/large_btn';
import TopBackStrip from '../components/molecules/top_back_button_strip';

// Styles, Themes, Metrics
import {
  H5SmallStyles,
  H3MainStyles,
  inputFieldStyles,
  registerMoreInfoScreenStyle,
  H4SubMainStyles,
  P2MainStyles,
} from '../themes/styles';
import {Metrics} from '../themes/metrics';
import {Colors, ColorsLight} from '../themes/colors';

// APis
import {createBidTask} from '../api_layer/tasks_apis';

// Redux
import {useSelector, useDispatch} from 'react-redux'; // Import useSelector to access Redux store state
import {setTask} from '../stores/task_slice';

// Util
import {catListChangeToSmallCase} from '../utils/utilities';

// Component for the TaskResponseScreen
const TaskResponseScreen = ({navigation, route}) => {
  // Get parans fron Routes
  const {task} = route.params;

  const dispatch = useDispatch();

  const [desc, setDesc] = useState('');
  const [bid, setBid] = useState('');
  const [taskerPrice, setTaskerPrice] = useState('');
  const [availability, setAvailability] = useState('');

  if (!task) {
    console.error('No task object passed to TaskResponseScreen');
    Alert.alert('Error', 'No task data provided.');
    return;
  }

  // Extract details from Redux store
  const handymanInfo = useSelector(state => state.handyman.handymanInfo);
  const userInfo = useSelector(state => state.user.userInfo);
  const taskInfo = useSelector(state => state.task.taskInfo);
  // console.log('handymanInfo on TaskResponseScreen:\n', handymanInfo);
  // console.log('userInfo on TaskResponseScreen:\n', userInfo);
  // console.log('taskInfo on TaskResponseScreen:\n', taskInfo);
  // console.log('Task as params on TaskResponseScreen: \n', task);

  // Handle bid submission
  const handleBidSubmit = async () => {
    if (!bid || !desc) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    } else {
      try {
        // createBidTask;
        const response = await createBidTask({
          amount: bid,
          description: desc,
          handymanId: handymanInfo.handymanId,
          taskId: task.task_id,
        });

        //  if response.status_code == 201 success
        if (response.status_code == 201) {
          console.log('Response from createBidTask:', response);
          dispatch(
            setTask({
              ...taskInfo,
              taskId: task.task_id,
              category: task.category,
              subCategories: task.sub_categories,
              description: task.description,
              address: task.address,
              budget: task.budget,
              duration: task.duration,
              taskStatus: task.taskStatus,
              createdAt: task.createdAt,
              serviceSeekerId: task.service_seeker_id,
              serviceSeekerName: task.service_seeker_name,
              serviceSeekerPhoneNumber: task.service_seeker_number,
              bidId: response.data,
              price: bid,
              bidDescription: desc,
              handymanId: handymanInfo.handymanId,
              handymanName: handymanInfo.handymanName,
              handymanPhoneNumber: handymanInfo.handymanPhoneNumber,
            }),
          );

          // Navigate to TaskStatus
          navigation.navigate('TaskStatus');
        }
      } catch (error) {
        // console.error('Error in handleBidSubmit:', error);
        Alert.alert('Error', 'Failed to submit bid.' + error.message);
        return;
      }
    }
  };

  // Render UI
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TopBackStrip navigation={navigation} />

      <View style={styles.header}>
        <H3Main color={Colors.primaryColor}>
          Offer your price for the below Task
        </H3Main>
      </View>

      {/* Task Details Block */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.name}>
            {task.service_seeker_name.split(' ')[0]}
          </Text>
          <Text style={styles.price}>PKR {task.budget}</Text>
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
            {catListChangeToSmallCase(task.sub_categories).join(', ')} services.{' '}
            {task.description}
          </Text>
        </View>
      </View>

      {/* Bid Price and Description */}
      <View>
        <View style={styles.bidField}>
          <View>
            <H5Small>Add Bid Price</H5Small>
          </View>
          <TextInput
            placeholderTextColor="grey"
            placeholder="0"
            value={bid.toString()}
            onChangeText={text => {
              const parsedBid = /^\d+$/.test(text) ? parseInt(text) : '';
              setBid(parsedBid);
            }}
            style={[
              inputFieldStyles.textInputStyles.input,
              inputFieldStyles.textInputStyles.font,
            ]}
          />
        </View>
        <View style={inputFieldStyles.outerContainer}>
          <Text style={H5SmallStyles.textStyle}>Description</Text>
          <TextInput
            placeholderTextColor="grey"
            placeholder="Write any relevant detail here."
            value={desc}
            onChangeText={setDesc}
            style={[
              inputFieldStyles.textInputStyles.description,
              {
                height: Math.max(35, desc.split('\n').length * 100),
                color: ColorsLight.primaryBlack,
              },
            ]}
            multiline={true}
          />
        </View>
      </View>

      {/* Submit Button */}
      <View style={registerMoreInfoScreenStyle.buttonsContainer}>
        <LargeBtn text={'Submit'} onPress={handleBidSubmit} />
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
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    // shadowOffset: {width: 0, height: 2},
    // elevation: 3,
    width: '100%',
    marginVertical: 20,
    marginBottom: 36,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
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

export default TaskResponseScreen;
