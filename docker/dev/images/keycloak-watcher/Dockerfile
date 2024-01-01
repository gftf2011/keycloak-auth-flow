FROM ubuntu:23.04

COPY ./scripts/dev/keycloak/init.sh .
COPY ./scripts/dev/keycloak/config/realm.json .

RUN apt-get -y update && apt-get -y install curl jq

RUN chmod +x init.sh

CMD ["sh", "init.sh"]
