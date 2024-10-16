# Use an official Node.js image
FROM node:18-alpine

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the app's port (matching the one in index.js)
EXPOSE 3001

# Command to run the application
CMD ["npm", "start"]
