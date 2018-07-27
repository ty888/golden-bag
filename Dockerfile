FROM node:8-alpine as builder
COPY . /code
RUN cd /code && npm install --registry=https://registry.npm.taobao.org \
    && npm run build


FROM nginx:1.13-alpine
COPY --from=builder /code/dist /var/www
CMD ["nginx", "-g", "daemon off;"]