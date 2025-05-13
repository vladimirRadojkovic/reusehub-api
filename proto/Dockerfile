FROM golang:1.24.3

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
    go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.3.0 && \
    go install go.einride.tech/aip/cmd/protoc-gen-go-aip@v0.67.1

# Add Go bin to PATH
ENV PATH="/go/bin:${PATH}"

# The CMD that will be run when the container starts
CMD ["protoc", "--proto_path=.", "--go_out=.", "--go-grpc_out=.", "proto/reusehub/user/v1/user.proto", "proto/reusehub/listing/v1/listing.proto"]
