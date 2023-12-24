FROM registry.access.redhat.com/ubi9 AS ubi-micro-build

RUN mkdir -p /mnt/rootfs
RUN dnf install --installroot /mnt/rootfs curl --releasever 9 --setopt install_weak_deps=false --nodocs -y && \
    dnf --installroot /mnt/rootfs clean all && \
    rpm --root /mnt/rootfs -e --nodeps setup

FROM quay.io/keycloak/keycloak:23.0.1

COPY --from=ubi-micro-build /mnt/rootfs /

ARG db_vendor
ARG db_addr
ARG db_user
ARG db_password0
ARG db_database
ARG keycloak_admin
ARG keycloak_admin_password

ENV DB_VENDOR=${db_vendor}
ENV DB_ADDR=${db_addr}
ENV DB_USER=${db_user}
ENV DB_PASSWORD=${db_password}
ENV DB_DATABASE=${db_database}
ENV KEYCLOAK_ADMIN=${keycloak_admin}
ENV KEYCLOAK_ADMIN_PASSWORD=${keycloak_admin_password}
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

EXPOSE 8080
