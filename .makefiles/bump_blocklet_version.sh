#!/bin/bash

NEW_VERSION=$(cat version | awk '{$1=$1;print}')

cd website/pages && blocklet version $NEW_VERSION && git add blocklet.yml && cd ../../
echo "bump blocklet developer site to version $NEW_VERSION"

cd developer/docs && blocklet version $NEW_VERSION && git add blocklet.yml && cd ../../
echo "bump blocklet production site to version $NEW_VERSION"
