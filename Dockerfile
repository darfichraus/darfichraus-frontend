FROM nginx:alpine
COPY  /dist/dir-frontend /usr/share/nginx/html
EXPOSE 80
ADD nginx.route.conf /etc/conf.d/route.conf

CMD ["nginx", "-g", "daemon off;"]
