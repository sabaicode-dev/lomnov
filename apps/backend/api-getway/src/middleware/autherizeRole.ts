import { Request, Response, NextFunction } from "express";
import { RouteConfig } from "../routes-def"; // Import your RouteConfig interface

// Extend the Express Request interface
declare module "express-serve-static-core" {
  interface Request {
    routeConfig?: RouteConfig;
    user?: {
      roles: string[];
      [key: string]: any; // Additional properties can be added here
    };
  }
}

// Middleware to authorize user roles
const authorizeRole = (req: Request, res: Response, next: NextFunction) => {
  const { methods } = req.routeConfig || {};
  const { method } = req;
  const methodConfig = methods && methods[method];
console.log(req.user?.roles)
  // Skip authorization if authRequired is false
  if (methodConfig && !methodConfig.authRequired) {
    return next(); // Skip authorization, proceed to the next middleware
  }

  // Ensure user is authenticated
  if (!req.user || !req.user.roles) {
    return res.status(401).json({ message: "Unauthorized: Please log in." });
  }

  const userRoles = req.user.roles || [];
  const authorized = methodConfig?.roles?.some((role) =>
    userRoles.includes(role)
  );

  // Deny access if user is not authorized
  if (!authorized) {
    return res
      .status(403)
      .json({
        message:
          "Forbidden: You do not have permission to access this resource.",
      });
  }

  next(); // Proceed if authorized or if authRequired is false
};

export default authorizeRole;

