import express, { RequestHandler } from 'express';
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from '@/src/routes/v1/routes';
import fs from 'fs';
import path from 'path'
import { loggingMiddleware } from './utils/request-response-logger/logger';
import { errorHandler } from './utils/error/errorHanler';
import cookieParser from 'cookie-parser';

import cors from "cors";
import corsOptions from './middlewares/corsOption';

// Dynamically load swagger.json
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs/swagger.json'), 'utf8'));

// ========================
// Initialize App Express
// ========================
const app = express();

app.use(cors(corsOptions));
app.use(cookieParser() as unknown as express.Handler);

// ========================
// Global Middleware
// ========================
app.use(express.json())  // Help to get the json from request body

// ========================
// Request Response logger
// ========================
app.use(loggingMiddleware)

// ========================
// Global API V1
// ========================
RegisterRoutes(app)
console.log("Error!");

// ========================
// API Documentations
// ========================
app.use("/api/v1/properties/api-docs", swaggerUi.serve as unknown as RequestHandler, swaggerUi.setup(swaggerDocument) as unknown as RequestHandler);

// ========================
// ERROR Handler
// ========================
console.log("Request Body:", express.request.body);

app.use(errorHandler)


export default app;

