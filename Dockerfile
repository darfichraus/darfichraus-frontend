FROM nginx:alpine
COPY  /dist/dir-frontend /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
