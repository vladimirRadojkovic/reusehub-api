# Generate protobuf code
generate:
	docker build --platform=linux/amd64 -f proto/Dockerfile -t reusehub-genproto:dev .
	rm -rf genproto/*
	mkdir -p genproto
	docker run --platform=linux/amd64 --rm -v "${PWD}:/workspace" reusehub-genproto:dev

# Clean generated files
clean:
	rm -rf genproto/*