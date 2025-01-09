import configs from "../config";

const corsOptions = {
  origin: [
    configs.clientUrl,
    configs.CLIENT_DASHBOARD_URL
  ],
  credentials: true, // Allow credentials (cookies, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed HTTP methods
};

export default corsOptions;
