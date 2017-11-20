FROM nginx:1.13.6

ENV FLOW_WEB_DIR=/var/www/flow-web
ENV FLOW_WEB_LOG=/var/log/nginx


RUN mkdir -p $FLOW_WEB_DIR \
	&& mkdir -p $FLOW_WEB_LOG

COPY ./docker-build/nginx.conf /etc/nginx/conf.d
COPY ./docker-build/init.sh $FLOW_WEB_DIR/flow-web-init.sh



COPY ./dist $FLOW_WEB_DIR

CMD bash $FLOW_WEB_DIR/flow-web-init.sh && nginx -g 'daemon off;'