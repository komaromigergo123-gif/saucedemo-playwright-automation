FROM mcr.microsoft.com/playwright:v1.56.1-noble

WORKDIR /app

# Copy package descriptors and install dependencies
COPY package*.json ./
RUN npm ci

# Copy test suite source code and configurations
COPY . .

# Set default CI environment variables
ENV CI=true
ENV BASE_URL=https://www.saucedemo.com

# Default command runs the standard Chromium test suite
CMD ["npm", "test"]
