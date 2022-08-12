#!/bin/bash

NEW_VERSION=$(cat version | awk '{$1=$1;print}')

cd website/blocklet-developer && blocklet version $NEW_VERSION && git add blocklet.yml && cd ../../
echo "bump blocklet server launcher to version $NEW_VERSION"

cd website/blocklet-product && blocklet version $NEW_VERSION && git add blocklet.yml && cd ../../
echo "bump blocklet launcher to version $NEW_VERSION"
