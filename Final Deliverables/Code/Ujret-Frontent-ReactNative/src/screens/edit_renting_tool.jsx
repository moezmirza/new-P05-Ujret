import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';

// Map imports
import MapView from 'react-native-maps';
Geocoder.init('AIzaSyD3MRohSRm1LLc8XIoqyFDZDdEUFQ4K8n4');
import Geocoder from 'react-native-geocoding';

// Components
import TopBackStrip from '../components/molecules/top_back_button_strip';
import LargeBtn from '../components/atoms/buttons/large_btn';

// Styles
import {
  registerMoreInfoScreenStyle,
  inputFieldStyles,
  H5SmallStyles,
  H3MainStyles,
} from '../themes/styles';

// Themes and Colors and constants
import {Spacing, Metrics} from '../themes/metrics';
import {ColorsLight} from '../themes/colors';

// Redux
import {useSelector} from 'react-redux';

// APIs
import {CategoryList, updateTool} from '../api_layer/renting_api';

// Utils
import {catListChangeToSmallCase} from '../utils/utilities';

// Conponent definition
const EditRentingTool = ({route, navigation}) => {
  // Route parameters
  const {tool} = route.params;
  console.log('Route Params:', tool);
  // {"address": "LUMS university, M7", "category": "ELECTRONIC", "createdAt": "2024-05-05T10:41:39.952Z", "description": "Air Conditioner", "id": "daca38b1-6a4a-4b1f-b6df-24fdfc5204d5", "imgURLs": [""], "rent": 100, "renterId": "9d82da98-a62e-5488-81b3-7f3d1bac28d7", "renterName": "Moez ", "renterPhoneNumber": "+923177582941", "status": "AVAILABLE", "title": "AC4"}
  console.log(catListChangeToSmallCase([tool.status])[0]);
  console.log(catListChangeToSmallCase([tool.category])[0]);

  // Category list conversion
  const transformedCategoryList = catListChangeToSmallCase(CategoryList);

  // Fetching userInfo froj redux
  const userInfo = useSelector(state => state.user.userInfo);

  // State variables
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [available, setAvailable] = useState(
    catListChangeToSmallCase([tool.status])[0],
  );
  const [title, setTitle] = useState(tool.title);
  const [rent, setRent] = useState(tool.rent);
  const [category, setCategory] = useState(
    catListChangeToSmallCase([tool.category])[0],
  );
  const [address, setAddress] = useState(tool.address);
  const [description, setDescription] = useState(tool.description);

  // handleUpdateTool function
  const handleUpdateTool = async () => {
    if (!title || !rent || !category || !address || !description) {
      Alert.alert('Info', 'Please fill all the fields');
      return;
    } else {
      try {
        const response = await updateTool(
          tool.id,
          available,
          title,
          category,
          rent,
          address,
          description,
        );
        console.log('Response:', response);
        if (response.status_code === 201) {
          Alert.alert(
            'Success',
            'Tool has been added successfully ' + response.message,
            [
              {
                text: 'OK',
                onPress: () => navigation.navigate('RentingHomeScreen'),
              },
            ],
          );
        } else {
          Alert.alert('Error', 'Failed to add tool');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to add tool ' + error.message);
      }
    }
  };

  // Render Ui
  return (
    <ScrollView
      // style={{flexGrow: 2}}
      contentContainerStyle={styles.screenContainer}>
      {/* Nap view  */}
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

      {/* Screen Render */}
      <TopBackStrip navigation={navigation} />
      <Text style={styles.screenTitle}>Edit Your Tool Info</Text>

      {/* Edit availablity */}
      <View style={styles.formContainer}>
        {/* Available Picker */}
        <View style={inputFieldStyles.outerContainer}>
          <Text style={H5SmallStyles.textStyle}>Edit Availability</Text>
          <Picker
            style={[
              inputFieldStyles.dropDownStyles.input,
              inputFieldStyles.dropDownStyles.font,
            ]}
            selectedValue={available}
            onValueChange={itemValue => setAvailable(itemValue)}>
            {catListChangeToSmallCase(['AVAILABLE', 'NOT_AVAILABLE']).map(
              (_availability, index) => (
                <Picker.Item
                  key={`${index}-${_availability}`}
                  label={_availability}
                  value={_availability}
                  style={inputFieldStyles.dropDownStyles.font}
                />
              ),
            )}
          </Picker>
        </View>
      </View>

      <View style={styles.formContainer}>
        {/* Title input */}
        <View style={inputFieldStyles.outerContainer}>
          <Text style={H5SmallStyles.textStyle}>Title*</Text>
          <TextInput
            placeholderTextColor="grey"
            placeholder="Add Title for The Tool."
            value={title}
            onChangeText={setTitle}
            style={[
              inputFieldStyles.textInputStyles.description,
              inputFieldStyles.textInputStyles.font,
            ]}
            multiline={true}
            maxLength={250}
          />
        </View>

        {/* Category Picker */}
        <View style={inputFieldStyles.outerContainer}>
          <Text style={H5SmallStyles.textStyle}>Tool Category*</Text>
          <Picker
            style={[
              inputFieldStyles.dropDownStyles.input,
              inputFieldStyles.dropDownStyles.font,
            ]}
            selectedValue={category}
            onValueChange={itemValue => setCategory(itemValue)}>
            {transformedCategoryList.map((_category, index) => (
              <Picker.Item
                key={`${index}-${_category}`}
                label={_category}
                value={_category}
                style={inputFieldStyles.dropDownStyles.font}
              />
            ))}
          </Picker>
        </View>

        {/* Rent/hr */}
        <View style={inputFieldStyles.outerContainer}>
          <Text style={H5SmallStyles.textStyle}>Rent per hour (PKR/hr)*</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <TextInput
              placeholder="0"
              value={rent.toString()}
              onChangeText={text => {
                // Check if the input is a valid number or empty string
                const parsedRent = /^\d+$/.test(text) ? parseInt(text) : '';
                setRent(parsedRent);
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
                rent !== 0 ? setRent(rent - 5) : setRent(0);
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
              onPress={() => setRent(rent + 5)}
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

        {/* Single Address Field */}
        <TouchableOpacity onPress={() => setIsMapVisible(true)}>
          <View style={inputFieldStyles.outerContainer}>
            <Text style={H5SmallStyles.textStyle}>Pickup Address*</Text>
            <TextInput
              placeholderTextColor="grey"
              placeholder="Enter Address to Pickup the Tool."
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

        {/* Description */}
        <View style={inputFieldStyles.outerContainer}>
          <Text style={H5SmallStyles.textStyle}>Description*</Text>
          <TextInput
            placeholderTextColor="grey"
            placeholder="Add Description for The Tool."
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
      </View>

      <View style={registerMoreInfoScreenStyle.buttonsContainer}>
        <LargeBtn text={'Update Tool'} onPress={handleUpdateTool} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: ColorsLight.primaryWhite,
    alignItems: 'center',
    padding: Metrics.baseMargin,
  },
  screenTitle: {
    ...H3MainStyles.textStyle,
    width: Metrics.medium_inputFieldWidth,
    textAlign: 'center',
  },
  formContainer: {
    width: Metrics.medium_inputFieldWidth,
    marginTop: Spacing.large,
    gap: Spacing.large,
  },
  imageContainer: {
    alignItems: 'center',
  },
  imageCircle: {
    width: Metrics.toolImageWidth,
    height: Metrics.toolImageHeight,
    backgroundColor: ColorsLight.grey3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: Metrics.toolImageWidth,
    height: Metrics.toolImageHeight,
  },
  imageText: {
    ...H5SmallStyles.textStyle,
    color: ColorsLight.grey1,
  },
});

export default EditRentingTool;
