FROM nginx:1.23.3-alpine

COPY infra/docker/nginx/prod/web.conf /etc/nginx/conf.d/default.conf
