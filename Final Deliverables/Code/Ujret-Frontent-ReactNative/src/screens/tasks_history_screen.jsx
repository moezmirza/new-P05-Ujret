// Task history screen
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

// Styles and themes
import {ColorsLight} from '../themes/colors';
import {Metrics, Spacing} from '../themes/metrics';
import {
  H5SmallStyles,
  H3MainStyles,
  H4SubMainStyles,
  P2MainStyles,
  H7XXSmallStyles,
} from '../themes/styles';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {setTask, clearTask} from '../stores/task_slice';

// API
import {getUserAllTasks, getHandymanAllTasks} from '../api_layer/tasks_apis';

// utils
import {catListChangeToSmallCase} from '../utils/utilities';

// Definition of
const TasksHistoryScreen = ({navigation}) => {
  // Extracting from Redux store
  const userInfo = useSelector(state => state.user.userInfo);
  const handymanInfo = useSelector(state => state.handyman.handymanInfo);
  const taskInfo = useSelector(state => state.task.taskInfo);
  // console.log('User Info on TasksHistoryScreen:', userInfo);
  // console.log('Handyman Info on TasksHistoryScreen:', handymanInfo);

  // State Variables
  const [activeSide, setActiveSide] = useState('none');
  const [tasks, setTasks] = useState([]);
  const dispatch = useDispatch();

  // Handle Shift
  const handleShift = async side => {
    setActiveSide(side);
    setTasks([]);
    if (side === 'user') {
      if (userInfo) {
        console.log('User Info:', userInfo.uid);
        // Fetch tasks created by user
        try {
          const response = await getUserAllTasks(userInfo.uid);
          console.log('Response:', response);
          setTasks(response.data);
        } catch (error) {
          Alert.alert('Info', 'Error in fetching tasks. ' + error.message);
        }
      } else {
        Alert.alert('Info', 'UserInfo Does not Exists in Redux!');
      }
    } else {
      setTasks([]);
      if (handymanInfo) {
        console.log('handymanInfo Info:', handymanInfo.handymanId);
        // Fetch tasks created by user
        try {
          const response = await getHandymanAllTasks(handymanInfo.handymanId);
          console.log('Response:', response);
          setTasks(response.data);
        } catch (error) {
          Alert.alert('Info', 'Error in fetching tasks. ' + error.message);
        }
      } else {
        Alert.alert('Info', 'HandymanInfo Does not Exists in Redux!');
      }
    }
  };

  // handleTaskPress
  const handleTaskPress = _task => {
    const user = activeSide === 'user';
    console.log(_task);
    console.log('taskInfo:\n', taskInfo);
    // {"address": "G9V3+MR2, Street N, Upper Mall Scheme, Lahore, Punjab, Pakistan", "budget": 1000, "category": "COOK", "createdAt": "2024-05-01T10:55:25.255Z", "description": "i need these to be done soon", "duration": 1, "handyman_name": " ", "price": null, "scheduledDate": "2024-05-01T10:55:25.255Z", "scheduledTime": "2024-05-01T10:55:25.255Z", "sub_categories": ["EVENT_CATERING", "PERSONAL_CHEF", "BAKING"], "taskStatus": "PENDING", "task_id": "e0e3fecf-749a-45f9-a1e5-3425d6035b77"}
    if (_task.taskStatus !== 'COMPLETED') {
      dispatch(
        setTask({
          taskId: _task.task_id,
          category: _task.category,
          subCategories: _task.sub_categories,
          description: _task.description,
          address: _task.address,
          budget: _task.budget,
          duration: _task.duration,
          taskStatus: _task.taskStatus,
          createdAt: _task.createdAt,
          serviceSeekerId: _task.service_seeker_id,
          serviceSeekerName: _task.service_seeker_name,
          serviceSeekerPhoneNumber: _task.service_seeker_number,
          bidId: _task.taskStatus === 'ACCEPTED' ? _task.bid_id : null,
          price: _task.taskStatus === 'ACCEPTED' ? _task.price : null,
          bidDescription:
            _task.taskStatus === 'ACCEPTED' ? _task.bid_description : null,
          handymanId: _task.handyman_id,
          handymanName: _task.handyman_name,
          handymanPhoneNumber: _task.handyman_number,
        }),
      );
      Alert.alert('Info', 'Do you want to continue with this Task?', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate(
              _task.taskStatus === 'PENDING'
                ? 'TasksOffersScreen'
                : 'TaskAccept',
            );
          },
        },
      ]);
    } else {
      if (user) {
        Alert.alert(
          'Info',
          `This Task has been completed successfully by ${_task.handyman_name} in PKR ${_task.price}`,
        );
      } else {
        Alert.alert(
          'Info',
          `You successfully completed this Task for ${_task.service_seeker_name} in PKR ${_task.price}`,
        );
      }
    }
  };

  // useEffect so that at the start of the screen, when user junp in task should be loaded
  useEffect(() => {
    handleShift('user');
  }, [navigation]);

  return (
    <ScrollView
      style={styles.screenContainer}
      contentContainerStyle={styles.screenContentContainerStyle}>
      <View style={styles.shiftStrip}>
        <TouchableOpacity
          onPress={() => {
            handleShift('user');
          }}>
          <Text
            style={
              activeSide === 'user'
                ? styles.shiftStripActiveText
                : styles.shiftStripInactiveText
            }>
            Tasks you created
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleShift('handyman');
          }}>
          <Text
            style={
              activeSide === 'handyman'
                ? styles.shiftStripActiveText
                : styles.shiftStripInactiveText
            }>
            Tasks You Did
          </Text>
        </TouchableOpacity>
      </View>
      {tasks.length === 0 ? (
        <Text style={{...H5SmallStyles.textStyle}}>Loading Tasks List</Text>
      ) : (
        ''
      )}

      {/* Task Details Block */}
      {tasks.map(task => {
        const pending = task.taskStatus === 'PENDING';
        const user = activeSide === 'user';
        return (
          <TouchableOpacity
            style={styles.card}
            key={task.task_id}
            onPress={() => {
              handleTaskPress(task);
            }}>
            <View style={{...styles.row, marginBottom: -4}}>
              <Text style={styles.label}>
                Service {user ? 'Provider' : 'Seeker'}
              </Text>
              <Text style={styles.label}>
                {task.price ? 'Price' : 'Budget'}
              </Text>
            </View>
            <View style={styles.row}>
              {task.handyman_name && task.handyman_name.length > 1 ? (
                <Text style={styles.name}>
                  {task.handyman_name.split(' ')[0]}
                </Text>
              ) : !task.handyman_name && pending ? (
                <Text style={{...styles.name, color: ColorsLight.red1}}>
                  Not Accepted Yet
                </Text>
              ) : task.service_seeker_name ? (
                <Text style={styles.name}>
                  {task.service_seeker_name.split(' ')[0]}
                </Text>
              ) : (
                <Text>Name Not Mentioned</Text>
              )}
              <Text style={styles.price}>
                PKR {task.price ? task.price : task.budget}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.category}>
                Contact:{' '}
                {task.service_seeker_number
                  ? task.service_seeker_number
                  : task.handyman_number}
              </Text>
            </View>
            <View style={{...styles.row, marginBottom: -2, marginTop: 8}}>
              <Text style={styles.label}>Task Details</Text>
              <Text style={styles.label}>Task Duration</Text>
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
                {/* Description: {task.description} */}
                Description: I want{' '}
                {catListChangeToSmallCase(task.sub_categories).join(', ')}{' '}
                services. {task.description}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={{...styles.category, ...H5SmallStyles.textStyle}}>
                Task Status
              </Text>
              <Text
                style={
                  task.taskStatus === 'COMPLETED'
                    ? styles.statusCompleted
                    : task.taskStatus === 'ACCEPTED'
                    ? styles.statusAccepted
                    : styles.statusPending
                }>
                {task.taskStatus === 'ACCEPTED'
                  ? 'BID ACCEPTED'
                  : task.taskStatus}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    backgroundColor: ColorsLight.primaryWhite,
    padding: Spacing.small,
    overflow: 'visible',
  },
  screenContentContainerStyle: {
    flexGrow: 1,
    horizontalAlign: 'center',
  },
  shiftStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: ColorsLight.primaryWhite,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 6,
    borderRadius: 24,
    borderColor: ColorsLight.grey3,
    borderWidth: 0.3,
    overflow: 'hidden',
    marginVertical: 32,
    marginTop: 22,
    padding: 16,
    paddingHorizontal: 16,
  },
  shiftStripActiveText: {
    ...H5SmallStyles.textStyle,
    color: ColorsLight.primaryWhite,
    backgroundColor: ColorsLight.primaryGreen,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  shiftStripInactiveText: {
    ...H5SmallStyles.textStyle,
    color: ColorsLight.primaryGreen,
    backgroundColor: ColorsLight.green7,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  card: {
    backgroundColor: ColorsLight.primaryWhite,
    borderRadius: 8,
    padding: 16,
    paddingBottom: 10,
    paddingTop: 20,
    borderColor: ColorsLight.green6,
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 6,
    width: '100%',
    marginBottom: 32,
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
  label: {
    ...H7XXSmallStyles.textStyle,
    color: ColorsLight.grey1,
    textAlign: 'left',
  },
  statusPending: {
    ...H5SmallStyles.textStyle,
    color: ColorsLight.red1,
    backgroundColor: '#FFE0DF',
    paddingHorizontal: Spacing.x_small,
    borderRadius: 8,
  },
  statusAccepted: {
    ...H5SmallStyles.textStyle,
    ...H5SmallStyles.textStyle,
    color: '#FF6A16',
    backgroundColor: '#FFE2CE',
    paddingHorizontal: Spacing.x_small,
    borderRadius: 8,
  },
  statusCompleted: {
    ...H5SmallStyles.textStyle,
    ...H5SmallStyles.textStyle,
    color: ColorsLight.green6,
    backgroundColor: '#D1FFFF',
    paddingHorizontal: Spacing.x_small,
    borderRadius: 8,
  },
  // Add any additional styles you may need for the screen
});

export default TasksHistoryScreen;
