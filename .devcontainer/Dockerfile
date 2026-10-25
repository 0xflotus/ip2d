FROM fedora:43

ARG NODE_VERSION=24.22.1

RUN dnf install -y ca-certificates curl xz tar \
    && dnf clean all

RUN curl -fsSLO "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz" \
    && tar -xJf "node-v${NODE_VERSION}-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
    && rm "node-v${NODE_VERSION}-linux-x64.tar.xz" \
    && node --version \
    && npm --version

WORKDIR /workspace
