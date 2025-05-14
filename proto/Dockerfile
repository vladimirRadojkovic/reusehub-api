FROM node:18-bullseye AS node-base

# Install TypeScript protobuf plugins
RUN npm install -g @bufbuild/protoc-gen-es @bufbuild/protoc-gen-connect-es @bufbuild/protobuf @bufbuild/connect @bufbuild/connect-web

FROM golang:1.24.3

WORKDIR /workspace

# Copy npm and node from node image
COPY --from=node-base /usr/local/bin/node /usr/local/bin/node
COPY --from=node-base /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node-base /usr/local/bin/npm /usr/local/bin/npm
# Create symlinks for node modules
RUN ln -s /usr/local/lib/node_modules/@bufbuild/protoc-gen-es/bin/protoc-gen-es /usr/local/bin/protoc-gen-es
RUN ln -s /usr/local/lib/node_modules/@bufbuild/protoc-gen-connect-es/bin/protoc-gen-connect-es /usr/local/bin/protoc-gen-connect-es

RUN apt-get update && \
    apt-get install -y bzip2 xz-utils unzip

# Install protoc
RUN curl -LO https://github.com/protocolbuffers/protobuf/releases/download/v26.1/protoc-26.1-linux-x86_64.zip && \
    unzip protoc-26.1-linux-x86_64.zip -d /usr/local && \
    rm protoc-26.1-linux-x86_64.zip

# Install Go protoc plugins
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.33.0 && \
    go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.3.0

# Add Go bin to PATH
ENV PATH="/go/bin:${PATH}"

# Generate both Go and TypeScript code
CMD set -ex && \
    # Generate Go code
    protoc --proto_path=. \
        --go_out=. \
        --go-grpc_out=. \
        proto/reusehub/user/v1/user.proto \
        proto/reusehub/listing/v1/listing.proto && \
    # Generate TypeScript code
    mkdir -p ts-proto && \
    protoc --proto_path=. \
        --es_out=ts-proto \
        --es_opt=target=ts \
        --connect-es_out=ts-proto \
        --connect-es_opt=target=ts \
        proto/reusehub/user/v1/user.proto \
        proto/reusehub/listing/v1/listing.proto
