FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY client/ ./client/
COPY shared/ ./shared/
COPY attached_assets/ ./attached_assets/
COPY vite.config.ts .
COPY tsconfig.json .
RUN npx vite build
RUN npx vite build

FROM nginx:alpine
COPY --from=build /app/dist/public /usr/share/nginx/html
COPY client/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
