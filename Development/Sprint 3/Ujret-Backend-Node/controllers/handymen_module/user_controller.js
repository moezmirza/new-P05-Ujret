import User from '../../models/userModel.js';
import Task from '../../models/handymen_module/taskModel.js';
import firebaseAdmin from 'firebase-admin'; // Import Firebase Admin SDK
import { generateUuidFromFirebaseUid } from '../utilities.js';

// Initialize Firebase Admin SDK using credentials from firebase_creds.json
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  }),
});

const createUserHandler = async (request, reply) => {
  console.log('Request body:', request.body);
  try {
    // Extract data from request body
    const { phone_number, email, password } = request.body;

    // Create user in Firebase
    let firebaseUser;
    try {
      firebaseUser = await firebaseAdmin.auth().createUser({
        phoneNumber: phone_number,
        email: email,
        password: password,
      });
    } catch (error) {
      console.error('Error creating user in Firebase:', error);
      // Throw the specific error message returned by Firebase
      throw new Error(error.message);
    }

    // If user creation in Firebase is successful, proceed to create user in MongoDB
    if (firebaseUser) {
      // Create a new user document in MongoDB
      const newUser = new User({
        id: generateUuidFromFirebaseUid(firebaseUser.uid), // Use Firebase UID as ID in MongoDB
        phoneNumber: phone_number,
        email: email,
      });

      // Save the user document to the database
      const savedUser = await newUser.save();

      // Respond with the saved user document
      reply.code(201).send({
        data: savedUser.id,
        event_code: '1',
        message: 'User created successfully',
        status_code: 201,
      });
    } else {
      // If user creation in Firebase fails, handle the error
      throw new Error('User creation in Firebase failed');
    }
  } catch (error) {
    // Handle errors
    console.error('Error creating user:', error);
    reply.code(500).send({
      event_code: '2',
      message: error.message || 'Internal server error',
      status_code: 400,
    });
  }
};

// Handler for getting user information
const getUserHandler = async (request, reply) => {
  try {
    const { uid } = request.query;

    // Find user by UID in MongoDB
    const user = await User.findOne({ id: uid });

    if (user) {
      reply.code(201).send({
        data: {
          first_name: user.firstName,
          last_name: user.lastName,
          id: user.id,
          _id: user._id,
          gender: user.gender,
          cnic: user.cnic,
          phone_number: user.phoneNumber,
          email: user.email,
          services: user.services,
          otp: user.otp,
          phone_number_verified: user.phoneNumberVerified,
          createdAt: user.createdAt,
          __v: user.__v,
        },
        event_code: '1',
        message: 'User returned successfully',
        status_code: 201,
      });
    } else {
      reply.code(404).send({
        data: null,
        event_code: '0',
        message: 'User not found',
        status_code: 404,
      });
    }
  } catch (error) {
    console.error('Error getting user:', error);
    reply.code(500).send({
      event_code: '2',
      message: error.message || 'Internal server error',
      status_code: 500,
    });
  }
};

// Handler for updating user information
const updateUserHandler = async (request, reply) => {
  try {
    const { uid, user_info } = request.body;

    // Map the incoming user_info object keys to match the schema in the backend
    const updatedFields = {};
    for (const key in user_info) {
      switch (key) {
        case 'first_name':
          updatedFields.firstName = user_info[key];
          break;
        case 'last_name':
          updatedFields.lastName = user_info[key];
          break;
        case 'cnic':
          updatedFields.cnic = user_info[key];
          break;
        case 'phone_number':
          updatedFields.phoneNumber = user_info[key];
          break;
        case 'email':
          updatedFields.email = user_info[key];
          break;
        case 'gender':
          updatedFields.gender = user_info[key];
          break;
        case 'services':
          updatedFields.services = user_info[key];
          break;
        // Add more cases for other fields if needed
        default:
          // Ignore any other keys
          break;
      }
    }

    // Find user by UID and update the fields in MongoDB
    const updatedUser = await User.findOneAndUpdate(
      { id: uid },
      { $set: updatedFields },
      { new: true }
    );

    if (updatedUser) {
      // If user is successfully updated, send success response
      reply.code(201).send({
        data: null,
        event_code: '1',
        message: 'User updated successfully',
        status_code: 201,
      });
    } else {
      // If user with the provided UID is not found, send not found response
      reply.code(404).send({
        data: null,
        event_code: '0',
        message: 'User not found',
        status_code: 404,
      });
    }
  } catch (error) {
    // If any error occurs during the update process, send internal server error response
    console.error('Error updating user:', error);
    reply.code(500).send({
      event_code: '2',
      message: error.message || 'Internal server error',
      status_code: 500,
    });
  }
};

const getUserCompletedTasks = async (request, reply) => {
  try {
    const { user_id } = request.query;

    // Use aggregation to find completed tasks associated with the user
    const completedTasks = await Task.aggregate([
      // Match tasks that are completed and associated with the specified user
      {
        $match: {
          userId: user_id,
          taskStatus: 'COMPLETED', // assuming 'Completed' is the status for completed tasks
        },
      },
      // Lookup handyman information for the task
      {
        $lookup: {
          from: 'handymen', // Use the name of the Handyman collection
          localField: 'handymanId',
          foreignField: 'id',
          as: 'handyman',
        },
      },
      // Unwind the handyman array to get individual handyman documents
      { $unwind: { path: '$handyman', preserveNullAndEmptyArrays: true } },
      // Project fields to include in the result
      {
        $project: {
          _id: 0, // Exclude the MongoDB _id field
          task_id: '$id',
          handyman_id: '$handyman.id',
          category: 1,
          sub_categories: '$subCategories',
          description: 1,
          address: 1,
          budget: 1,
          price: 1,
          duration: 1,
          scheduledDate: 1,
          scheduledTime: 1,
          createdAt: 1,
          taskStatus: 1,
          handyman_name: {
            $concat: [
              { $ifNull: ['$handyman.firstName', ''] },
              ' ',
              { $ifNull: ['$handyman.lastName', ''] },
            ],
          },
          handyman_number: '$handyman.phoneNumber',
        },
      },
    ]);

    // If completed tasks are found, send them in the response
    if (completedTasks.length > 0) {
      reply.code(200).send({
        data: completedTasks,
        event_code: '1',
        message: 'Completed tasks returned successfully',
        status_code: 200,
      });
    } else {
      // If no completed tasks are found, send a message indicating no tasks found
      reply.code(404).send({
        data: [],
        event_code: '0',
        message: 'No completed tasks found',
        status_code: 404,
      });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error fetching completed tasks:', error);
    reply.code(500).send({
      event_code: '2',
      message: error.message || 'Internal server error',
      status_code: 500,
    });
  }
};

// Fetch all tasks associated with a user
const getUserAllTasks = async (request, reply) => {
  try {
    const { user_id } = request.query;

    // Use aggregation to find completed tasks associated with the user
    const completedTasks = await Task.aggregate([
      // Match tasks that are completed and associated with the specified user
      {
        $match: {
          userId: user_id,
        },
      },
      // Lookup handyman information for the task
      {
        $lookup: {
          from: 'handymen', // Use the name of the Handyman collection
          localField: 'handymanId',
          foreignField: 'id',
          as: 'handyman',
        },
      },
      // Unwind the handyman array to get individual handyman documents
      { $unwind: { path: '$handyman', preserveNullAndEmptyArrays: true } },
      // Project fields to include in the result
      {
        $project: {
          _id: 0, // Exclude the MongoDB _id field
          task_id: '$id',
          handyman_id: '$handyman.id',
          category: 1,
          sub_categories: '$subCategories',
          description: 1,
          address: 1,
          budget: 1,
          price: 1,
          duration: 1,
          scheduledDate: 1,
          scheduledTime: 1,
          createdAt: 1,
          taskStatus: 1,
          handyman_name: {
            $concat: [
              { $ifNull: ['$handyman.firstName', ''] },
              ' ',
              { $ifNull: ['$handyman.lastName', ''] },
            ],
          },
          handyman_number: '$handyman.phoneNumber',
        },
      },
    ]);

    // If completed tasks are found, send them in the response
    if (completedTasks.length > 0) {
      reply.code(200).send({
        data: completedTasks,
        event_code: '1',
        message: 'User All tasks returned successfully',
        status_code: 200,
      });
    } else {
      // If no completed tasks are found, send a message indicating no tasks found
      reply.code(404).send({
        data: [],
        event_code: '0',
        message: 'No tasks found',
        status_code: 404,
      });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error fetching completed tasks:', error);
    reply.code(500).send({
      event_code: '2',
      message: error.message || 'Internal server error',
      status_code: 500,
    });
  }
};

// Export the route handler function
export {
  createUserHandler,
  getUserHandler,
  updateUserHandler,
  getUserCompletedTasks,
  getUserAllTasks,
};
