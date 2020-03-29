FROM nginx:alpine
COPY  /dist/dir-frontend /usr/share/nginx/html
EXPOSE 80
ADD nginx.conf /etc/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
