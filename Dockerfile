FROM node:14-alpine as build

WORKDIR "/app"
ENV PATH /app/node_modules/.bin:$PATH

COPY ./package*.json ./
RUN npm install --silent

COPY . ./

ARG REACT_APP_HOST_URL
ARG REACT_APP_IMAGES_URL
ARG REACT_APP_SOCKET_HOST
ENV REACT_APP_HOST_URL=$REACT_APP_HOST_URL \
    REACT_APP_IMAGES_URL=$REACT_APP_IMAGES_URL \
    REACT_APP_SOCKET_HOST=$REACT_APP_SOCKET_HOST

RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]