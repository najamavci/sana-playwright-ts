# Playwright base image includes Node.js, browsers  and system deps
FROM mcr.microsoft.com/playwright:v1.58.2-jammy

WORKDIR /app

# Install deps
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the project
COPY . .

# (Optional)
RUN npx playwright install --with-deps

ENV CI=1
ENV NODE_ENV=test

# Default command:
CMD ["npm", "run", "test:bdd"]
