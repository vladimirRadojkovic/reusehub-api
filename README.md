# ReuseHub API

A gRPC API service for ReuseHub built with Go, with TypeScript client support.

## Overview

This repository contains Protocol Buffer definitions for ReuseHub microservices and the generated code:
- Go code for server implementations
- TypeScript code for client applications

The API currently includes:

- **User Service**: Manage user accounts
- **Listing Service**: Manage product/item listings

## Directory Structure

```
reusehub-api/
├── genproto/          # Generated Go code from proto files
├── ts-proto/          # Generated TypeScript code from proto files
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

To generate both Go and TypeScript code from the Protocol Buffer definitions:

```bash
make generate
```

This will:
1. Build a Docker image with the protoc compiler and required plugins
2. Run the container to generate Go code in the `genproto` directory
3. Generate TypeScript code in the `ts-proto` directory

### Cleaning Generated Files

```bash
make clean
```

## Using the Generated Go Code

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

## Using the Generated TypeScript Code

The TypeScript files can be used in frontend applications:

### 1. Copy the TypeScript files to your project

```bash
cp -r ts-proto/proto/* /path/to/frontend/src/api/
```

### 2. Install required dependencies in your frontend project

```bash
npm install @grpc/grpc-js @grpc/proto-loader
```

### 3. Import and use the generated code

```typescript
import { UserServiceClient } from './api/reusehub/user/v1/user';
import { GrpcTransport } from '@protobuf-ts/grpc-transport';

// Create a client
const transport = new GrpcTransport({
  host: "localhost:50051",
});
const client = new UserServiceClient(transport);

// Call methods
async function getUser(id: string) {
  const response = await client.getUser({ id });
  console.log(response.user);
}

getUser("user-123");
```

## Adding New Services

1. Create a new proto file in the appropriate directory under `proto/reusehub/`
2. Define your service, requests, and responses
3. Set the `go_package` option to match the directory structure
4. Run `make generate` to generate both Go and TypeScript code