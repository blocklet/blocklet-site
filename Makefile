TOP_DIR=.
README=$(TOP_DIR)/README.md

VERSION=$(strip $(shell cat version))

build:
	@echo "Building the software..."
	@lerna bootstrap -- --ignore-engines
	@cd core/client && npm run build
	@cd core/ux && npm run build
	@cd core/webapp && npm run build:client
	@cd core/webapp && npm run build:daemon
	@cd core/blocklet-services && npm run build
	@echo "Local Blocklet Server and services are successfully built..."

build-debug:
	@echo "Building the software..."
	@lerna bootstrap -- --ignore-engines
	@cd core/client && npm run build
	@cd core/ux && npm run build
	@cd core/webapp && npm run build:client
	@cd core/webapp && npm run build-daemon-debug
	@echo "Local DEBUG Blocklet Server is successfully built..."

init: install dep
	@echo "Initializing the repo..."

travis-init: install dep
	@echo "Initialize software required for travis (normally ubuntu software)"

github-init:
	@echo "Initialize software required for github (normally ubuntu software)"
	@sudo npm install -g @blocklet/cli
  # don't need install lerna and yarn in github-action machine: https://github.com/actions/virtual-environments/blob/main/images/linux/Ubuntu2004-README.md
  # @sudo npm install -g lerna yarn
	@make dep

travis-nginx:
	@bash ./tools/setup-nginx-on-travis.sh

install:
	@echo "Install software required for this repo..."
	@npm install -g lerna yarn

dep:
	@echo "Install dependencies required for this repo..."
	@lerna clean -y
	@yarn install --ignore-engines

test:
	@echo "Running test suites..."
	@npm run test

coverage:
	@echo "Running test suites and collecting coverage..."
	@cd core/client && npm run build
	@npm run coverage

test-in-docker:
	@echo "Running test in docker..."
	@bash tools/test-in-docker.sh

doc:
	@echo "Building the documenation..."

lint:
	@echo "Building the documenation..."
	@npm run lint

clean:
	@echo "Cleaning the build..."

run:
	@echo "Running the software..."

include .makefiles/*.mk

.PHONY: build init travis-init install dep pre-build post-build all test doc travis clean run bump-version create-pr
