// src/server.ts
import express from "express";
import configs from "./config";
import applyProxy from "./middleware/proxy";
import cookieParser from "cookie-parser";
import routeConfigMiddleware from "./middleware/routeConfigMiddleware";
import authenticateToken from "./middleware/authenticateToken";
import authorizeRole from "./middleware/autherizeRole";
import requestLogger from "./middleware/request-response-logger";
const app = express();

app.use(cookieParser());
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
// ===============================
// Log Report Request
// ===============================
//================================
// Proxy Routes
// ===============================

applyProxy(app)
app.use(requestLogger);
app.listen(configs.port, () => {
  console.log(`API Gateway running on http://localhost:${configs.port}`);
});

// import express, { Request, Response, NextFunction } from 'express';
// import { createProxyMiddleware, Options } from 'http-proxy-middleware';

// const app = express();

// // Define allowed HTTP methods explicitly
// type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';

// // Example route configuration for the Auth service
// const authServiceUrl = 'http://localhost:4001/api/v1/auth';
// const authRoutes = {
//   path: "/api/v1/auth",
//   target: authServiceUrl,
//   nestedRoutes: [
//     { path: "/signup", methods: { POST: { authRequired: false, roles: [] } } },
//     { path: "/signin", methods: { POST: { authRequired: false, roles: [] } } },
//     { path: "/verify", methods: { POST: { authRequired: false, roles: [] } } },
//     { path: "/google-sign-in", methods: { GET: { authRequired: false, roles: [] } } }, // Focus here
//     { path: "/facebook-sign-in", methods: { GET: { authRequired: false, roles: [] } } },
//     { path: "/callback", methods: { GET: { authRequired: false, roles: [] } } },
//   ],
// };

// // Middleware to handle authorization based on method and roles
// const authorize = (authRequired: boolean, requiredRoles: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (!authRequired) {
//       return next(); // No authorization required
//     }

//     // Example: extract user roles from request headers or session
//     const userRoles = req.headers['x-user-roles']?.toString().split(',') || [];

//     const hasAccess = requiredRoles.every(role => userRoles.includes(role));

//     if (!hasAccess) {
//       res.status(403).json({ message: 'Forbidden: You do not have access to this resource.' });
//       return;
//     }

//     next();
//   };
// };

// // Function to configure proxy for each route
// authRoutes.nestedRoutes.forEach((route) => {
//   Object.entries(route.methods).forEach(([method, config]) => {
//     const httpMethod = method.toLowerCase() as HttpMethod;

//     app[httpMethod](authRoutes.path + route.path, authorize(config.authRequired, config.roles) as express.RequestHandler, createProxyMiddleware({
//       target: authRoutes.target,
//       changeOrigin: true,
//       pathRewrite: {
//         [`^${authRoutes.path}${route.path}`]: route.path // Correct path rewrite
//       },
//       onProxyReq: (proxyReq:any, req:any) => {
//         console.log(`[PROXY REQ] ${req.method} ${req.url} -> ${authRoutes.target}${route.path}`);
//       },
//       onProxyRes: (proxyRes:any, req:any) => {
//         console.log(`[PROXY RES] ${req.method} ${req.url} -> ${proxyRes.statusCode}`);
//       },
//       onError: (err:any, req:any, res:any) => {
//         console.error(`[PROXY ERROR] ${req.method} ${req.url}:`, err);
//         res.status(500).end("Proxy error");
//       }
//     } as Options));
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// Define a configuration object with your routes and their targets
// const proxyConfig = {
//   "/api/auth": "http://localhost:4001/api/v1/auths",
//   "/api/google": "http://localhost:4001/api/v1/auth/google-sign-in",
//   "/api/facebook": "http://localhost:4001/api/v1/auth/facebook-sign-in",
//   "/api/users": "http://localhost:4002/api/v1/users",
//   "/api/products": "http://localhost:4003/api/v1/products",
//   "/api/orders": "http://localhost:4004/api/v1/orders",
// };

// Extend the Options type to include onProxyReq
// interface ExtendedOptions extends Options {
//   onProxyReq?: (proxyReq: any, req: Request, res: Response) => void;
// }

// Function to add the custom header
// function addCustomHeader(proxyReq: any, req: Request, res: Response) {
//   proxyReq.setHeader("x-api-gateway-header", "expected-value"); // Set header value
// }

// // Iterate over the configuration to create the proxy middleware
// Object.keys(proxyConfig).forEach((route) => {
//   const options: ExtendedOptions = {
//     target: proxyConfig[route as keyof typeof proxyConfig],
//     changeOrigin: true,
//     on: {
//       proxyReq: (proxyReq: any, req: any, res: any) => {
//         proxyReq.setHeader('x-api-gateway-header', 'http://localhost:3000');
//       }
//     },
//   };

//   app.use(route, createProxyMiddleware(options));
// });
