import express, { RequestHandler } from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "@/src/routes/v1/routes";
import fs from "fs";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
// import { loggingMiddleware } from "./utils/request-response-logger/logger";
import { errorHandler } from "./utils/error/errorHanler";
import { randomBytes } from "crypto";
import corsOptions from "./middlewares/cors";
// LOAD SWAAGER DOCUMENTATION JSON FILE
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "docs/swagger.json"), "utf8")
);
import cors from "cors";

// ========================
// Initialize App Express
// ========================
const app = express();



// ========================
// SECURITIES MIDDLEWARES
// ========================
app.use(cookieParser() as unknown as express.Handler);
app.use(
  session({
    secret: randomBytes(64).toString("hex"),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to false for local development without HTTPS
  }) as unknown as express.Handler
);

// ========================
// GLOBAL COMMONS MIDDLEWARES
// ========================
app.use(express.json()); // Help to get the json from request body
// app.use(loggingMiddleware);
app.use(cors(corsOptions));

// ========================
// Global API V1
// ========================
RegisterRoutes(app);

// ========================
// API DOCUMENTATION
// ========================
app.use(
  "/api/v1/auth/api-docs",
  swaggerUi.serve as unknown as RequestHandler,
  swaggerUi.setup(swaggerDocument) as unknown as RequestHandler,
);

// ========================
// GLOBAL ERROR HANDLER
// ========================
app.use(errorHandler);

export default app;
