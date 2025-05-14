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
├── genproto/           # Generated Go code from proto files
├── ts-proto/           # Generated TypeScript code from proto files
├── proto/              # Protocol Buffer definitions
│   └── reusehub/
│       ├── user/v1/        # User service definitions
│       └── listing/v1/     # Listing service definitions
├── buf.yaml            # Buf configuration
├── buf.gen.yaml        # Buf code generation configuration
└── Makefile            # Build commands
```

## Requirements

- Docker
- Make

## Usage

### Generating Code

To generate both Go and TypeScript code from the Protocol Buffer definitions:

```bash
make generate
```

This will:
1. Build a Docker image with buf, protoc, and required plugins
2. Update buf dependencies
3. Generate Go code in the `genproto` directory
4. Generate TypeScript code in the `ts-proto` directory

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

The TypeScript files are generated using `@bufbuild/protoc-gen-es` and `@bufbuild/protoc-gen-connect-es`, which provide modern, type-safe way to call gRPC services from browsers.

### 1. Copy the TypeScript files to your React project

```bash
cp -r ts-proto/proto/* /path/to/react-app/src/api/
```

### 2. Install required dependencies in your React project

```bash
npm install @bufbuild/protobuf @bufbuild/connect @bufbuild/connect-web
```

### 3. Import and use the generated code in React

```tsx
import { createConnectTransport } from "@bufbuild/connect-web";
import { createPromiseClient } from "@bufbuild/connect";
import { UserService } from "./api/proto/reusehub/user/v1/user_connect";
import { useState, useEffect } from "react";

// Set up the transport
const transport = createConnectTransport({
  baseUrl: "http://localhost:8080", // Your API endpoint
});

// Create a client
const client = createPromiseClient(UserService, transport);

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await client.getUser({ id: userId });
        setUser(response.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h1>{user.firstName} {user.lastName}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

## Adding New Services

1. Create a new proto file in the appropriate directory under `proto/reusehub/`
2. Define your service, requests, and responses
3. Set the `go_package` option to match the directory structure
4. Run `make generate` to generate both Go and TypeScript code

## Versioning

The API uses semantic versioning. The current version is found in the git tags.