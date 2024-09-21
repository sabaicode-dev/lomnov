import { RouteConfig } from "@/src/utils/types/interface";
// ======================================================

// Function to find a matching route
const findMatchingRoute = (
  path: string,
  routes: RouteConfig[],
): RouteConfig | undefined => {
  for (const route of routes) {
    if (path.startsWith(route.path)) {
      if (route.nestedRoutes) {
        const nestedMatch = findMatchingRoute(
          path.replace(route.path, ""),
          route.nestedRoutes,
        );
        if (nestedMatch) return nestedMatch;
      }
      return route;
    }
  }
  return undefined;
};


export default findMatchingRoute;
