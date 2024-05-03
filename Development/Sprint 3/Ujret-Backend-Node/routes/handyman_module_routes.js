// Handymen module routes
import { fastify } from './fastify_init.js';

// Define base URL for each module
export const BASE_URL = '/api/v1';

// Import route controllers
// User
import {
  createUserHandler,
  getUserHandler,
  updateUserHandler,
  getUserCompletedTasks,
  getUserAllTasks,
} from '../controllers/handymen_module/user_controller.js';

// Handyman
import {
  getTaskCategories,
  getTaskSubCategories,
  createHandymanHandler,
  updateHandymanHandler,
  getHandymanHandler,
  getHandymanByUserIdHandler,
  getHandymanCompleteProfile,
  getHandymanCompletedTasks,
} from '../controllers/handymen_module/handyman_controller.js';

// Task
import {
  createTaskHandler,
  getRelevantAvailableTasksHandler,
  createBidTaskHandler,
  getTaskBidsHandler,
  acceptBidHandler,
  declineBidHandler,
  markTaskCompletedHandler,
  checkTaskStatusHandler,
  checkBidStatusHandler,
} from '../controllers/handymen_module/task_controller.js';

// Review
import {
  addReview,
  updateRating,
  updateAllRatings,
} from '../controllers/handymen_module/review_controller.js';

// User
fastify.post(`${BASE_URL}/create-user`, createUserHandler);
fastify.get(`${BASE_URL}/get-user`, getUserHandler);
fastify.put(`${BASE_URL}/update-user`, updateUserHandler);
fastify.get(`${BASE_URL}/get-user-completed-tasks`, getUserCompletedTasks);
fastify.get(`${BASE_URL}/get-user-all-tasks`, getUserAllTasks);

// Handyman
fastify.get(`${BASE_URL}/get-task-categories`, getTaskCategories);
fastify.get(`${BASE_URL}/get-handyman-subcategories`, getTaskSubCategories);
fastify.post(`${BASE_URL}/create-handyman`, createHandymanHandler);
fastify.put(`${BASE_URL}/update-handyman`, updateHandymanHandler);
fastify.get(`${BASE_URL}/get-handyman`, getHandymanHandler);
fastify.get(`${BASE_URL}/get-handyman-by-user-id`, getHandymanByUserIdHandler);
fastify.get(
  `${BASE_URL}/get-handyman-complete-profile`,
  getHandymanCompleteProfile
);
fastify.get(
  `${BASE_URL}/get-handyman-completed-tasks`,
  getHandymanCompletedTasks
);

// Task
fastify.post(`${BASE_URL}/create-task`, createTaskHandler);
fastify.post(
  `${BASE_URL}/get-relevant-available-tasks`,
  getRelevantAvailableTasksHandler
);
fastify.post(`${BASE_URL}/bid-task`, createBidTaskHandler);
fastify.get(`${BASE_URL}/get-task-bids`, getTaskBidsHandler);
fastify.put(`${BASE_URL}/decline-bid`, declineBidHandler);
fastify.put(`${BASE_URL}/accept-bid`, acceptBidHandler);
fastify.put(`${BASE_URL}/user-mark-task-completed`, markTaskCompletedHandler);
fastify.get(`${BASE_URL}/check-task-status`, checkTaskStatusHandler);
fastify.get(`${BASE_URL}/check-bid-status`, checkBidStatusHandler);

//Review
fastify.post(`${BASE_URL}/add-review`, addReview);
//functions in case incorrect rating is added to db:
fastify.put(`${BASE_URL}/update-rating`, updateRating);
fastify.put(`${BASE_URL}/update-all-ratings`, updateAllRatings);

// Add other routes for the Handymen module as needed
