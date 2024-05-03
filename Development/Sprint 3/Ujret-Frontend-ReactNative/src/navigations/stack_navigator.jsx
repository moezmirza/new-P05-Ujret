//navigations Your project base navigation goes here. You can create a stack navigator in it and export it to your application.

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/splash_screen';
import OnboardingScreen1 from '../screens/onboarding_screen1';
import OnboardingScreen2 from '../screens/onboarding_screen2';
import OnboardingScreen3 from '../screens/onboarding_screen3';
import RegistrationScreen from '../screens/registration_screen';
import LoginScreen from '../screens/login_screen';
import ProfileScreen from '../screens/dashboard';
import UjretScreen from '../screens/ujret_screen';
import HandymanHomeScreen from '../screens/handymen_home';
import ServiceDetailScreen from '../screens/service_detail_screen';
import EditProfileScreen from '../screens/edit_profile_screen';
import EditProfileDetailsScreen from '../screens/edit_profile_detail_screen';
import UpdatePassword from '../screens/update_password_screen';
import ServiceModeScreen1 from '../screens/service_mode_screen_1';
import ServiceModeScreen2 from '../screens/service_mode_screen_2';
import ServiceProviderInfo from '../screens/service_provider_info_screen';
import RegisterMoreInfoScreen from '../screens/register_moreinfo_screen';
import ServiceProviderPersonalInfo from '../screens/service_provider_personal_info';
import ProfessionalInfo from '../screens/professional_info';
import UpdateProfessionalInfo from '../screens/update_professional_info_screen';
import ServiveProviderThanksScreen from '../screens/service_provider_thanks_screen';
import TasksOffersScreen from '../screens/tasks_offers_screen';
import TaskAcceptScreen from '../screens/task_accept_screen';
import TaskDetailScreen from '../screens/task_detail_screen';
import TaskProviderScreen from '../screens/tasker_all_task_detail';
import TaskResponseScreen from '../screens/tasker_offering_price_screen';
import TaskStatusScreen from '../screens/tasker_task_status_screen';
import UserAddReview from '../screens/UserAddReview';
import TaskerProfileViewScreen from '../screens/tasker_profile_view_screen';
import TaskPaymentScreen from '../screens/task_payment_screen';
import AcceptTaskBidScreen from '../screens/accepted_task_bid_details';

// Renting
import AddRentingToolScreen from '../screens/add_renting_tool';
import ToolCard from '../screens/catalog_search';

// Extra
import Extra from '../screens/extra';

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Extra"
        component={Extra}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Onboarding1"
        component={OnboardingScreen1}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Onboarding2"
        component={OnboardingScreen2}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Onboarding3"
        component={OnboardingScreen3}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="registration"
        component={RegistrationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Ujret"
        component={UjretScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="test"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HandymenHome"
        component={HandymanHomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ServiceDetail"
        component={ServiceDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterMoreInfo"
        component={RegisterMoreInfoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfileDetails"
        component={EditProfileDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ServiceModeScreen1"
        component={ServiceModeScreen1}
        options={{headerShown: true, title: 'Services Mode'}}
      />
      <Stack.Screen
        name="ServiceModeScreen2"
        component={ServiceModeScreen2}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="ServiceProviderInfo"
        component={ServiceProviderInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ServiceProviderPersonalInfo"
        component={ServiceProviderPersonalInfo}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfessionalInfo"
        component={ProfessionalInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UpdateProfessionalInfoScreen"
        component={UpdateProfessionalInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ServiveProviderThanksScreen"
        component={ServiveProviderThanksScreen}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="updatePassword"
        component={UpdatePassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TasksOffersScreen"
        component={TasksOffersScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TaskDetail"
        component={TaskDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TaskProviderTasks"
        component={TaskProviderScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TaskerResponce"
        component={TaskResponseScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TaskStatus"
        component={TaskStatusScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TaskAccept"
        component={TaskAcceptScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserAddReview"
        component={UserAddReview}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TaskerProfileViewScreen"
        component={TaskerProfileViewScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TaskPaymentScreen"
        component={TaskPaymentScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TaskerAllTasks"
        component={TaskProviderScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AcceptTaskBidScreen"
        component={AcceptTaskBidScreen}
        options={{headerShown: false}}
      />
      {/* Renting */}
      <Stack.Screen
        name="AddRentingToolScreen"
        component={AddRentingToolScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllToolCards"
        component={ToolCard}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
