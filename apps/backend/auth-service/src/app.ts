import express from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "@/src/routes/v1/routes";
import fs from "fs";
import path from "path";
import cookieParser from "cookie-parser"
import session from "express-session";
import { loggingMiddleware } from "./utils/request-response-logger/logger";
import { errorHandler } from "./utils/error/errorHanler";
const { randomBytes } = require("crypto");

// LOAD SWAAGER DOCUMENTATION JSON FILE
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "docs/swagger.json"), "utf8"),
);


// ========================
// Initialize App Express
// ========================
const app = express();


// ========================
// SECURITIES MIDDLEWARES
// ========================
app.use(cookieParser());
app.use(
  session({
    secret: randomBytes(64).toString("hex"),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to false for local development without HTTPS
  }),
);

// ========================
// GLOBAL COMMONS MIDDLEWARES
// ========================
app.use(express.json()); // Help to get the json from request body
app.use(loggingMiddleware);


// ========================
// Global API V1
// ========================
RegisterRoutes(app);

// ========================
// API DOCUMENTATION
// ========================
app.use(
  "/api/v1/auth/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);

// ========================
// GLOBAL ERROR HANDLER
// ========================
app.use(errorHandler);

export default app;
