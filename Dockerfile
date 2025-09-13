###################
# BUILD FOR LOCAL DEVELOPMENT
###################

ARG TAG_VERSION=20.9.0-alpine3.18

FROM node:${TAG_VERSION} AS dev

# Use the node user from the image (instead of the root user)
USER node

# Create directory and move to it
WORKDIR /app

# Copy package(-lock) and install dependencies
# chown for correct permissions
COPY --chown=node:node package*.json .
RUN npm ci

# Copy the code in a separate instruction (leverage docker's cache)
COPY --chown=node:node . .

# Tell the Dockerfile's user which port to use (no consequence)
EXPOSE 3000

###################
# BUILD FOR PRODUCTION
###################

FROM node:${TAG_VERSION} AS build

WORKDIR /app

COPY --chown=node:node package*.json ./

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=dev /app/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:${TAG_VERSION} AS prod

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

ENV NODE_ENV production

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
