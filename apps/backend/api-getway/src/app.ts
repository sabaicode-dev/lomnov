import express from "express";
import applyProxy from "./middleware/proxy";
import cookieParser from "cookie-parser";
// import routeConfigMiddleware from "./middleware/routeConfigMiddleware";
// import authenticateToken from "./middleware/authenticateToken";
// import authorizeRole from "./middleware/autherizeRole";
import requestLogger from "./middleware/request-response-logger";
const app = express();

app.use(cookieParser());
// ===============================
// Check route and http request
// ===============================
// app.use(routeConfigMiddleware);
// ===============================
// Authenticate
// ===============================
// app.use(authenticateToken);
// ===============================
// Autherization roles permission
// ===============================
// app.use(authorizeRole);
//================================
// Proxy Routes
// ===============================
applyProxy(app)
// ===============================
// Log Report Request
// ===============================
app.use(requestLogger);


export default app
