import configs from "@/src/config";
import { RoutesConfig } from "@/src/utils/types/interface";
// =============================================================

const ROUTE_PATHS: RoutesConfig = {
  AUTH_SERVICE: {
    path: "/api/v1/auth",
    target: configs.authServiceUrl, // Should be http://localhost:4001
    methods: {
      GET: { authRequired: false, roles: [] },
      POST: { authRequired: false, roles: [] },
    },
    nestedRoutes: [
      {
        path: "/api-docs",
        methods: { GET: { authRequired: false, roles: [] } },
      },
      {
        path: "/signup",
        methods: { POST: { authRequired: false, roles: [] } },
      },
      {
        path: "/signin",
        methods: { POST: { authRequired: false, roles: [] } },
      },
      {
        path: "/verify",
        methods: { POST: { authRequired: false, roles: [] } },
      },
      {
        path: "/password-reset",
        methods: { POST: { authRequired: false, roles: [] } },
      },
      {
        path: "/confirm-password",
        methods: { POST: { authRequired: false, roles: [] } },
      },
      {
        path: "/google-sign-in",
        methods: { GET: { authRequired: false, roles: [] } },
      },
      {
        path: "/facebook-sign-in",
        methods: { GET: { authRequired: false, roles: [] } },
      },
      {
        path: "/callback",
        methods: { GET: { authRequired: false, roles: [] } },
      },
    ],
  },
  USER_SERVICE: {
    path: "/api/v1/users",
    target: configs.userServiceUrl, // Should be http://localhost:4002
    methods: {
      GET: { authRequired: false, roles: [] },
      POST: { authRequired: true, roles: ["user"] },
    },
    nestedRoutes: [
      {
        path: "/api-docs",
        methods: { GET: { authRequired: false, roles: [] } },
      },
      {
        path: "/me",
        methods: {
          GET: { authRequired: true, roles: ["user"] },
          PUT: { authRequired: true, roles: ["user"] },
        },
      },
      {
        path: "/username",
        methods: { GET: { authRequired: false, roles: [] } },
      },
      {
        path: "/my-profile",
        methods: { DELETE: { authRequired: false, roles: [] } },
      },
      {
        path: "/my-background",
        methods: { POST: { authRequired: false, roles: [] } },
      },
      {
        path: "/fovorite",
        methods: { PUT: { authRequired: false, roles: [] } },
      },
    ],
  },
  PROPERTY_SERVICE: {
    path: "/api/v1/properties",
    target: configs.propertyServiceUrl, // Should be http://localhost:4003
    methods: {
      GET: { authRequired: false, roles: [] },
      POST: { authRequired: true, roles: ["admin"] },
    },
    nestedRoutes: [
      {
        path: "/api-docs",
        methods: { GET: { authRequired: false, roles: [] } },
      },
      {
        path: "/signup",
        methods: { POST: { authRequired: false, roles: [] } },
      },
      {
        path: "/signin",
        methods: { POST: { authRequired: false, roles: [] } },
      },
      {
        path: "/verify",
        methods: { POST: { authRequired: false, roles: [] } },
      },
      {
        path: "/password-reset",
        methods: { POST: { authRequired: false, roles: [] } },
      },
      {
        path: "/confirm-password",
        methods: { POST: { authRequired: false, roles: [] } },
      },
      {
        path: "/google-sign-in",
        methods: { GET: { authRequired: false, roles: [] } },
      },
      {
        path: "/facebook-sign-in",
        methods: { GET: { authRequired: false, roles: [] } },
      },
      {
        path: "/callback",
        methods: { GET: { authRequired: false, roles: [] } },
      },
    ],
  },
};

export default ROUTE_PATHS;
