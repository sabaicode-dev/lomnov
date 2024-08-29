import { Request, Response, NextFunction } from "express";
import ROUTE_PATHS, {  RouteConfig } from "../routes-def";

const findMatchingRoute = (
  path: string,
  routes: RouteConfig[]
): RouteConfig | undefined => {
  for (const route of routes) {
    if (path.startsWith(route.path)) {
      if (route.nestedRoutes) {
        const nestedMatch = findMatchingRoute(
          path.replace(route.path, ""),
          route.nestedRoutes
        );
        if (nestedMatch) return nestedMatch;
      }
      return route;
    }
  }
  return undefined;
};

const routeConfigMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const matchedRoute = findMatchingRoute(req.path, Object.values(ROUTE_PATHS));

  if (matchedRoute) {
    // Check if the method is valid for the matched route
    const methodConfig = matchedRoute.methods?.[req.method];
    if (methodConfig) {
      req.routeConfig = matchedRoute;
      next();
    } else {
      // Invalid method for the matched route
      return res.status(405).json({
        message: `Method Not Allowed: The ${req.method} method is not allowed for ${req.path}.`,
      });
    }
  } else {
    // Invalid route
    return res.status(404).json({
      message: `Not Found: The requested path ${req.path} does not exist.`,
    });
  }
};

export default routeConfigMiddleware;
