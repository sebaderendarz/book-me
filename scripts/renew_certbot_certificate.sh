#!/bin/sh
set -e

# USE CASE: renew certbot certificate stored in the docker volume by running a command in the docker container

cd /home/ec2-user/book-me
/usr/local/bin/docker-compose -f docker-compose.prod.yml run --rm certbot certbot renew
