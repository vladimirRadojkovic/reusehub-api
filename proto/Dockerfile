FROM golang:1.24.3-bullseye

ENV PATH /workspace/node_modules/.bin:$PATH
ENV NODE_VERSION=22.0.0

WORKDIR /workspace

RUN apt-get update && \
    apt-get install -y bzip2 xz-utils unzip

# Install protoc
RUN curl -LO https://github.com/protocolbuffers/protobuf/releases/download/v26.1/protoc-26.1-linux-x86_64.zip && \
    unzip protoc-26.1-linux-x86_64.zip -d /usr/local

# Install buf
RUN curl -o /usr/local/bin/buf -LO https://github.com/bufbuild/buf/releases/download/v1.30.1/buf-Linux-x86_64 && \
    chmod +x /usr/local/bin/buf

# Install Go protoc plugins
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.33.0 && \
    go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.3.0

# Setup Node.js
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use $NODE_VERSION && nvm alias default $NODE_VERSION
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Install TypeScript plugins
RUN npm install -g @bufbuild/protoc-gen-es @bufbuild/protoc-gen-connect-es

# Create package.json with exact dependencies
RUN echo '{\
  "dependencies": {\
    "@bufbuild/protobuf": "^1.4.2",\
    "@bufbuild/connect": "^0.13.0",\
    "@bufbuild/connect-web": "^0.13.0"\
  }\
}' > package.json && npm install

ENTRYPOINT ["sh", "-c", "buf mod update && buf generate --include-imports"]
