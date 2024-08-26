import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

type Config = {
  port: number;
  mongodbUrl: string;
  cognitoAppCientId: string;
  cognitoAppCientSecret: string;
  cognitoAppDomain: string;
  redirect_uri: string;
  awsRegion: string;
  userPoolId: string;
  redirectToFrontend: string
};

// Function to load and validate environment variables
function loadConfig(): Config {
  // Determine the environment and set the appropriate .env file
  const env = process.env.NODE_ENV || "development";
  const envPath = path.resolve(__dirname, `./configs/.env.${env}`);
  dotenv.config({ path: envPath });

  // Define a schema for the environment variables
  const envVarsSchema = Joi.object({

    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required(),
    COGNITO_APP_CIENTID: Joi.string().required(),
    COGNITO_APP_CIENTSECRET: Joi.string().required(),
    REDIRECT_URI: Joi.string().required(),
    COGNITO_APP_DOMAIN: Joi.string().required(),
    AWSREGION: Joi.string().required(),
    USER_POOL_ID: Joi.string().required(),
    REDIRECT_TO_FRONTEND: Joi.string().required()
  })
    .unknown()
    .required();

  // Validate the environment variables
  const { value: envVars, error } = envVarsSchema.validate(process.env);
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return {

    port: envVars.PORT,
    mongodbUrl: envVars.MONGODB_URL,
    cognitoAppCientId: envVars.COGNITO_APP_CIENTID,
    cognitoAppCientSecret: envVars.COGNITO_APP_CIENTSECRET,
    cognitoAppDomain: envVars.COGNITO_APP_DOMAIN,
    redirect_uri: envVars.REDIRECT_URI,
    awsRegion: envVars.AWSREGION,
    userPoolId: envVars.USER_POOL_ID,
    redirectToFrontend: envVars.REDIRECT_TO_FRONTEND
  };
}

// Export the loaded configuration
const configs = loadConfig();
export default configs;
