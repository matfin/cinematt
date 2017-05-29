FROM		alpine:latest
MAINTAINER	Matt Finucane <me@mattfinucane.com>

ARG			hugo_version
RUN			rm -rf /opt/public

RUN 		apk add --update wget ca-certificates && \
		    cd /tmp/ && \
		    wget https://github.com/spf13/hugo/releases/download/v${hugo_version}/hugo_${hugo_version}_Linux-64bit.tar.gz && \
		    tar xzf hugo_${hugo_version}_Linux-64bit.tar.gz && \
		    rm -r hugo_${hugo_version}_Linux-64bit.tar.gz && \
		    mv hugo*/hugo* /usr/bin/hugo && \
		    apk del wget ca-certificates && \
		    rm /var/cache/apk/*

WORKDIR		/opt