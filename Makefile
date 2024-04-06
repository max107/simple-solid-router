.PHONY: *

tag: create-tag push-tag

create-tag:
	git tag $(shell cat package.json | jq -r .version)

push-tag:
	git push origin $(shell cat package.json | jq -r .version)
