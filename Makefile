.PHONY: *

tag:
	git tag $(shell cat package.json | jq -r .version)
