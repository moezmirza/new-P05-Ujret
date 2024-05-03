import Task from '../../models/handymen_module/taskModel.js';
import { TASK_STATUSES } from '../../models/handymen_module/taskModel.js';
import Bid from '../../models/handymen_module/bidModel.js';
import { BID_STATUSES } from '../../models/handymen_module/bidModel.js';
import User from '../../models/userModel.js';
import Handyman from '../../models/handymen_module/handymanModel.js';

// Utils
import { generateUuid } from '../utilities.js';

// TaskStatus is PENDING upon creation, ACCEPTED upon bid acceptance, COMPLETED upon completion by narked user

// Handler for creating a new task
const createTaskHandler = async (request, reply) => {
  try {
    // Extract data from request body
    const {
      uid,
      category,
      sub_categories,
      description,
      address,
      budget,
      duration,
    } = request.body;

    // Generate a new task ID
    const taskId = generateUuid();

    // Create a new task document in MongoDB
    const newTask = new Task({
      id: taskId,
      userId: uid,
      category: category.toUpperCase(),
      subCategories: sub_categories,
      description: description,
      address: address,
      budget: budget,
      duration: duration,
    });

    // Save the task document to the database
    const savedTask = await newTask.save();

    // Respond with the ID of the saved task
    reply.code(201).send({
      data: savedTask.id,
      event_code: '1',
      message: 'Task created successfully',
      status_code: 201,
    });
  } catch (error) {
    // Handle errors
    console.error('Error creating task:', error);
    reply.code(500).send({
      event_code: '2',
      message: error.message || 'Internal server error',
      status_code: 500,
    });
  }
};

// Handler for getting relevant available tasks using aggregation
const getRelevantAvailableTasksHandler = async (request, reply) => {
  try {
    const { category_list } = request.body;

    // Use aggregation to find relevant tasks
    const relevantTasks = await Task.aggregate([
      // Match tasks with categories in the provided category list
      {
        $match: {
          category: { $in: category_list.map((c) => c.toUpperCase()) },
          taskStatus: TASK_STATUSES[0],
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
          sub_categories: '$subCategories', // Change 'sub_categories' to 'subCategories
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
    // If relevant tasks are found, send them in the response
    if (relevantTasks.length > 0) {
      reply.code(201).send({
        data: relevantTasks,
        event_code: '1',
        message: 'All relevant available tasks returned successfully',
        status_code: 201,
      });
    } else {
      // If no relevant tasks are found, send a message indicating no tasks found
      reply.code(404).send({
        data: [],
        event_code: '0',
        message: 'No relevant available tasks found',
        status_code: 404,
      });
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error fetching relevant available tasks:', error);
    reply.code(500).send({
      event_code: '2',
      message: error.message || 'Internal server error',
      status_code: 500,
    });
  }
};

// // Handler for getting relevant available tasks using aggregation
// const getRelevantAvailableTasksHandler = async (request, reply) => {
//   try {
//     const { category_list } = request.body;
//     console.log(category_list);

//     // Use aggregation to find relevant tasks
//     const relevantTasks = await Task.aggregate([
//       // Match tasks with the provided category
//       {
//         $match: {
//           categoryList: { $in: category_list.map((c) => c.toUpperCase()) },
//           taskStatus: TASK_STATUSES[0],
//         },
//       },
//       // Lookup user information for the task
//       {
//         $lookup: {
//           from: 'users', // Use the name of the User collection
//           localField: 'userId',
//           foreignField: 'id',
//           as: 'user',
//         },
//       },
//       // Unwind the user array to get individual user documents
//       { $unwind: '$user' },
//       // Project fields to include in the result
//       {
//         $project: {
//           _id: 0, // Exclude the MongoDB _id field
//           task_id: '$id',
//           handyman_id: 1,
//           category: 1,
//           description: 1,
//           address: 1,
//           budget: 1,
//           price: 1,
//           duration: 1,
//           scheduledDate: 1,
//           scheduledTime: 1,
//           createdAt: 1,
//           taskStatus: 1,
//           service_seeker_id: '$user.id',
//           service_seeker_name: {
//             $concat: ['$user.firstName', ' ', '$user.lastName'],
//           },
//           service_seeker_number: '$user.phoneNumber',
//         },
//       },
//     ]);

//     // If relevant tasks are found, send them in the response
//     if (relevantTasks.length > 0) {
//       reply.code(201).send({
//         data: relevantTasks,
//         event_code: '1',
//         message: 'All relevant available tasks returned successfully',
//         status_code: 201,
//       });
//     } else {
//       // If no relevant tasks are found, send a message indicating no tasks found
//       reply.code(404).send({
//         data: [],
//         event_code: '0',
//         message: 'No relevant available tasks found',
//         status_code: 404,
//       });
//     }
//   } catch (error) {
//     // Handle any errors that occur during the process
//     console.error('Error fetching relevant available tasks:', error);
//     reply.code(500).send({
//       event_code: '2',
//       message: error.message || 'Internal server error',
//       status_code: 500,
//     });
//   }
// };

// Handler for creating a new bid task
const createBidTaskHandler = async (request, reply) => {
  try {
    // Extract data from request body
    const { amount, description, task_id, handyman_id } = request.body;

    // Generate a new bid ID
    const bidId = generateUuid();

    // Create a new bid document in MongoDB
    const newBid = new Bid({
      id: bidId,
      taskId: task_id,
      handymanId: handyman_id,
      amount: amount,
      description: description,
    });

    // Save the bid document to the database
    const savedBid = await newBid.save();

    // Respond with the ID of the saved bid
    reply.code(201).send({
      data: savedBid.id,
      event_code: '1',
      message: 'Bid created successfully',
      status_code: 201,
    });
  } catch (error) {
    // Handle errors
    console.error('Error creating bid:', error);
    reply.code(500).send({
      event_code: '2',
      message: error.message || 'Internal server error',
      status_code: 500,
    });
  }
};

// Handler for getting task bids
const getTaskBidsHandler = async (request, reply) => {
  try {
    const { task_id } = request.query;

    // Use aggregation to find relevant bids for the specified task ID
    const taskBids = await Bid.aggregate([
      // Match bids with the provided task ID
      { $match: { taskId: task_id, bidStatus: BID_STATUSES[0] } },
      // Lookup handyman information for the bid
      {
        $lookup: {
          from: 'handymen', // Use the name of the Handyman collection
          localField: 'handymanId',
          foreignField: 'id',
          as: 'handyman',
        },
      },
      // Unwind the handyman array to get individual handyman documents
      { $unwind: '$handyman' },
      // Lookup user information for the handyman
      {
        $lookup: {
          from: 'users', // Use the name of the User collection
          localField: 'handyman.userId',
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
          bid_id: '$id',
          handyman_id: '$handyman.id',
          task_id: '$taskId',
          created_at: '$createdAt',
          amount: 1,
          description: 1,
          handyman_name: {
            $concat: ['$user.firstName', ' ', '$user.lastName'],
          },
          handyman_number: '$user.phoneNumber',
          handyman_rating: '$handyman.rating',
          handyman_reviews_count: '$handyman.reviewsCount',
        },
      },
    ]);

    if (taskBids.length > 0) {
      // If bids found for the task, send them in the response
      reply.code(200).send({
        data: taskBids,
        event_code: '1',
        message: 'All task bids returned successfully',
        status_code: 200,
      });
    } else {
      // If no bids found for the task, send a message indicating no bids found
      reply.code(404).send({
        data: [],
        event_code: '0',
        message: 'No bids found for the task',
        status_code: 404,
      });
    }
  } catch (error) {
    console.error('Error getting task bids:', error);
    reply.code(500).send({
      event_code: '2',
      message: error.message || 'Internal server error',
      status_code: 500,
    });
  }
};

// Handler for accepting a bid
const acceptBidHandler = async (request, reply) => {
  try {
    const { bid_id } = request.query;

    // Find the bid by its ID
    const bid = await Bid.findOne({ id: bid_id });

    if (!bid) {
      // If bid with the provided ID is not found, send a not found response
      reply.code(404).send({
        data: null,
        event_code: '0',
        message: 'Bid not found',
        status_code: 404,
      });
      return;
    }

    // Update the bid status to "ACCEPTED"
    bid.bidStatus = BID_STATUSES[1];
    await bid.save();

    // Find all other bids related to the same task_id and exclude the bid with the provided bid_id
    const otherBids = await Bid.updateMany(
      { taskId: bid.taskId, id: { $ne: bid_id } },
      { $set: { bidStatus: BID_STATUSES[2] } } // Set bid status to "DECLINED"
    );

    // Update the task associated with the bid
    const task = await Task.findOne({ id: bid.taskId });

    if (!task) {
      // If task associated with the bid is not found, send an error response
      reply.code(500).send({
        event_code: '2',
        message: 'Task associated with the bid not found',
        status_code: 500,
      });
      return;
    }

    // Update the task status to "ACCEPTED"
    task.taskStatus = TASK_STATUSES[1];
    // Update the task price to the bid price
    task.price = bid.amount;
    // Update the task handyman ID to the bid handyman ID
    task.handymanId = bid.handymanId;
    await task.save();

    // Send a success response
    reply.code(201).send({
      data: null,
      event_code: '1',
      message: 'Bid accepted successfully',
      status_code: 201,
    });
  } catch (error) {
    console.error('Error accepting bid:', error);
    reply.code(500).send({
      event_code: '2',
      message: error.message || 'Internal server error',
      status_code: 500,
    });
  }
};

// Handler for declining a bid
const declineBidHandler = async (request, reply) => {
  try {
    const { bid_id } = request.query;

    // Find the bid by its ID
    const bid = await Bid.findOne({ id: bid_id });

    if (!bid) {
      // If bid not found, send a not found response
      reply.code(404).send({
        data: null,
        event_code: '0',
        message: 'Bid not found',
        status_code: 404,
      });
      return;
    }

    // Update the bid status to "DECLINED"
    bid.bidStatus = BID_STATUSES[2];
    await bid.save();

    // Send a success response
    reply.code(201).send({
      data: null,
      event_code: '1',
      message: 'Bid declined successfully',
      status_code: 201,
    });
  } catch (error) {
    // Handle errors
    console.error('Error declining bid:', error);
    reply.code(500).send({
      event_code: '2',
      message: error.message || 'Internal server error',
      status_code: 500,
    });
  }
};

// Handler for marking a task as completed by the user
const markTaskCompletedHandler = async (request, reply) => {
  try {
    const { task_id, user_id } = request.body;

    // Find the task by its ID
    const task = await Task.findOne({ id: task_id });

    if (!task) {
      // If task with the provided ID is not found, send a not found response
      reply.code(404).send({
        data: null,
        event_code: '0',
        message: 'Task not found',
        status_code: 404,
      });
      return;
    }

    // Check if the user_id matches the userId associated with the task
    if (task.userId !== user_id) {
      // If the user is not authorized to mark the task as completed, send an unauthorized response
      reply.code(403).send({
        data: null,
        event_code: '0',
        message:
          'Unauthorized access: User does not have permission to complete this task',
        status_code: 403,
      });
      return;
    }

    // Update the task status to "COMPLETED"
    task.taskStatus = TASK_STATUSES[3]; // Assuming "COMPLETED" is at index 3 in TASK_STATUSES
    await task.save();

    // Send a success response
    reply.code(200).send({
      data: null,
      event_code: '1',
      message: 'Task marked as completed successfully',
      status_code: 200,
    });
  } catch (error) {
    console.error('Error marking task as completed:', error);
    reply.code(500).send({
      event_code: '2',
      message: error.message || 'Internal server error',
      status_code: 500,
    });
  }
};

// Handler for checking the status of a task
const checkTaskStatusHandler = async (request, reply) => {
  try {
    const { task_id } = request.query;

    // Find the task by its ID
    const task = await Task.findOne({ id: task_id });

    if (!task) {
      // If task with the provided ID is not found, send a not found response
      reply.code(404).send({
        data: null,
        event_code: '0',
        message: 'Task not found',
        status_code: 404,
      });
      return;
    }

    // Send the task status in the response
    reply.code(201).send({
      data: task.taskStatus,
      event_code: '1',
      message: 'Task status returned successfully',
      status_code: 201,
    });
  } catch (error) {
    console.error('Error checking task status:', error);
    reply.code(500).send({
      event_code: '2',
      message: error.message || 'Internal server error',
      status_code: 500,
    });
  }
};

// Handler for checking the status of a bid
const checkBidStatusHandler = async (request, reply) => {
  try {
    const { bid_id } = request.query;

    // Find the bid by its ID
    const bid = await Bid.findOne({ id: bid_id });

    if (!bid) {
      // If bid with the provided ID is not found, send a not found response
      reply.code(404).send({
        data: null,
        event_code: '0',
        message: 'Bid not found',
        status_code: 404,
      });
      return;
    }

    // Send the bid status in the response
    reply.code(201).send({
      data: bid.bidStatus,
      event_code: '1',
      message: 'Bid status returned successfully',
      status_code: 201,
    });
  } catch (error) {
    console.error('Error checking bid status:', error);
    reply.code(500).send({
      event_code: '2',
      message: error.message || 'Internal server error',
      status_code: 500,
    });
  }
};

// Export the route handler function
export {
  createTaskHandler,
  getRelevantAvailableTasksHandler,
  createBidTaskHandler,
  getTaskBidsHandler,
  acceptBidHandler,
  declineBidHandler,
  markTaskCompletedHandler,
  checkTaskStatusHandler,
  checkBidStatusHandler,
};
