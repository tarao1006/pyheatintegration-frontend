#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# navigate into the build output directory
cd dist

git init
git branch -M main
git add -A
git commit -m 'deploy'

git push -f git@github.com:tarao1006/pyheatintegration-frontend.git main:gh-pages

cd -