# ReuseHub API

A gRPC API service for ReuseHub built with Go.

## Overview

This repository contains Protocol Buffer definitions for ReuseHub microservices and the generated Go code. The API currently includes:

- **User Service**: Manage user accounts
- **Listing Service**: Manage product/item listings

## Directory Structure

```
reusehub-api/
├── genproto/          # Generated Go code from proto files
├── proto/             # Protocol Buffer definitions
│   └── reusehub/
│       ├── user/v1/       # User service definitions
│       └── listing/v1/    # Listing service definitions
└── Makefile           # Build commands
```

## Requirements

- Docker
- Go 1.24+
- Make

## Usage

### Generating Code

To generate Go code from the Protocol Buffer definitions:

```bash
make generate
```

This will:
1. Build a Docker image with the protoc compiler and required plugins
2. Run the container to generate Go code in the `genproto` directory

### Cleaning Generated Files

```bash
make clean
```

## Using the Generated Code

Import the generated packages in your Go code:

```go
import (
    userv1 "github.com/vladimirRadojkovic/reusehub-api/genproto/reusehub/user/v1"
    listingv1 "github.com/vladimirRadojkovic/reusehub-api/genproto/reusehub/listing/v1"
)
```

### Example: Creating a User Service Server

```go
package main

import (
    "context"
    "log"
    "net"
    
    "google.golang.org/grpc"
    userv1 "github.com/vladimirRadojkovic/reusehub-api/genproto/reusehub/user/v1"
)

type userServer struct {
    userv1.UnimplementedUserServiceServer
}

func (s *userServer) GetUser(ctx context.Context, req *userv1.GetUserRequest) (*userv1.GetUserResponse, error) {
    // Implementation
    return &userv1.GetUserResponse{
        User: &userv1.User{
            Id: req.Id,
            FirstName: "John",
            LastName: "Doe",
            Email: "john@example.com",
        },
    }, nil
}

func main() {
    lis, err := net.Listen("tcp", ":50051")
    if err != nil {
        log.Fatalf("failed to listen: %v", err)
    }
    
    grpcServer := grpc.NewServer()
    userv1.RegisterUserServiceServer(grpcServer, &userServer{})
    
    log.Println("Starting gRPC server on :50051")
    if err := grpcServer.Serve(lis); err != nil {
        log.Fatalf("failed to serve: %v", err)
    }
}
```

## Adding New Services

1. Create a new proto file in the appropriate directory under `proto/reusehub/`
2. Define your service, requests, and responses
3. Set the `go_package` option to match the directory structure
4. Run `make generate` to generate the Go code