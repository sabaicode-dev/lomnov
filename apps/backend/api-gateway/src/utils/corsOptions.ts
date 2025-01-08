import configs from "../config";

const corsOptions = {
  origin: [
    configs.clientUrl, // Ensure this is a valid URL, e.g., "http://localhost:3000"
    configs.CLIENT_DASHBOARD_URL // Explicitly specify the full URL
  ],
  credentials: true, // Allow credentials (cookies, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed HTTP methods
};

export default corsOptions;
