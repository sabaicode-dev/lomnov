import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

type Config = {
  env: string;
  port: number;
  mongodbUrl: string;
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
  awsRegion: string;
  awsS3BucketName: string
  userPoolId: string;
  cognitoAppCientId: string
};

// Function to load and validate environment variables
function loadConfig(): Config {
  // Determine the environment and set the appropriate .env file
  const env = process.env.NODE_ENV || 'development';
  const envPath = path.resolve(__dirname, `./configs/.env.${env}`);
  dotenv.config({ path: envPath });

  // Define a schema for the environment variables
  const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string().required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required(),
    AWS_ACCESS_KEY_ID: Joi.string().required(),
    AWS_SECRET_ACCESS_KEY: Joi.string().required(),
    AWS_REGION: Joi.string().required(),
    AWS_S3_BUCKET_NAME: Joi.string().required(),
    USER_POOL_ID: Joi.string().required(),
    COGNITO_APP_CIENTID: Joi.string().required()

  }).unknown().required();

  // Validate the environment variables
  const { value: envVars, error } = envVarsSchema.validate(process.env);
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongodbUrl: envVars.MONGODB_URL,
    awsAccessKeyId: envVars.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
    awsRegion: envVars.AWS_REGION,
    awsS3BucketName: envVars.AWS_S3_BUCKET_NAME,
    userPoolId: envVars.USER_POOL_ID,
    cognitoAppCientId: envVars.COGNITO_APP_CIENTID
  };
}

// Export the loaded configuration
const configs = loadConfig();
export default configs;
