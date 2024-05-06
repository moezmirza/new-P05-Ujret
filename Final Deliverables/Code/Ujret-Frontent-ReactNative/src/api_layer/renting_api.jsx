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

// Add a new tool
const createTool = async (uid, title, category, rent, address, description) => {
  const toolData = {
    renter_id: uid,
    title: title,
    category: category.toUpperCase().replace(/ /g, '_'), //"WATER_LINE_REPAIR,DRAIN_CLEANING",
    rent: rent,
    address: address,
    description: description,
    imgURLs: '',
  };
  console.log('Create Tool in Api:\n', toolData);
  try {
    const apiResponse = await fetch(`${BASE_URL}/renting/create-tool`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toolData),
    });
    const response = await handleResponse(apiResponse);
    return response;
  } catch (error) {
    // console.error('API file: Error in addTool:', error.message);
    throw error;
  }
};

// Update tool
const updateTool = async (
  id,
  available,
  title,
  category,
  rent,
  address,
  description,
) => {
  const toolData = {
    tool_id: id,
    tool_info: {
      status: available.toUpperCase().replace(/ /g, '_'),
      title: title,
      category: category.toUpperCase().replace(/ /g, '_'), //"WATER_LINE_REPAIR,DRAIN_CLEANING",
      rent: rent,
      address: address,
      description: description,
    },
  };
  console.log('Update Tool in Api:\n', toolData);
  try {
    const apiResponse = await fetch(`${BASE_URL}/renting/update-tool`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toolData),
    });
    const response = await handleResponse(apiResponse);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get All tools except the user's own tools
const fetchAllTools = async userId => {
  try {
    const apiResponse = await fetch(
      `${BASE_URL}/renting/all-tools?renter_id=${userId}`,
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
    // console.error('API file: Error in fetchAllTools:', error.message);
    throw error;
  }
};

// Get All tools of the user
const fetchMyTools = async userId => {
  try {
    const apiResponse = await fetch(
      `${BASE_URL}/renting/renter-tools?renter_id=${userId}`,
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
    // console.error('API file: Error in fetchAllTools:', error.message);
    throw error;
  }
};

export {createTool, updateTool, fetchAllTools, fetchMyTools};
