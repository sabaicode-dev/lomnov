import express from "express";
import applyProxy from "@/src/middleware/proxy";
import cookieParser from "cookie-parser";
import routeConfigMiddleware from "@/src/middleware/routeConfigMiddleware";
import authenticateToken from "@/src//middleware/authenticateToken";
import authorizeRole from "@/src//middleware/autherizeRole";
import requestLogger from "@/src//middleware/request-response-logger";
import { errorHandler } from "@/src/utils/error/errorHanler";
import cors from "cors"
// ========================================================================

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true, // Allow credentials (cookies)
}));
// ===============================
// Check route and http request
// ===============================
app.use(routeConfigMiddleware);
// ===============================
// Authenticate
// ===============================
app.use(authenticateToken);
// ===============================
// Autherization roles permission
// ===============================
app.use(authorizeRole);
//================================
// Proxy Routes
// ===============================
applyProxy(app)
//================================
// handle error
// ===============================
app.use(errorHandler)
// ===============================
// Log Report Request
// ===============================
app.use(requestLogger);


export default app
