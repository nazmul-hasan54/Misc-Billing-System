FROM nginx:1.22.0-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist /usr/share/nginx/html