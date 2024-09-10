import { Request, Response, NextFunction } from "express";
import ROUTE_PATHS from "@/src/routes-def";
import { NotFoundError } from "@/src/utils/error/customErrors";
import findMatchingRoute from "@/src/middleware/findMatchingRoute";
// =====================================================

// Middleware to set route configuration
const routeConfigMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const matchedRoute = findMatchingRoute(req.path, Object.values(ROUTE_PATHS));
  if (matchedRoute) {
    // Check if the method is valid for the matched route
    const methodConfig = matchedRoute.methods?.[req.method];
    if (methodConfig) {
      req.routeConfig = matchedRoute;
      return next();
    } else {
      // Invalid method for the matched route
      return next(new NotFoundError(`Method Not Allowed: The ${req.method} method is not allowed for ${req.path}.`));
    }
  } else {
    // Invalid route
    return next(new NotFoundError(`Not Found: The requested path ${req.path} does not exist.`));
  }
};

export default routeConfigMiddleware;
