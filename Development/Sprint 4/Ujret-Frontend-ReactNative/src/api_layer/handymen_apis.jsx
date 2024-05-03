// This file contains logic, related to external API communications for handymen module
// Importing icons
import PlumberIcon from '../assets/icons/Plumber_icon.png';
import ElectricianIcon from '../assets/icons/Electrician_icon.png';
import CarpenterIcon from '../assets/icons/Carpenter_icon.png';
import PainterIcon from '../assets/icons/Painter_icon.png';
import TailorIcon from '../assets/icons/Tailor_icon.png';
import ShiftingIcon from '../assets/icons/Shifting_icon.png';
import CookIcon from '../assets/icons/Cook_icon.png';
import MasonIcon from '../assets/icons/More_icon.png';
import HvacIcon from '../assets/icons/More_icon.png';
import VehicleMechanicIcon from '../assets/icons/More_icon.png';
import VehicleElectricianIcon from '../assets/icons/More_icon.png';
import HouseHelpIcon from '../assets/icons/More_icon.png';
import CarWasherIcon from '../assets/icons/More_icon.png';
import DriversIcon from '../assets/icons/More_icon.png';
import BabysittersIcon from '../assets/icons/More_icon.png';
import DoctorsIcon from '../assets/icons/More_icon.png';
import RealEstateAgentsIcon from '../assets/icons/More_icon.png';
import MoreIcon from '../assets/icons/More_icon.png';

const iconMapping = {
  Plumber: PlumberIcon,
  Electrician: ElectricianIcon,
  Carpenter: CarpenterIcon,
  Painter: PainterIcon,
  Tailor: TailorIcon,
  Shifting: ShiftingIcon,
  Cook: CookIcon,
  Mason: MasonIcon,
  Hvac: HvacIcon,
  Vehicle_mechanic: VehicleMechanicIcon,
  Vehicle_electrician: VehicleElectricianIcon,
  House_help: HouseHelpIcon,
  Car_washer: CarWasherIcon,
  Drivers: DriversIcon,
  Babysitters: BabysittersIcon,
  Doctors: DoctorsIcon,
  Real_estate_agents: RealEstateAgentsIcon,
  More: MoreIcon,
};
const getIcon = serviceName => {
  return iconMapping[serviceName] || MoreIcon; // Default to MoreIcon if no match found
};
export {getIcon};

// Base URL // alter will be replaced with env var
import {BASE_URL, handleResponse} from './user_apis';

//  get task categories from backend in which handyman can work
const getHandymenCategories = async () => {
  try {
    // console.log('API FILE: getHandymenCategories called ...\n');
    const apiResponse = await fetch(`${BASE_URL}/get-task-categories`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const response = await handleResponse(apiResponse);
    console.log(
      'API FILE: getHandymenCategories response ...\n',
      response.data,
    );
    const transformedList = response.data.map((service, index) => {
      const serviceNameVar =
        service.name.charAt(0).toUpperCase() +
        service.name.toLowerCase().slice(1); // Capitalize first letter of each word
      const serviceName = serviceNameVar.replace(/_/g, ' '); // Replace "_" with single space // serviceName in the case sensitive format e.g, Plumber
      return {
        id: index + 1,
        name: serviceName,
        // icon: `https://example.com/icon${index + 1}.png`,
        // icon: `../../assets/icons/${serviceNameVar}_icon.png`,
        icon: getIcon(serviceNameVar),
      };
    });
    // Add a "More" item at the end
    transformedList.push({
      id: transformedList.length + 1,
      name: 'More',
      // icon: '../../assets/icons/More_icon.png',
      icon: MoreIcon,
    });

    return transformedList;
  } catch (error) {
    throw error;
  }
};

// get subcategories of a specific category
const getHandymenSubCategories = async categoryName => {
  try {
    const response = await fetch(
      `${BASE_URL}/get-handyman-subcategories?sub_cat=${categoryName.toLowerCase()}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const res = await response.json();
    const list = res.data.map((item, index) => {
      const formattedName = item.name
        .replace(/_/g, ' ')
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return {id: index + 1, name: formattedName};
    });
    return list;
  } catch (error) {
    console.error('Error in getHandymenSubCategories:', error.message);
    throw error;
  }
};

const createHandyman = async (
  userId,
  categories,
  experience,
  about,
  address,
) => {
  // Create a new handyman
  console.log('Creating a new handyman: ', {
    userId,
    category_list: categories.map(category =>
      category.toUpperCase().replace(/ /g, '_'),
    ),
    experience,
    about,
    address,
  });
  try {
    const apiResponse = await fetch(`${BASE_URL}/create-handyman`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: userId,
        category_list: categories.map(category =>
          category.toUpperCase().replace(/ /g, '_'),
        ),
        experience: experience,
        about: about,
        address: address,
      }),
    });
    const response = await handleResponse(apiResponse);
    return response;
  } catch (error) {
    throw error;
  }
};

// get handyman details
const getHandyman = async handymanId => {
  try {
    const apiResponse = await fetch(
      `${BASE_URL}/get-handyman?handyman_id=${handymanId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const response = await handleResponse(apiResponse);
    return response;
  } catch (error) {
    throw error;
  }
};

// get handyman details
const getHandymanByUid = async userId => {
  try {
    const apiResponse = await fetch(
      `${BASE_URL}/get-handyman-by-user-id?user_id=${userId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const response = await handleResponse(apiResponse);
    return response;
  } catch (error) {
    throw error;
  }
};

// Update Handyman
const updateHandyman = async (
  handymanId,
  updatedCatgeories,
  experience,
  about,
  address,
) => {
  try {
    const response = await fetch(`${BASE_URL}/update-handyman`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        handyman_id: handymanId,
        handyman_info: {
          category_list: updatedCatgeories.map(category =>
            category.toUpperCase().replace(/ /g, '_'),
          ),
          experience: experience,
          about: about,
          address: address,
        },
      }),
    });

    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

// {{URL}}/get-handyman-complete-profile?handyman_id=771fe198-8e6b-4413-b4a0-4cc2795cc4f4
const getHandymanCompleteProfile = async handymanId => {
  try {
    const response = await fetch(
      `${BASE_URL}/get-handyman-complete-profile?handyman_id=${handymanId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

// Exporting functions
export {
  getHandymenCategories,
  getHandymenSubCategories,
  createHandyman,
  getHandyman,
  getHandymanByUid,
  updateHandyman,
  getHandymanCompleteProfile,
};
