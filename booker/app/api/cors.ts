// cors.js
import Cors from 'cors';
import { NextApiResponse, NextApiRequest } from 'next';

// Initialize the cors middleware
const cors = Cors({
  origin: 'http://localhost:3000', // Allow requests from your React app
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['X-Requested-With', 'Content-Type'], // Allowed headers
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
});

// Helper method to handle CORS preflight requests
export const corsMiddleware = (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};
