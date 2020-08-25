#!/bin/bash

APP_NAME=serverless-boilerplate
LOCAL_ENV_FILE=.env.local

USAGE="$(basename "$0") [-h] [-n APP_NAME] -- initialize serverless-boilerplate project with custom settings

options:
    -h    shows this help text
    -n    sets APP_NAME, which is applied to app environment
"

while getopts :hn: opt
do
  case ${opt} in
    h) echo "$USAGE"
      exit
      ;;
    n) APP_NAME="$OPTARG" ;;
    \?) printf "illegal option: -%s\n" "$OPTARG" >&2
      echo "$USAGE" >&2
      exit 1
      ;;
  esac
done

sed -i "/APP_NAME/c\APP_NAME=$APP_NAME" ./$LOCAL_ENV_FILE

echo "APP_NAME: $APP_NAME"
