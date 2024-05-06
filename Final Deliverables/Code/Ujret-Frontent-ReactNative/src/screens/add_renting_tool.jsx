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
// import ImagePicker from 'react-native-image-crop-picker'; // Image picker library DOnt renove

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
import {CategoryList, createTool} from '../api_layer/renting_api';

// Utils
import {catListChangeToSmallCase} from '../utils/utilities';

// Conponent definition
const AddRentingToolScreen = ({navigation}) => {
  // Category list conversion
  const transformedCategoryList = catListChangeToSmallCase(CategoryList);

  // Fetching userInfo froj redux
  const userInfo = useSelector(state => state.user.userInfo);

  // State variables
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [rent, setRent] = useState(0);
  const [category, setCategory] = useState(transformedCategoryList[15]);
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  // const [image, setImage] = useState(null); // State to store selected image
  // const [imageUrl, setImageUrl] = useState(null); // State to store image URL

  // Handle Add Tool
  const handleAddTool = async () => {
    if (!title || !rent || !category || !address || !description) {
      Alert.alert('Info', 'Please fill all the fields');
      return;
    } else {
      try {
        const response = await createTool(
          userInfo.uid,
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

  // // Function to handle image upload
  // const handleImageUpload = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 300,
  //     cropping: true,
  //   })
  //     .then(image => {
  //       // Set the selected image to the state
  //       setImage(image.path);
  //     })
  //     .catch(error => {
  //       console.log('Image picker error:', error);
  //     });
  // };
  // // Function to handle image upload
  // const handleImageUpload = () => {
  //   ImagePicker.openPicker({
  //     width: Metrics.toolImageWidth,
  //     height: Metrics.toolImageHeight,
  //     cropping: true,
  //   })
  //     .then(image => {
  //       // Set the selected image to the state
  //       setImage(image.path);

  //       // Upload image to Cloudinary
  //       const data = new FormData();
  //       data.append('file', {
  //         uri: image.path,
  //         type: image.mime,
  //         name: image.filename,
  //       });
  //       data.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary upload preset
  //       data.append('cloud_name', 'dzwghhekh'); // Replace with your Cloudinary cloud name

  //       fetch('https://api.cloudinary.com/v1_1/dzwghhekh/image/upload', {
  //         method: 'POST',
  //         body: data,
  //       })
  //         .then(response => response.json())
  //         .then(uploadResponse => {
  //           setImageUrl(uploadResponse.secure_url); // Save the image URL
  //         })
  //         .catch(error => {
  //           console.log('Cloudinary upload error:', error);
  //         });
  //     })
  //     .catch(error => {
  //       console.log('Image picker error:', error);
  //     });
  // };

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
      <Text style={styles.screenTitle}>Add Tool for Renting</Text>

      <View style={styles.formContainer}>
        {/* Image upload circle */}
        {/* <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handleImageUpload}>
            <View style={styles.imageCircle}>
              {image ? (
                <Image source={{uri: image}} style={styles.imagePreview} />
              ) : (
                <Text style={styles.imageText}>Upload Image For Tool</Text>
              )}
            </View>
          </TouchableOpacity>
        </View> */}

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
        <LargeBtn text={'Add Tool'} onPress={handleAddTool} />
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

export default AddRentingToolScreen;
