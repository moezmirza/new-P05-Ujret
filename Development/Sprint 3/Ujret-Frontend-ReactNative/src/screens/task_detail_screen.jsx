// task_detail_screen
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Map imports
import MapView from 'react-native-maps';
Geocoder.init('AIzaSyD3MRohSRm1LLc8XIoqyFDZDdEUFQ4K8n4');
import Geocoder from 'react-native-geocoding';

// Styling
import {
  screenContainerStyleWhite,
  registerMoreInfoScreenStyle,
  H3MainStyles,
  inputFieldStyles,
  H5SmallStyles,
} from '../themes/styles';
import {datetime} from '../themes/allstyles/components';

// Components
import TopBackStrip from '../components/molecules/top_back_button_strip';
import LargeBtn from '../components/atoms/buttons/large_btn';
import LogoutButton from '../components/atoms/buttons/pop_up_primary_button';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Redux imports
import {useDispatch, useSelector} from 'react-redux';
import {clearTask, setTask} from '../stores/task_slice';

// API
import {createTask} from '../api_layer/tasks_apis';

// Component definition
const TaskDetailScreen = ({route, navigation}) => {
  // Extracting parameters from route
  const {service} = route.params;

  // Dispatch function
  const dispatch = useDispatch();

  // Extracting from Redux store
  const userInfo = useSelector(state => state.user.userInfo);
  const taskInfo = useSelector(state => state.task.taskInfo);

  // State variables
  const [subCatList, setSubCatList] = useState([{id: 0, name: 'Others'}]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  // const [tasks, setTasks] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [budget, setBudget] = useState(0);
  const [timeRequired, setTimeRequired] = useState(0);
  const [images, setImages] = useState([]);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [isAM, setIsAM] = useState(true);

  // Fetching Subcategories list from AsyncStorage
  useEffect(() => {
    const fetch = async () => {
      const HandymenSubCategoriesList = await AsyncStorage.getItem(
        'HandymenSubCategoriesList',
      );
      setSubCatList(JSON.parse(HandymenSubCategoriesList));
    };
    fetch();
    console.log('SubCatList:', subCatList);
  }, []);

  // Date picker change handler
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  // Date change handler
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(false);
    setDate(currentDate);
  };

  // Time change handler
  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTime(false);
    setTime(currentTime);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  // Show date picker handler
  const showDatepicker = () => {
    setShowDate(true);
  };

  // Show time picker handler
  const showTimepicker = () => {
    setShowTime(true);
  };

  // Toggle AM/PM
  const toggleAmPm = () => {
    setIsAM(!isAM);
  };

  // Format date string
  const formatDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  // Format time string
  const formatTime = `${time.getHours() % 12 || 12}:${time
    .getMinutes()
    .toString()
    .padStart(2, '0')} ${isAM ? 'AM' : 'PM'}`;

  // Time change handler
  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTime(false);
    setTime(currentTime);
    // Update AM/PM state based on the hour
    setIsAM(currentTime.getHours() < 12);
  };

  // Function to handle task selection
  const handleTaskSelect = tasks => {
    setSelectedTasks(tasks);
  };

  // Function to get task names from IDs
  const getSelectedTaskNames = () => {
    const selectedTaskNames = selectedTasks.map(taskId => {
      const task = subCatList.find(item => item.id === taskId);
      return task ? task.name : ''; // Return the name if found, or an empty string otherwise
    });
    return selectedTaskNames;
  };

  // Function to handle task detail submission
  const handleTaskDetailSubmit = async () => {
    const taskDetails = {
      uid: userInfo.uid,
      category: service.name,
      subCategories: getSelectedTaskNames().join(','),
      description,
      address,
      budget,
      duration: timeRequired,
      date: date.toISOString(),
      time: time.toISOString(),
      images: images.map(img => img.uri),
    };

    // Check if timeRequired, budget, and address meet the conditions
    if (
      timeRequired === 0 ||
      budget === 0 ||
      address === '' ||
      selectedTasks.length === 0
    ) {
      // Alert the user to fill in the required details
      Alert.alert('Alert', 'Please fill in all required details.');
      return;
    }

    const createTaskRequest = async () => {
      try {
        const response = await createTask(taskDetails);
        console.log('Task creation response:', response);

        // Dispatch the task details to the Redux store
        if (response.status_code === 201) {
          console.log('Task info:\n', taskInfo);
          console.log('subCatList: ', getSelectedTaskNames());
          dispatch(clearTask());
          dispatch(
            setTask({
              ...taskInfo,
              taskId: response.data,
              category: service.name,
              subCategories: getSelectedTaskNames(),
              description: description,
              address: address,
              budget: budget,
              duration: timeRequired,
            }),
          );
          // Navigate to TasksOffersScreen screen
          navigation.navigate('TasksOffersScreen');

          // // Alert user about successful task creation
          // Alert.alert('Success', response.message, [
          //   {
          //     text: 'OK',
          //     onPress: () => {
          //       // Navigate to TasksOffersScreen screen
          //       navigation.navigate('TasksOffersScreen', {
          //         taskOffers: simulatedResponseData,
          //       });
          //     },
          //   },
          // ]);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to create task ' + error);
      }
    };

    createTaskRequest();
  };

  // Function to handle adding images
  const handleImageUpload = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then(images => {
        // Process the images array and update the state
        const newImages = images.map(i => {
          return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
        });
        setImages([...images, ...newImages]);
      })
      .catch(e => console.log(e));
  };

  // Rendering UI
  return (
    <ScrollView
      contentContainerStyle={{
        ...screenContainerStyleWhite,
        flexGrow: 2,
      }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isMapVisible}
        onRequestClose={() => setIsMapVisible(false)}>
        <View style={{flex: 1}}>
          <MapView
            style={{flex: 1}}
            initialRegion={{
              latitude: 31.5497,
              longitude: 74.3436,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            // Add onPress or onLongPress depending on how you want to capture the location
            onPress={e => {
              const coords = e.nativeEvent.coordinate;
              Geocoder.from(coords.latitude, coords.longitude)
                .then(json => {
                  const addressComponent = json.results[0].formatted_address;
                  setAddress(addressComponent);
                })
                .catch(error => console.warn(error));
              setIsMapVisible(false);
            }}
          />
          {/* Add a button to close the modal */}
          <TouchableOpacity onPress={() => setIsMapVisible(false)}>
            <Text>Close Map</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View
        style={{
          ...registerMoreInfoScreenStyle.topStripOuter,
          marginBottom: 32,
        }}>
        <TopBackStrip navigation={navigation}></TopBackStrip>
      </View>

      <View style={{width: '85%'}}>
        <Text style={{...H3MainStyles.textStyle, marginBottom: 64}}>
          Enter Task Details and Find Best {service.name}
        </Text>
      </View>

      <View style={registerMoreInfoScreenStyle.formContainer}>
        {/* MultiSelect for selecting tasks */}
        <View style={inputFieldStyles.outerContainer}>
          <Text style={H5SmallStyles.textStyle}>Tasks*</Text>
          <SectionedMultiSelect
            items={subCatList}
            IconRenderer={Icon}
            uniqueKey="id"
            subKey="items"
            selectedItems={selectedTasks}
            selectText="What Services Do You Require?"
            searchPlaceholderText="Search Services..."
            value={selectedTasks.join(', ')}
            onSelectedItemsChange={setSelectedTasks}
            styles={{
              selectToggle: {
                display: 'flex',
                backgroundColor: '#EAFFF9',
                width: '100%',
                height: 60,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 15,
                paddingVertical: 20,
                marginBottom: 10,
              },
              selectToggleText: {...inputFieldStyles.textInputStyles.font},
              chipText: {...inputFieldStyles.textInputStyles.font},
            }}
          />
        </View>

        {/* Description Input */}
        <View style={inputFieldStyles.outerContainer}>
          <Text style={H5SmallStyles.textStyle}>Description</Text>
          <TextInput
            placeholderTextColor="grey"
            placeholder="Write Description of the Task here"
            value={description}
            onChangeText={setDescription}
            style={[
              inputFieldStyles.textInputStyles.description,
              inputFieldStyles.textInputStyles.font,
            ]}
            multiline={true}
            maxLength={250}
          />
        </View>

        {/* Single Address Field */}
        <TouchableOpacity onPress={() => setIsMapVisible(true)}>
          <View style={inputFieldStyles.outerContainer}>
            <Text style={H5SmallStyles.textStyle}>Address*</Text>
            <TextInput
              placeholderTextColor="grey"
              placeholder="Enter Your Address."
              value={address}
              onChangeText={setAddress}
              style={[
                inputFieldStyles.textInputStyles.description,
                inputFieldStyles.textInputStyles.font,
              ]}
              multiline={true}
              maxLength={250}
            />
            <Icon
              name="location-pin"
              type="font-awesome"
              size={30}
              color="#000"
              onPress={() => setIsMapVisible(true)}
            />
          </View>
        </TouchableOpacity>

        {/* Budget Input */}
        <View style={inputFieldStyles.outerContainer}>
          <Text style={H5SmallStyles.textStyle}>Your Budget to Pay*</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <TextInput
              placeholder="0"
              value={budget.toString()}
              onChangeText={text => {
                // Check if the input is a valid number or empty string
                const parsedBudget = /^\d+$/.test(text) ? parseInt(text) : '';
                setBudget(parsedBudget);
              }}
              keyboardType="numeric"
              style={{
                ...inputFieldStyles.textInputStyles.input,
                ...inputFieldStyles.textInputStyles.font,
                width: '66%',
              }}
            />
            <TouchableOpacity
              onPress={() => {
                budget !== 0 ? setBudget(budget - 5) : setBudget(0);
              }}
              style={{
                height: 40,
                width: '15%',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{...H3MainStyles.textStyle, marginHorizontal: 'auto'}}>
                -
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setBudget(budget + 5)}
              style={{
                height: 40,
                width: '15%',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{...H3MainStyles.textStyle, marginHorizontal: 'auto'}}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Time Required Input */}
        <View style={inputFieldStyles.outerContainer}>
          <Text style={H5SmallStyles.textStyle}>
            Time required for task in Hours*
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <TextInput
              placeholder="0"
              value={timeRequired.toString()}
              onChangeText={text => {
                // Check if the input is a valid number or empty string
                const parsedTimeRequired = /^\d+$/.test(text)
                  ? parseInt(text)
                  : '';
                setTimeRequired(parsedTimeRequired);
              }}
              keyboardType="numeric"
              style={{
                ...inputFieldStyles.textInputStyles.input,
                ...inputFieldStyles.textInputStyles.font,
                width: '66%',
              }}
            />
            <TouchableOpacity
              onPress={() => {
                timeRequired !== 0
                  ? setTimeRequired(timeRequired - 1)
                  : setTimeRequired(0);
              }}
              style={{
                height: 40,
                width: '15%',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{...H3MainStyles.textStyle, marginHorizontal: 'auto'}}>
                -
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTimeRequired(timeRequired + 1)}
              style={{
                height: 40,
                width: '15%',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{...H3MainStyles.textStyle, marginHorizontal: 'auto'}}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upload Images
        <Text>Upload Images</Text>
        <LogoutButton onPress={handleImageUpload} text={'Upload Images'} />

        <View style={{flexDirection: 'row', padding: 10}}>
          {images.map((image, index) => (
            <Image
              key={index}
              source={{uri: image.uri}}
              style={{width: 50, height: 50, marginRight: 5}}
            />
          ))}
        </View> */}
      </View>
      {/* <View style={datetime.main}>
        <View style={datetime.container}>
          <Text style={datetime.title}>Schedule Task for later</Text>

          <View style={datetime.pickerContainer}>
            <TouchableOpacity
              onPress={showDatepicker}
              style={datetime.selectButton}>
              <Text style={datetime.select}>Select Date</Text>
            </TouchableOpacity>

            <View style={datetime.dateInputContainer}>
              <TextInput
                style={datetime.input}
                value={formatDate}
                editable={false}
              />
            </View>

            {showDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}

            <TouchableOpacity
              onPress={showTimepicker}
              style={datetime.selectButton}>
              <Text style={datetime.select}>Select Time</Text>
            </TouchableOpacity>

            <View style={datetime.timeInputContainer}>
              <TextInput
                style={datetime.input}
                value={formatTime}
                editable={false}
              />
              <TouchableOpacity
                style={[
                  datetime.amPmButton,
                  isAM ? datetime.amPmButtonActive : {},
                ]}
                onPress={() => setIsAM(true)}>
                <Text>AM</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  datetime.amPmButton,
                  !isAM ? datetime.amPmButtonActive : {},
                ]}
                onPress={() => setIsAM(false)}>
                <Text>PM</Text>
              </TouchableOpacity>
            </View>

            {showTime && (
              <DateTimePicker
                testID="dateTimePicker"
                value={time}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={onChangeTime}
              />
            )}
          </View>
        </View>
      </View> */}
      <View style={registerMoreInfoScreenStyle.buttonsContainer}>
        <LargeBtn text={'Find Now !'} onPress={handleTaskDetailSubmit} />
      </View>
    </ScrollView>
  );
};

export default TaskDetailScreen;
