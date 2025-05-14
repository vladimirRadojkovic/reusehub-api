FROM golang:1.24.3-bullseye

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs

# Install buf
RUN curl -sSL \
    "https://github.com/bufbuild/buf/releases/download/v1.28.1/buf-$(uname -s)-$(uname -m)" \
    -o "/usr/local/bin/buf" && \
    chmod +x "/usr/local/bin/buf"

# Install protoc
RUN apt-get update && apt-get install -y protobuf-compiler

# Set Go proxy for public modules
ENV GOPROXY=https://proxy.golang.org,direct

# Install Go protobuf plugins
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@latest \
    && go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

# Install protoc-gen-es and protoc-gen-connect-es with npm
RUN npm install -g @bufbuild/protoc-gen-es @bufbuild/protoc-gen-connect-es && \
    ln -s /usr/local/lib/node_modules/@bufbuild/protoc-gen-es/bin/protoc-gen-es /usr/local/bin/protoc-gen-es && \
    ln -s /usr/local/lib/node_modules/@bufbuild/protoc-gen-connect-es/bin/protoc-gen-connect-es /usr/local/bin/protoc-gen-connect-es

WORKDIR /workspace

# Copy configuration files
COPY buf.yaml buf.gen.yaml ./

# Copy proto files
COPY proto ./proto

# Update dependencies and generate
ENTRYPOINT ["sh", "-c", "buf mod update && buf generate"]
