FROM node:26-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS build
# VITE_* values are baked into the client bundle at build time
ARG VITE_API_URL=""
ARG VITE_SOCKET_URL=""
ENV VITE_API_URL=$VITE_API_URL VITE_SOCKET_URL=$VITE_SOCKET_URL
COPY . .
RUN npm run build

FROM node:26-alpine AS prod_deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:26-alpine AS runtime
ENV NODE_ENV=production PORT=5173
WORKDIR /app
COPY package.json package-lock.json ./
COPY --from=prod_deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
USER node
EXPOSE 5173
CMD ["npm", "run", "start"]
