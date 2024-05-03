// Service Detail Screen

// React and React Native imports
import React, {useEffect} from 'react';
import {View, Image} from 'react-native';

// Component imports
import H2Large from '../components/atoms/headings/h2_large';
import H3Main from '../components/atoms/headings/h3_main';
import LargeBtn from '../components/atoms/buttons/large_btn';
import TopBackStrip from '../components/molecules/top_back_button_strip';

// Styles and themes
import {ServiceDetails} from '../themes/styles';
import {ColorsLight} from '../themes/colors';

// Redux
import {useSelector} from 'react-redux';

// Async Storage for storing subcategories
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getHandymenSubCategories} from '../api_layer/handymen_apis';

// Component definition
const ServiceDetailScreen = ({route, navigation}) => {
  // Route parameters
  const {service} = route.params;

  // Redux state
  const userInfo = useSelector(state => state.user.userInfo);

  // Effect to fetch subcategories on mount
  useEffect(() => {
    const fetchHandymenSubCategories = async () => {
      try {
        const HandymenSubCategoriesList = await getHandymenSubCategories(
          service.name,
        );
        console.log('HandymenSubCategoriesList:', HandymenSubCategoriesList);

        // Setting categories in Async Storage
        AsyncStorage.setItem(
          'HandymenSubCategoriesList',
          JSON.stringify(HandymenSubCategoriesList),
        );
      } catch (error) {
        // Handle error if necessary
        console.error(
          'Error in fetching HandymenSubCategoriesList:',
          error.message,
        );
      }
    };

    fetchHandymenSubCategories();
  }, []);

  // Rendering UI
  return (
    <View style={ServiceDetails.container}>
      <TopBackStrip navigation={navigation}></TopBackStrip>
      {/* Top back button strip */}
      {/* Service title */}
      <H2Large
        color={ColorsLight.primaryGreen}
        marginLeft={'20%'}
        marginRight={'20%'}>
        {service.name} in Your Area
      </H2Large>
      {/* Service icon */}
      <View style={ServiceDetails.serviceItemImageWrapper}>
        <Image
          // source={require('../assets/icons/plumbing.png')}
          source={service.icon}
          style={ServiceDetails.serviceItemImage}
        />
      </View>
      {/* Service description */}
      <H3Main
        color={ColorsLight.primaryGreen}
        marginLeft={'20%'}
        marginRight={'20%'}>
        Let us get you the best {service.name}
      </H3Main>
      {/* Button for next step */}
      <LargeBtn
        text={'Next >'}
        onPress={
          userInfo.cnic
            ? () => navigation.navigate('TaskDetail', {service: service})
            : () => navigation.navigate('RegisterMoreInfo', {service: service})
        }
      />
    </View>
  );
};

// Exporting the component
export default ServiceDetailScreen;

// import React, {useEffect, useState} from 'react';
// import {View, Image} from 'react-native';
// import H2Large from '../components/atoms/headings/h2_large';
// import H3Main from '../components/atoms/headings/h3_main';
// import {ColorsLight} from '../themes/colors';
// import LargeBtn from '../components/atoms/buttons/large_btn';
// import TopBackStrip from '../components/molecules/top_back_button_strip';
// import {ServiceDetails} from '../themes/styles';
// import {useSelector} from 'react-redux';

// //
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {getHandymenSubCategories} from '../api_layer/handymen_apis';

// const ServiceDetailScreen = ({route, navigation}) => {
//   const {service} = route.params;
//   const userInfo = useSelector(state => state.user.userInfo);

//   useEffect(() => {
//     const fetchHandymenSubCategories = async () => {
//       try {
//         const HandymenSubCategoriesList = await getHandymenSubCategories(
//           service.name,
//         );
//         console.log('HandymenSubCategoriesList:', HandymenSubCategoriesList);

//         // Setting categories in Async Storage
//         AsyncStorage.setItem(
//           'HandymenSubCategoriesList',
//           JSON.stringify(HandymenSubCategoriesList),
//         );
//       } catch (error) {
//         // Handle error if necessary
//         console.error(
//           'Error in fetching HandymenSubCategoriesList:',
//           error.message,
//         );
//       }
//     };

//     fetchHandymenSubCategories();
//   }, []);

//   return (
//     <View style={ServiceDetails.container}>
//       <TopBackStrip navigation={navigation}></TopBackStrip>
//       <H2Large
//         color={ColorsLight.primaryGreen}
//         marginLeft={'20%'}
//         marginRight={'20%'}>
//         {service.name} in Your Area
//       </H2Large>
//       <View style={ServiceDetails.serviceItemImageWrapper}>
//         <Image
//           // source={require('../assets/icons/plumbing.png')}
//           source={service.icon}
//           style={ServiceDetails.serviceItemImage}
//         />
//       </View>
//       <H3Main
//         color={ColorsLight.primaryGreen}
//         marginLeft={'20%'}
//         marginRight={'20%'}>
//         Let us get you the best {service.name}
//       </H3Main>
//       <LargeBtn
//         text={'Next >'}
//         onPress={
//           userInfo.cnic
//             ? () => navigation.navigate('TaskDetail', {service: service})
//             : () => navigation.navigate('RegisterMoreInfo', {service: service})
//         }
//       />
//     </View>
//   );
// };

// export default ServiceDetailScreen;
