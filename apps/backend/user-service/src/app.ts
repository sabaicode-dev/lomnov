import express from 'express';
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from '@/src/routes/v1/routes';
import fs from 'fs';
import path from 'path'
import { loggingMiddleware } from './utils/request-response-logger/logger';
import { errorHandler } from './utils/error/errorHanler';


// Dynamically load swagger.json
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs/swagger.json'), 'utf8'));

// ========================
// Initialize App Express
// ========================
const app = express();

app.use(cookieParser());

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
// app.use(authenticateToken)
RegisterRoutes(app)

// ========================
// API Documentations
// ========================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ========================
// ERROR Handler
// ========================
app.use(errorHandler)

export default app;
