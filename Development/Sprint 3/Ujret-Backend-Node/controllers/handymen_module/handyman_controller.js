// handyman_routes added here
import Category from '../../models/handymen_module/categoryModel.js';
import Handyman from '../../models/handymen_module/handymanModel.js';
import Task from '../../models/handymen_module/taskModel.js';
import { generateUuid } from '../utilities.js';

const getTaskCategories = async (request, reply) => {
  try {
    const categories = await Category.find().select('name -_id');
    reply.code(201).send({
      data: categories,
      event_code: '1',
      message: 'All categories returned successfully',
      status_code: 201,
    });
  } catch (error) {
    console.error('Error getting task categories:', error);
    reply.code(500).send({
      event_code: '2',
      message: error.message || 'Internal server error',
      status_code: 500,
    });
  }
};

const getTaskSubCategories = async (request, reply) => {
  try {
    let { sub_cat } = request.query;
    sub_cat = sub_cat.toUpperCase();
    const raw_subCategories = await Category.findOne({ name: sub_cat }).select(
      'subCategories -_id'
    );
    const subCategories = raw_subCategories.subCategories.map(
      (subCategory) => ({ name: subCategory })
    );
    reply.code(201).send({
      data: subCategories,
      event_code: '1',
      message: 'All sub-categories returned successfully',
      status_code: 201,
    });
  } catch (error) {
    console.error('Error getting task sub-categories:', error);
    reply.code(500).send({
      event_code: '2',
      message: error.message || 'Internal server error',
      status_code: 500,
    });
  }
};

// Handler for creating a new handyman
const createHandymanHandler = async (request, reply) => {
  try {
    // Extract data from request body
    const { uid, category_list, experience, about, address } = request.body;

    // Generate a new handyman ID
    const handymanId = generateUuid();

    // Create a new handyman document in MongoDB
    const newHandyman = new Handyman({
      id: handymanId,
      userId: uid,
      categoryList: category_list,
      about: about,
      address: address,
      experience: experience,
      rating: 0,
      reviewsCount: 0,
    });

    // Save the handyman document to the database
    const savedHandyman = await newHandyman.save();

    // Respond with the ID of the saved handyman
    reply.code(201).send({
      data: savedHandyman.id,
      event_code: '1',
      message: 'Handyman created successfully',
      status_code: 201,
    });
  } catch (error) {
    // Handle errors
    console.error('Error creating handyman:', error);
    reply.code(500).send({
      event_code: '2',
      message: error.message || 'Internal server error',
      status_code: 500,
    });
  }
};

// Handler for updating handyman information
const updateHandymanHandler = async (request, reply) => {
  try {
    const { handyman_id, handyman_info } = request.body;

    // Map the incoming handyman_info object keys to match the schema in the backend
    const updatedFields = {};
    for (const key in handyman_info) {
      switch (key) {
        case 'category_list':
          updatedFields.categoryList = handyman_info[key];
          break;
        case 'about':
          updatedFields.about = handyman_info[key];
          break;
        case 'experience':
          updatedFields.experience = handyman_info[key];
          break;
        case 'address':
          updatedFields.address = handyman_info[key];
          break;
        case 'online_status':
          updatedFields.onlineStatus = handyman_info[key];
          break;
        // Add more cases for other fields if needed
        default:
          // Ignore any other keys
          break;
      }
    }

    // Find handyman by ID and update the fields in MongoDB
    const updatedHandyman = await Handyman.findOneAndUpdate(
      { id: handyman_id },
      { $set: updatedFields },
      { new: true }
    );

    if (updatedHandyman) {
      // If handyman is successfully updated, send success response
      reply.code(201).send({
        data: null,
        event_code: '1',
        message: 'Handyman updated successfully',
        status_code: 201,
      });
    } else {
      // If handyman with the provided ID is not found, send not found response
      reply.code(404).send({
        data: null,
        event_code: '0',
        message: 'Handyman not found',
        status_code: 404,
      });
    }
  } catch (error) {
    // If any error occurs during the update process, send internal server error response
    console.error('Error updating handyman:', error);
    reply.code(500).send({
      event_code: '2',
      message: error.message || 'Internal server error',
      status_code: 500,
    });
  }
};

// Handler for getting handyman information with name and phone number
const getHandymanHandler = async (request, reply) => {
  try {
    const { handyman_id } = request.query;

    // Use aggregation to find handyman with name and phone number
    const handyman = await Handyman.aggregate([
      // Match handyman with the provided ID
      { $match: { id: handyman_id } },
      // Lookup user information for the handyman
      {
        $lookup: {
          from: 'users', // Use the name of the User collection
          localField: 'userId',
          foreignField: 'id',
          as: 'user',
        },
      },
      // Unwind the user array to get individual user documents
      { $unwind: '$user' },
      // Project fields to include in the result
      {
        $project: {
          _id: 0, // Exclude the MongoDB _id field
          handyman_id: '$id',
          category_list: '$categoryList',
          experience: 1,
          about: 1,
          address: 1,
          online_status: '$onlineStatus',
          rating: 1,
          reviews_count: '$reviewsCount', // Rename 'reviewsCount' to 'reviews_count
          created_at: '$createdAt',
          user_id: '$userId',
          handyman_name: {
            $concat: ['$user.firstName', ' ', '$user.lastName'],
          },
          handyman_phone_number: '$user.phoneNumber',
        },
      },
    ]);

    // If handyman is found, send it in the response
    if (handyman.length > 0) {
      reply.code(201).send({
        data: handyman[0], // Send the first matched handyman
        event_code: '1',
        message: 'Handyman returned successfully',
        status_code: 201,
      });
    } else {
      // If no handyman is found, send a message indicating not found
      reply.code(404).send({
        data: null,
        event_code: '0',
        message: 'Handyman not found',
        status_code: 404,
      });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error getting handyman:', error);
    reply.code(500).send({
      event_code: '2',
      message: error.message || 'Internal server error',
      status_code: 500,
    });
  }
};

// Get handynan by user Id
// Handler for getting handyman information with name and phone number
const getHandymanByUserIdHandler = async (request, reply) => {
  try {
    const { user_id } = request.query;

    // Use aggregation to find handyman with name and phone number
    const handyman = await Handyman.aggregate([
      // Match handyman with the provided ID
      { $match: { userId: user_id } },
      // Lookup user information for the handyman
      {
        $lookup: {
          from: 'users', // Use the name of the User collection
          localField: 'userId',
          foreignField: 'id',
          as: 'user',
        },
      },
      // Unwind the user array to get individual user documents
      { $unwind: '$user' },
      // Project fields to include in the result
      {
        $project: {
          _id: 0, // Exclude the MongoDB _id field
          handyman_id: '$id',
          category_list: '$categoryList',
          experience: 1,
          about: 1,
          address: 1,
          online_status: '$onlineStatus',
          created_at: '$createdAt',
          user_id: '$userId',
          handyman_name: {
            $concat: ['$user.firstName', ' ', '$user.lastName'],
          },
          handyman_phone_number: '$user.phoneNumber',
        },
      },
    ]);

    // If handyman is found, send it in the response
    if (handyman.length > 0) {
      reply.code(201).send({
        data: handyman[0], // Send the first matched handyman
        event_code: '1',
        message: 'Handyman returned successfully',
        status_code: 201,
      });
    } else {
      // If no handyman is found, send a message indicating not found
      reply.code(201).send({
        data: null,
        event_code: '0',
        message: 'Handyman not found with userId provided',
        status_code: 404,
      });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error getting handyman:', error);
    reply.code(500).send({
      event_code: '2',
      message: error.message || 'Internal server error',
      status_code: 500,
    });
  }
};

//get handyman complete profile
const getHandymanCompleteProfile = async (request, reply) => {
  try {
    const { handyman_id } = request.query;

    // Aggregation to find handyman, user details, and include reviews
    const handymanDetails = await Handyman.aggregate([
      { $match: { id: handyman_id } },
      {
        $lookup: {
          from: 'users', // User collection name
          localField: 'userId',
          foreignField: 'id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $lookup: {
          from: 'reviews', // Reviews collection name
          localField: 'id',
          foreignField: 'handymanId',
          as: 'reviews'
        }
      },
      {
        $lookup: {
          from: 'users', // User collection name
          localField: 'reviews.userId',
          foreignField: 'id',
          as: 'reviewUsers'
        }
      },
      {
        $lookup: {
          from: 'tasks',
          localField: 'id',
          foreignField: 'handymanId',
          as: 'tasks'
        }
      },
      {
        $project: {
          _id: 0,
          handyman_id: '$id',
          category_list: '$categoryList',
          experience: 1,
          about: 1,
          address: 1,
          online_status: '$onlineStatus',
          rating: 1,
          reviews_count: '$reviewsCount',
          handyman_created_at: '$createdAt',
          user_id: '$user.id',
          handyman_name: { $concat: ['$user.firstName', ' ', '$user.lastName'] },
          handyman_phone_number: '$user.phoneNumber',
          email: '$user.email',
          gender: '$user.gender',
          reviews: {
            $map: {
              input: '$reviews',
              as: 'review',
              in: {
                reviewer_name: {
                  $concat: [
                    { $arrayElemAt: ['$reviewUsers.firstName', 0] },
                    ' ',
                    { $arrayElemAt: ['$reviewUsers.lastName', 0] }
                  ]
                },
                rating: '$$review.rating',
                review: '$$review.review',
                review_created_at: '$$review.createdAt'
              }
            }
          },
          total_tasks_completed: {
            $size: {
              $filter: {
                input: '$tasks',
                as: 'task',
                cond: { $eq: ['$$task.taskStatus', 'COMPLETED'] }
              }
            }
          },
          days_since_created: {
            $divide: [
              { $subtract: [new Date(), '$createdAt'] },
              1000 * 60 * 60 * 24 // Convert milliseconds to days
            ]
          }
        }
      }
    ]);

    // Check if handyman details were found and send response
    if (handymanDetails.length > 0) {
      reply.code(200).send({
        data: handymanDetails[0], // Assuming there's only one match
        event_code: '1',
        message: 'Handyman details fetched successfully',
        status_code: 200
      });
    } else {
      reply.code(404).send({
        data: null,
        event_code: '0',
        message: 'Handyman not found',
        status_code: 404
      });
    }
  } catch (error) {
    console.error('Error getting handyman:', error);
    reply.code(500).send({
      event_code: '2',
      message: error.message || 'Internal server error',
      status_code: 500
    });
  }
}

const getHandymanCompletedTasks = async (request, reply) => {
  try {
    const { handyman_id } = request.query;

    // Use aggregation to find completed tasks assigned to the handyman
    const completedTasks = await Task.aggregate([
      // Match tasks that are completed and assigned to the specified handyman
      {
        $match: {
          handymanId: handyman_id,
          taskStatus: 'COMPLETED' 
        },
      },
      // Lookup user information for the task
      {
        $lookup: {
          from: 'users', // Use the name of the User collection
          localField: 'userId',
          foreignField: 'id',
          as: 'user',
        },
      },
      // Unwind the user array to get individual user documents
      { $unwind: '$user' },
      // Project fields to include in the result
      {
        $project: {
          _id: 0, // Exclude the MongoDB _id field
          task_id: '$id',
          handyman_id: 1,
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
          service_seeker_id: '$user.id',
          service_seeker_name: {
            $concat: ['$user.firstName', ' ', '$user.lastName'],
          },
          service_seeker_number: '$user.phoneNumber',
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
}

export {
  getTaskCategories,
  getTaskSubCategories,
  createHandymanHandler,
  updateHandymanHandler,
  getHandymanHandler,
  getHandymanByUserIdHandler,
  getHandymanCompleteProfile,
  getHandymanCompletedTasks
};
