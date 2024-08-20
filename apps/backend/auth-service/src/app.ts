import express from 'express';
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from '@/src/routes/v1/routes';
import fs from 'fs';
import path from 'path'

import session from 'express-session';
import { loggingMiddleware } from './utils/request-response-logger/logger';
const { randomBytes } = require('crypto');
// Dynamically load swagger.json
const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'docs/swagger.json'), 'utf8'));

// ========================
// Initialize App Express
// ========================
const app = express();
// Debugging: Log middleware application order
app.use((_req, _res, next) => {
    console.log('Session middleware applied');
    next();
});

app.use(session({
    secret: randomBytes(64).toString('hex'),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to false for local development without HTTPS
}));
// ========================
// Global Middleware
// ========================
app.use(express.json())  // Help to get the json from request body
// ========================
// Middleware to block unauthorized direct access
// ========================
//   app.use(blockDirectAccess);

// ========================
// Request Response logger
// ========================

app.use(loggingMiddleware)
// ========================
// Global API V1
// ========================
RegisterRoutes(app)

// ========================
// API Documentations
// ========================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ========================
// ERROR Handler
// ========================
// Handle Later

export default app;
