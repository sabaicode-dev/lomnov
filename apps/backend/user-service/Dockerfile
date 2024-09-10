# Use a lightweight Node.js image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock files to install dependencies
COPY package.json  ./

# Install all dependencies (including devDependencies)
RUN yarn install

# Copy the rest of the application code and necessary config files
COPY ./src ./src
COPY tsconfig.json nodemon.json tsoa.json ./

# Ensure node_modules/.bin is in the PATH
ENV PATH /app/node_modules/.bin:$PATH

# Expose the port the service will run on
EXPOSE 4002

# Command to run the development server
CMD ["yarn", "dev"]
