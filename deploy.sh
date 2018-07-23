#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t taxes .
docker tag taxes pofider/taxes:$TRAVIS_TAG
docker push pofider/taxes

git clone https://github.com/pofider/kubernetes.git
cd kubernetes
chmod +x push.sh
./push.sh "taxes" "pofider/taxes"