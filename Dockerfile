FROM node:24-alpine AS base

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["npm", "run", "dev"]

# ==================================
# Build tools
# ==================================

FROM base AS build

ARG USERID=1000
ARG GROUPID=1000

RUN apk add \
	bash \
	docker \
	git \
	&& mkdir -p /var/npm \
	&& addgroup -g ${GROUPID} -S appgroup || true \
	&& adduser -u ${USERID} -S -G appgroup appuser || true \
	&& chown -R ${USERID}:${GROUPID} /var/npm

# Configure npm
RUN npm config set --global cache /var/npm \
	&& npm config set --global prefer-offline true \
	&& npm config set --global loglevel info

# ==================================
# CI cache
# ==================================

FROM build AS ci-cache

COPY . /opt/hindsight

RUN npm install

# ==================================
# CI
# ==================================

FROM build AS ci

COPY --from=ci-cache /var/npm /var/npm

# ==================================
# Local development stage
# ==================================

FROM build AS local

# ==================================
# Production web
# ==================================

FROM base AS production

COPY . /app

CMD ["npm", "run", "start"]

