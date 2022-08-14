#!/bin/bash

NEW_VERSION=$(cat version | awk '{$1=$1;print}')

cd website/pages && blocklet version $NEW_VERSION && git add blocklet.yml && cd ../../
echo "bump platform site to version $NEW_VERSION"

cd website/docs && blocklet version $NEW_VERSION && git add blocklet.yml && cd ../../
echo "bump platform docs to version $NEW_VERSION"

cd developer/pages && blocklet version $NEW_VERSION && git add blocklet.yml && cd ../../
echo "bump developer site to version $NEW_VERSION"

cd developer/docs && blocklet version $NEW_VERSION && git add blocklet.yml && cd ../../
echo "bump developer docs to version $NEW_VERSION"
