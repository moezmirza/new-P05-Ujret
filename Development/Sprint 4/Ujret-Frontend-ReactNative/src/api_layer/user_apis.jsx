// This file contains logic, related to external API communications for user profile handling.

// export const BASE_URL = 'https://ba96-58-27-202-36.ngrok-free.app/api/v1';
// export const BASE_URL = 'https://ujret-python-api.onrender.com/api/v1';
export const BASE_URL = 'https://ujret-backend-node.onrender.com/api/v1';

// response Handler Function
export const handleResponse = async response => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
  return await response.json();
};

// Create User Function
const createUser = async (phoneNumber, email, password) => {
  try {
    console.log('API file: create user called ...\n', {
      phoneNumber,
      email,
      password,
    });
    const apiResponse = await fetch(`${BASE_URL}/create-user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        email: email,
        password: password,
      }),
    });
    const response = await handleResponse(apiResponse);
    console.log('API file: createUser response:', response);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get User Details Function
const getUserDetails = async userId => {
  try {
    const apiResponse = await fetch(`${BASE_URL}/get-user?uid=${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const response = await handleResponse(apiResponse);
    return response;
  } catch (error) {
    // console.error('Error in getUserDetails:', error);
    throw error;
  }
};

// Update User Details Function
const updateUserDetails = async updatedData => {
  const {userId, firstName, lastName, gender, cnic, phoneNumber, email} =
    updatedData;

  console.log(
    'API file: ',
    userId,
    firstName,
    lastName,
    cnic,
    gender,
    phoneNumber,
    email,
  );

  try {
    const apiResponse = await fetch(`${BASE_URL}/update-user`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: userId,
        user_info: {
          first_name: firstName,
          last_name: lastName,
          cnic: cnic,
          gender: gender.toUpperCase(),
        },
      }),
    });
    const response = await handleResponse(apiResponse);
    return response;
  } catch (error) {
    throw error;
  }
};

const updatePassword = async (password, newPassword, userId) => {
  try {
    const response = await fetch(`${BASE_URL}/update-password`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        newPassword: newPassword,
        userId: userId,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error;
  }
};

const deleteUser = async (userId, userEmail) => {
  try {
    const response = await fetch(`${BASE_URL}/delete-user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        userEmail: userEmail,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error;
  }
};

export const fetchAvailableTasks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API file: Error in fetchAvailableTasks:', error.message);
    throw error;
  }
};

export {
  createUser,
  getUserDetails,
  updateUserDetails,
  updatePassword,
  deleteUser,
};
