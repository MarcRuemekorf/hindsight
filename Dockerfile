FROM node:22-alpine AS base

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["npm", "run", "dev"]

# ==================================
# Build tools
# ==================================

FROM base AS build

RUN apk add \
	bash \
	docker \
	git \
	&& mkdir -p /var/npm \
	&& chown -R node:node /var/npm

# Configure npm
RUN npm config set --global cache /var/npm \
	&& npm config set --global prefer-offline true \
	&& npm config set --global loglevel info

# ==================================
# Local development stage
# ==================================

FROM build AS local

# Fix ownership of /app directory for node user
RUN chown -R node:node /app

# Install dependencies (will be cached unless package.json changes)
COPY --chown=node:node package.json package-lock.json* ./

USER node

RUN npm install

# Source code will be mounted via volume for hot reloading

# ==================================
# Production web
# ==================================

FROM base AS production

COPY . /app

CMD ["npm", "run", "start"]
