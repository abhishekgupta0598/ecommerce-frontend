#!/usr/bin/env bash
gcloud config set project royalbagstore

# build app for production (creates build/ folder)
npm run build
cp app.yaml build
cp .gcloudignore build
cd build

# deploy app to app engine (if first deploy potentially select region)
gcloud app deploy