// Renting module routes
import { fastify } from './fastify_init.js';

// Define base URL for each module
export const BASE_URL = '/api/v1';

import {
  getToolCategories,
  createTool,
  getAllTools,
  getRenterTools,
  updateTool,
  deleteTool,
} from '../controllers/renter_module/tool_controller.js';

fastify.get(`${BASE_URL}/renting`, async (request, reply) => {
  return { message: 'Welcome to the Ujret Backend Renting Module!' };
});

//categories
fastify.get(`${BASE_URL}/tool-categories`, getToolCategories);

//tools
fastify.post(`${BASE_URL}/renting/create-tool`, createTool);
fastify.get(`${BASE_URL}/renting/all-tools`, getAllTools);
fastify.get(`${BASE_URL}/renting/renter-tools`, getRenterTools);
fastify.put(`${BASE_URL}/renting/update-tool`, updateTool);
fastify.delete(`${BASE_URL}/renting/delete-tool`, deleteTool);
