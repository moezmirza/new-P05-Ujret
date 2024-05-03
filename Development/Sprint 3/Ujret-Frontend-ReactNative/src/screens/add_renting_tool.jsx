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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Map imports
import MapView from 'react-native-maps';
Geocoder.init('AIzaSyD3MRohSRm1LLc8XIoqyFDZDdEUFQ4K8n4');
import Geocoder from 'react-native-geocoding';

import {Picker} from '@react-native-picker/picker';

// Styles
import {
  registerMoreInfoScreenStyle,
  inputFieldStyles,
  H5SmallStyles,
  H3MainStyles,
} from '../themes/styles';

// COnstants
import {Strings} from '../stores/constant';
import {ColorsLight} from '../themes/colors';

const AddRentingToolScreen = () => {
  return <Text>Here</Text>;
};

// const AddRentingToolScreen = () => {
//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState('');
//   const [rentPerDay, setRentPerDay] = useState('');
//   const [address, setAddress] = useState('');
//   const [description, setDescription] = useState('');

//   const handleAddTool = () => {
//     // Validation
//     if (!title || !category || !rentPerDay || !address || !description) {
//       Alert.alert('Error', 'Please fill in all fields.');
//       return;
//     }
//     // Add tool logic here
//     console.log('Tool added successfully!');
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Modal
//         animationType="slide"
//         transparent={false}
//         visible={isMapVisible}
//         onRequestClose={() => setIsMapVisible(false)}>
//         <View style={{flex: 1}}>
//           <MapView
//             style={{flex: 1}}
//             initialRegion={{
//               latitude: 31.5497,
//               longitude: 74.3436,
//               latitudeDelta: 0.0922,
//               longitudeDelta: 0.0421,
//             }}
//             // Add onPress or onLongPress depending on how you want to capture the location
//             onPress={e => {
//               const coords = e.nativeEvent.coordinate;
//               Geocoder.from(coords.latitude, coords.longitude)
//                 .then(json => {
//                   const addressComponent = json.results[0].formatted_address;
//                   setAddress(addressComponent);
//                 })
//                 .catch(error => console.warn(error));
//               setIsMapVisible(false);
//             }}
//           />
//           {/* Add a button to close the modal */}
//           <TouchableOpacity onPress={() => setIsMapVisible(false)}>
//             <Text>Close Map</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>

//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={category}
//           onValueChange={itemValue => setCategory(itemValue)}
//           style={styles.picker}>
//           <Picker.Item label="Select Category" value="" />
//           <Picker.Item label="Category 1" value="category1" />
//           <Picker.Item label="Category 2" value="category2" />
//           {/* Add more categories as needed */}
//         </Picker>
//       </View>

//       {/* Form inputs */}
//       <View style={registerMoreInfoScreenStyle.formContainer}>
//         {/* Full Name */}
//         <View style={inputFieldStyles.outerContainer}>
//           <Text style={H5SmallStyles.textStyle}>Title</Text>
//           <TextInput
//             placeholderTextColor="grey"
//             placeholder="Title"
//             value={title}
//             onChangeText={setTitle}
//             style={[
//               inputFieldStyles.textInputStyles.input,
//               inputFieldStyles.textInputStyles.font,
//             ]}
//           />
//         </View>

//         {/* Gender */}
//         <View style={inputFieldStyles.outerContainer}>
//           <Text style={H5SmallStyles.textStyle}>Category</Text>
//           <Picker
//             style={[
//               inputFieldStyles.dropDownStyles.input,
//               inputFieldStyles.dropDownStyles.font,
//             ]}
//             selectedValue={category}
//             onValueChange={itemValue => setCategory(itemValue)}>
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

//         {/* Budget Input */}
//         <View style={inputFieldStyles.outerContainer}>
//           <Text style={H5SmallStyles.textStyle}>Your Tool Rent per Day*</Text>
//           <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
//             <TextInput
//               placeholder="0"
//               value={rentPerDay.toString()}
//               onChangeText={text => {
//                 // Check if the input is a valid number or empty string
//                 const parsedBudget = /^\d+$/.test(text) ? parseInt(text) : '';
//                 setRentPerDay(parsedBudget);
//               }}
//               keyboardType="numeric"
//               style={{
//                 ...inputFieldStyles.textInputStyles.input,
//                 ...inputFieldStyles.textInputStyles.font,
//                 width: '66%',
//               }}
//             />
//             <TouchableOpacity
//               onPress={() => {
//                 rentPerDay !== 0 ? setRentPerDay(budget - 5) : setRentPerDay(0);
//               }}
//               style={{
//                 height: 40,
//                 width: '15%',
//                 alignContent: 'center',
//                 justifyContent: 'center',
//               }}>
//               <Text
//                 style={{...H3MainStyles.textStyle, marginHorizontal: 'auto'}}>
//                 -
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => setRentPerDay(budget + 5)}
//               style={{
//                 height: 40,
//                 width: '15%',
//                 alignContent: 'center',
//                 justifyContent: 'center',
//               }}>
//               <Text
//                 style={{...H3MainStyles.textStyle, marginHorizontal: 'auto'}}>
//                 +
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         {/* Address */}

//         {/* Single Address Field */}
//         <TouchableOpacity onPress={() => setIsMapVisible(true)}>
//           <View style={inputFieldStyles.outerContainer}>
//             <Text style={H5SmallStyles.textStyle}>Address*</Text>
//             <TextInput
//               placeholderTextColor="grey"
//               placeholder="Enter Your Address."
//               value={address}
//               onChangeText={setAddress}
//               style={[
//                 inputFieldStyles.textInputStyles.description,
//                 inputFieldStyles.textInputStyles.font,
//               ]}
//               multiline={true}
//               maxLength={250}
//             />
//             <Icon
//               name="location-pin"
//               type="font-awesome"
//               size={30}
//               color="#000"
//               onPress={() => setIsMapVisible(true)}
//             />
//           </View>
//         </TouchableOpacity>

//         {/* Description */}
//       </View>
//       <TouchableOpacity style={styles.addButton} onPress={handleAddTool}>
//         <Text style={styles.addButtonLabel}>Add Tool</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignHorizontal: 'center',
    backgroundColor: ColorsLight.primaryWhite,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  descriptionInput: {
    height: 100,
  },
  addButton: {
    backgroundColor: 'green', // Example color
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 18,
  },
});

export default AddRentingToolScreen;
