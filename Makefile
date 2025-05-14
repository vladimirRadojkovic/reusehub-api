.PHONY: generate clean

# Generate protobuf code
generate:
	docker build -f proto/Dockerfile -t reusehub-genproto:dev .
	rm -rf genproto ts-proto
	mkdir -p genproto ts-proto
	docker run --rm -v "${PWD}:/workspace" reusehub-genproto:dev

# Clean generated files
clean:
	rm -rf genproto ts-proto

install-tools:
	go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
	go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
	npm install -g @bufbuild/protoc-gen-es @bufbuild/protoc-gen-connect-es