// React and React Native imports
import React, {useState} from 'react';
import {
  View,
  FlatList,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements'; // Import Icon from react-native-elements

// Component imports
import ServiceItem from '../components/molecules/ServiceItem';
import SearchContainer from '../components/molecules/SearchContainer';
import TopBackStrip from '../components/molecules/top_back_button_strip';

// Styles
import {
  HandymanHome,
  H4SubMainStyles,
  H3MainStyles,
  H5SmallStyles,
} from '../themes/styles';

// Theme colors and styles
import {Spacing, Metrics} from '../themes/metrics';

// Redux
import {useSelector} from 'react-redux';
import {selectHandymenCategories} from '../stores/handymen_categories_slice';
import {ColorsLight} from '../themes/colors';

// Component definition
const HandymanHomeScreen = ({navigation}) => {
  // Redux state
  const userInfo = useSelector(state => state.user.userInfo);
  const username = userInfo.firstName;

  // Handymen categories from Redux
  const categoriesList = useSelector(selectHandymenCategories);
  // console.log(categoriesList);

  // State for search text
  const [searchText, setSearchText] = useState('');

  // Filtering services based on search text
  let filteredServices = categoriesList;
  if (searchText) {
    filteredServices = categoriesList.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  }

  // Select the first 7 and the last service
  const selectedServices = categoriesList
    .slice(0, 7)
    .concat(categoriesList.slice(-1));

  // Rendering UI
  return (
    <ScrollView style={HandymanHome.scrollViewStyles}>
      <View style={HandymanHome.shadowContainer}>
        <View style={{marginBottom: 20}}>
          <TopBackStrip navigation={navigation} lastScreen={'Ujret'} />
          <Text style={{...H3MainStyles.textStyle, marginTop: -Spacing.small}}>
            Handyman Home
          </Text>
        </View>
        {/* Search bar */}
        <SearchContainer
          username={username}
          setSearchText={setSearchText}
          searchText={searchText}
        />
        {/* FlatList of services */}
        {/* <FlatList
          data={selectedServices}
          renderItem={({item}) => <ServiceItem item={item} />}
          keyExtractor={item => (item ? item.id.toString() : '')}
          numColumns={4}
          contentContainerStyle={HandymanHome.serviceListContainer}
        /> */}
        <View style={styles.serviceContainer}>
          {selectedServices.map((item, index) => {
            return <ServiceItem key={index} item={item} />;
          })}
        </View>
      </View>
      <Text
        style={{
          ...H5SmallStyles.textStyle,
          color: ColorsLight.grey2,
          marginVertical: 20,
          paddingHorizontal: 10,
        }}>
        Get Services in the Following Categories
      </Text>
      <View style={styles.boxCon}>
        {categoriesList
          .slice(7, categoriesList.length - 1)
          .map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.listItem}
                onPress={() => {
                  navigation.navigate('ServiceDetail', {service: item});
                }}>
                <Text style={styles.listItemText}>{item.name}</Text>
                <Icon
                  name="chevron-right"
                  type="font-awesome-5"
                  color={styles.listItemText.color}
                  size={styles.listItemText.fontSize}
                />
              </TouchableOpacity>
            );
          })}
      </View>
    </ScrollView>
  );
};

// create stylesheet
const styles = StyleSheet.create({
  serviceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  boxCon: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    gap: 15,
  },
  listItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: ColorsLight.green6,
    borderWidth: 1,
    borderRadius: 12,
  },
  listItemText: {
    ...H4SubMainStyles.textStyle,
    color: ColorsLight.green6,
  },
});

// Exporting the component
export default HandymanHomeScreen;

// import React, {useState} from 'react';
// import {View, FlatList} from 'react-native';
// import ServiceItem from '../components/molecules/ServiceItem';
// import {HandymanHome} from '../themes/styles';
// import SearchContainer from '../components/molecules/SearchContainer';

// // Redux
// import {useSelector} from 'react-redux';
// import {selectHandymenCategories} from '../stores/handymen_categories_slice';

// // // Importing icons
// // import PlumberIcon from '../assets/icons/Plumber_icon.png';
// // import ElectricianIcon from '../assets/icons/Electrician_icon.png';
// // import CarpenterIcon from '../assets/icons/Carpenter_icon.png';
// // import PainterIcon from '../assets/icons/Painter_icon.png';
// // import TailorIcon from '../assets/icons/Tailor_icon.png';
// // import ShiftingIcon from '../assets/icons/Shifting_icon.png';
// // import CookIcon from '../assets/icons/Cook_icon.png';
// // import MasonIcon from '../assets/icons/More_icon.png';
// // import HvacIcon from '../assets/icons/More_icon.png';
// // import VehicleMechanicIcon from '../assets/icons/More_icon.png';
// // import VehicleElectricianIcon from '../assets/icons/More_icon.png';
// // import HouseHelpIcon from '../assets/icons/More_icon.png';
// // import CarWasherIcon from '../assets/icons/More_icon.png';
// // import DriversIcon from '../assets/icons/More_icon.png';
// // import BabysittersIcon from '../assets/icons/More_icon.png';
// // import DoctorsIcon from '../assets/icons/More_icon.png';
// // import RealEstateAgentsIcon from '../assets/icons/More_icon.png';
// // import MoreIcon from '../assets/icons/More_icon.png';

// // const services = [
// //   {id: 1, name: 'Plumber', icon: PlumberIcon},
// //   {id: 2, name: 'Electrician', icon: ElectricianIcon},
// //   {id: 3, name: 'Carpenter', icon: CarpenterIcon},
// //   {id: 4, name: 'Painter', icon: PainterIcon},
// //   {id: 5, name: 'Tailor', icon: TailorIcon},
// //   {id: 6, name: 'Shifting', icon: ShiftingIcon},
// //   {id: 7, name: 'Cook', icon: CookIcon},
// //   {id: 8, name: 'Mason', icon: MasonIcon},
// //   {id: 9, name: 'Hvac', icon: HvacIcon},
// //   {id: 10, name: 'Vehicle mechanic', icon: VehicleMechanicIcon},
// //   {id: 11, name: 'Vehicle electrician', icon: VehicleElectricianIcon},
// //   {id: 12, name: 'House help', icon: HouseHelpIcon},
// //   {id: 13, name: 'Car washer', icon: CarWasherIcon},
// //   {id: 14, name: 'Drivers', icon: DriversIcon},
// //   {id: 15, name: 'Babysitters', icon: BabysittersIcon},
// //   {id: 16, name: 'Doctors', icon: DoctorsIcon},
// //   {id: 17, name: 'Real estate agents', icon: RealEstateAgentsIcon},
// //   {id: 18, name: 'More', icon: MoreIcon},
// // ];

// const HandymanHomeScreen = () => {
//   const userInfo = useSelector(state => state.user.userInfo);
//   const username = userInfo.firstName;

//   const categoriesList = useSelector(selectHandymenCategories);
//   console.log(categoriesList);

//   // Select the first 7 and the last service
//   const selectedServices = categoriesList
//     .slice(0, 7)
//     .concat(categoriesList.slice(-1));

//   const [searchText, setSearchText] = useState('');

//   let filteredServices = categoriesList;
//   if (searchText) {
//     filteredServices = categoriesList.filter(item =>
//       item.name.toLowerCase().includes(searchText.toLowerCase()),
//     );
//   }

//   return (
//     <View style={HandymanHome.shadowContainer}>
//       <SearchContainer
//         username={username}
//         setSearchText={setSearchText}
//         searchText={searchText}
//       />
//       <FlatList
//         data={selectedServices}
//         renderItem={({item}) => <ServiceItem item={item} />}
//         keyExtractor={item => (item ? item.id.toString() : '')}
//         numColumns={4}
//         contentContainerStyle={HandymanHome.serviceListContainer}
//       />
//     </View>
//   );
// };

// export default HandymanHomeScreen;
