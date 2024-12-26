import configs from "@/src/config";
import { RoutesConfig } from "@/src/utils/types/interface";
// =============================================================

const ROUTE_PATHS: RoutesConfig = {
    AUTH_SERVICE: {
        path: "/api/v1/auth",
        target: configs.authServiceUrl, // Should be http://localhost:4001
        methods: {
            POST: { authRequired: false, roles: [] },
            DELETE: { authRequired: true, roles: ["admin"] }
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
                methods: { POST: { authRequired: false, roles: ['user', 'admin'] } },
            },
            {
                path: "/logout",
                methods: { POST: { authRequired: false, roles: [] } }
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
                path: "/refresh-token",
                methods: { POST: { authRequired: false, roles: [] } },
            },
            {
                path: "/google-signin",
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
            POST: { authRequired: true, roles: ["admin", "user"] },
            GET: { authRequired: false, roles: [] },
            PUT: { authRequired: true, roles: ["admin", "user"] }
        },
        nestedRoutes: [
            {
                path: "/api-docs",
                methods: { GET: { authRequired: false, roles: [] } },
            },
            {
                path: "/username",
                methods: { GET: { authRequired: false, roles: [] } },
            },
            {
                path: "/me",
                methods: {
                    GET: { authRequired: true, roles: ["user", "admin"] },
                    PUT: { authRequired: true, roles: ["user", "admin"] },
                },
            },
            {
                path: "/my-profile",
                methods: { DELETE: { authRequired: true, roles: ["user", "admin"] } },
            },
            {
                path: "/my-background",
                methods: { DELETE: { authRequired: true, roles: ["user", "admin"] } },
            },
            {
                path: "/favorite",
                methods: { PUT: { authRequired: true, roles: ["user"] } },
            },
            {
                path: "/me/favorites",
                methods: { GET: { authRequired: true, roles: ['user'] } }
            },
            {
                path: "/profile-user",
                methods: { GET: { authRequired: false, roles: [] } }
            },
            { path: "/profile-info", methods: { GET: { authRequired: false, roles: [] } } },
            { path: "/agents", methods: { GET: { authRequired: true, roles: ["admin"] } } },
            { path: "/role", methods: { GET: { authRequired: false, roles: [] } } }
        ],
    },
    PROPERTY_SERVICE: {
        path: "/api/v1/properties",
        target: configs.propertyServiceUrl, // Should be http://localhost:4003
        methods: {
            GET: { authRequired: false, roles: [] },
            POST: { authRequired: true, roles: ["admin", "user"] },
            DELETE: { authRequired: true, roles: ['admin', 'user'] },
            PUT: { authRequired: true, roles: ['admin', 'user'] }
        },
        nestedRoutes: [
            {
                path: "/api-docs",
                methods: { GET: { authRequired: false, roles: [] } },
            },
            {
                path: "/me",
                methods: {
                    GET: { authRequired: true, roles: ["user", 'admin'] },
                    DELETE: { authRequired: true, roles: ['user', 'admin'] },
                    PUT: { authRequired: true, roles: ['user', 'admin'] }
                },
            },
            {
                path: "/get",
                methods: { GET: { authRequired: false, roles: ["user"] } }
            },
            {
                path: "/category",
                methods: { GET: { authRequired: false, roles: [] } }
            },
            { path: "/user", methods: { GET: { authRequired: false, roles: [] } } },
            { path: "/sub", methods: { GET: { authRequired: false, roles: [] } } }
        ],
    },
    CHAT_SERVICE: {
        path: "/api/v1/chat",
        target: configs.chatServiceUrl,
        methods: {
            GET: { authRequired: true, roles: ["admin", "user"] },
            POST: { authRequired: true, roles: ["admin", "user"] },
            // DELETE: { authRequired: true, roles: ['admin', 'user'] },
            PUT: { authRequired: true, roles: ['admin', 'user'] }
        },
        nestedRoutes: [
            {
                path: "/api-docs",
                methods: { GET: { authRequired: false, roles: [] } },
            },
            {
                path: "/send",
                methods: {
                    POST: { authRequired: true, roles: ["admin", "user"] },
                },
            },
            {
                path: "/get-messages",
                methods: {
                    GET: { authRequired: true, roles: ['admin', 'user'] }
                }
            }
        ]
    }
};

export default ROUTE_PATHS;
