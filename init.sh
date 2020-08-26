#!/bin/bash

APP_NAME=serverless-boilerplate
USER_SUFFIX=$USER
LOCAL_ENV_FILE=.env.local
SERVERLESS_CONFIG_FILE=serverless.yml

USAGE="$(basename "$0") [-h] [-n APP_NAME] [-u USER_SUFFIX] -- initialize serverless-boilerplate project with custom settings

options:
    -h    shows this help text
    -n    sets APP_NAME, which is applied to app environment (default is \"serverless-boilerplate\")
    -u    sets USER_SUFFIX, which is applied to postgresql role and database name (default is \$USER)
"

while getopts :hn: opt
do
  case ${opt} in
    h) echo "$USAGE"
      exit
      ;;
    n) APP_NAME="$OPTARG" ;;
    u) USER_SUFFIX="$OPTARG" ;;
    \?) printf "illegal option: -%s\n" "$OPTARG" >&2
      echo "$USAGE" >&2
      exit 1
      ;;
  esac
done

# Update APP_NAME on local environment configuration file.

sed -i "/APP_NAME/c\APP_NAME=$APP_NAME" $LOCAL_ENV_FILE
sed -i "/name: serverless-boilerplate/c\  name: $APP_NAME" $SERVERLESS_CONFIG_FILE

echo ""
echo "APP_NAME: $APP_NAME"
echo ""

# Configure postgresql roles and create database.

DB_NAME="$APP_NAME-$USER_SUFFIX"
DB_PASSWORD="$(openssl rand -base64 12)"

echo ""
echo "Creating role and database for local postgresql server ..."
echo ""

sudo -u postgres createuser $DB_NAME -s
sudo -u postgres createdb $DB_NAME
sudo -u postgres psql -U postgres -d postgres -c "ALTER USER \"$DB_NAME\" WITH PASSWORD '$DB_PASSWORD';"

printf "\nDB_HOST=localhost" >> $LOCAL_ENV_FILE
printf "\nDB_USER=$DB_NAME" >> $LOCAL_ENV_FILE
printf "\nDB_NAME=$DB_NAME" >> $LOCAL_ENV_FILE
printf "\nDB_PASSWORD=$DB_PASSWORD" >> $LOCAL_ENV_FILE

export PGDATABASE=$DB_NAME
export PGUSER=$DB_NAME
export PGPASSWORD=$DB_PASSWORD

echo ""
echo "Database and role \"$DB_NAME\" is created."
echo ""
