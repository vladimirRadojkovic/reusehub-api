generate:
	docker build -f proto/Dockerfile -t reusehub-genproto:dev .
	rm -rf genproto ts-proto
	mkdir -p genproto ts-proto
	docker run --rm -v "${PWD}:/workspace" \
		reusehub-genproto:dev

# Obriši generisane fajlove
clean:
	rm -rf genproto ts-proto