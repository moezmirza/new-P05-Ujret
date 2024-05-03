import {BASE_URL, handleResponse} from './user_apis';

//
export const CategoryList = [
  'POWER_TOOLS',
  'HAND_TOOLS',
  'GARDENING',
  'CONSTRUCTION',
  'AUTOMOTIVE',
  'PAINTING',
  'ELECTRICAL',
  'PLUMBING',
  'WOODWORKING',
  'METALWORKING',
  'CLEANING',
  'DECORATING',
  'ELECTRONIC',
  'MEASUREMENT',
  'SAFETY_EQUIPMENT',
  'OTHER',
];

// get tool data api
const fetchAvailableTools = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tools`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('API file: Error in fetchAvailableTools:', error.message);
    throw error;
  }
};

export {fetchAvailableTools};
