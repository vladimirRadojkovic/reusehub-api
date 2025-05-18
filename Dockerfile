FROM golang:1.24 AS go-builder

RUN apt-get update && apt-get install -y git

RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@latest && \
    go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest && \
    go install github.com/bufbuild/connect-go/cmd/protoc-gen-connect-go@latest

FROM node:22-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    git \
    bash \
    && rm -rf /var/lib/apt/lists/*

# Kopiraj go plugin-e iz prethodnog stage-a u /usr/local/bin
COPY --from=go-builder /go/bin/protoc-gen-go /usr/local/bin/
COPY --from=go-builder /go/bin/protoc-gen-go-grpc /usr/local/bin/
COPY --from=go-builder /go/bin/protoc-gen-connect-go /usr/local/bin/

# Install protoc
RUN curl -OL https://github.com/protocolbuffers/protobuf/releases/download/v26.1/protoc-26.1-linux-x86_64.zip && \
    unzip protoc-26.1-linux-x86_64.zip -d /usr/local && \
    rm protoc-26.1-linux-x86_64.zip

# Install buf
RUN curl -sSL https://github.com/bufbuild/buf/releases/download/v1.32.1/buf-Linux-x86_64 -o /usr/local/bin/buf && \
    chmod +x /usr/local/bin/buf

# Instaliraj TypeScript plugin za protoc
RUN npm install -g @bufbuild/protoc-gen-es @bufbuild/protoc-gen-connect-es

# Install protoc-gen-grpc-web binary
RUN curl -sSL https://github.com/grpc/grpc-web/releases/download/1.5.3/protoc-gen-grpc-web-1.5.3-linux-x86_64 \
    -o /usr/local/bin/protoc-gen-grpc-web && \
    chmod +x /usr/local/bin/protoc-gen-grpc-web

# PATH za protokol buffer plugine
ENV PATH="/usr/local/bin:$PATH"

# Radni direktorijum za montiranje proto fajlova
WORKDIR /workspace

CMD ["buf", "generate"]