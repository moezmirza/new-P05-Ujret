// Entry point for server
import 'dotenv/config';
import { mongo } from './config/db.js';
import { fastify } from './routes/fastify_init.js';

// Import routes
import './routes/handyman_module_routes.js';
import './routes/renting_module_routes.js';

// Define base URL for each module
export const BASE_URL = '/api/v1';

// Define welcome message route
fastify.get(BASE_URL, async (request, reply) => {
  return { message: 'Welcome to the Ujret Backend !' };
});

// Start the server
async function startServer() {
  try {
    await mongo; // Ensure MongoDB is connected
    console.log('Database connection successful');

    // Start Fastify server
    fastify.listen(
      { host: '0.0.0.0', port: process.env.PORT || 8000 },
      function (err, address) {
        if (err) {
          fastify.log.error(err);
          process.exit(1);
        } else {
          console.log(`Server is now listening on ${address}`);
        }
        // Server is now listening on ${address}
      }
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer();