import configs from "./config";
export interface RouteConfig {
  path: string;
  target?: string;
  methods?: {
    [method: string]: {
      authRequired: boolean;
      roles: string[];
    };
  };
  nestedRoutes?: RouteConfig[];
}

export interface RoutesConfig {
  [route: string]: RouteConfig;
}

export const ROUTE_PATHS: RoutesConfig = {
  AUTH_SERVICE: {
    path: "/api/v1/auth",
    target: configs.authServiceUrl,
    nestedRoutes: [
      {
        path: "/api/v1/signup",
        methods: { POST: { authRequired: false, roles: [] } },
      },
      {
        path: "/api/v1/signin",
        methods: { POST: { authRequired: false, roles: [] } },
      },
      {
        path: "api/v1/auth/verify",
        methods: { POST: { authRequired: false, roles: [] } },
      },
      {
        path: "api/v1/auth/password-reset",
        methods: { POST: { authRequired: false, roles: [] } },
      },
      {
        path: "api/v1/auth/confirm-password",
        methods: { POST: { authRequired: false, roles: [] } },
      },
      {
        path: "api/v1/auth/google-sign-in",
        methods: { GET: { authRequired: false, roles: [] } },
      },
      {
        path: "api/v1/auth/facebook-sign-in",
        methods: { GET: { authRequired: false, roles: [] } },
      },
      {
        path: "api/v1/auth/callback",
        methods: { GET: { authRequired: false, roles: [] } },
      },
    ],
    // nestedRoutes: [
    //   // These routes should match the paths used by your auth service
    //   { path: "/signup" },
    //   { path: "/signin" },
    //   { path: "/verify" },
    //   { path: "/google-sign-in" },
    //   { path: "/facebook-sign-in" },
    //   { path: "/callback"},
    // ],
  },
  USER_SERVICE: {
    path: "/api/v1/users",
    target: configs.userServiceUrl,
    methods: {
      GET: {
        authRequired: true,
        roles: ["user", "admin", "us-east-1_fTc7QxyqZ_Google"],
      },
      POST: { authRequired: true, roles: ["user"] },
    },
  },
  PRODUCT_SERVICE: {
    path: "/api/v1/products",
    target: configs.productServiceUrl,
    methods: {
      GET: { authRequired: false, roles: [] },
      POST: { authRequired: true, roles: ["admin"] },
    },
  },
};
