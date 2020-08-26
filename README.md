# serverless-boilerplate

Boilerplate for backend using serverless, koa.js, typescript, AWS CloudFront, AWS RDS, etc

## Setup

### Environment setup (for developers)

1. **Setup Node.js and node packages.**

- Install [Node.js](https://nodejs.org/en/download/).
  - Use node version manager ([nvm](https://github.com/nvm-sh/nvm)) if necessary.

```
# Ensure that you are using the latest version of node (12.x).
$ node --version
v12.xx.xx
```

- Install [yarn](https://classic.yarnpkg.com/en/docs/install), a package manager for node

```
# Check if yarn is successfully installed.
$ yarn --version
1.22.4  # or over
```

- Install node.js package dependencies.

```
$ yarn
```

2. **Setup PostgreSQL database locally.**

- Local database will be used on development environment, while deployments to `beta`, `rc`, and `release` environments will use AWS RDS. This boilerplate ensures identical configurations will be applied to both local and AWS RDS.

- [Install PostgreSQL locally](https://www.postgresql.org/download/).
  - Ensure that you are installing PostgreSQL of version 12.
  - On ubuntu, you many need to clear any existing `postgresql` packages.

```
# list installed postgresql packages
$ dkpg -l | grep postgres

# remove any installed postgresql packages
$ dpkg -l | grep postgres | cut -d' ' -f3 | xargs sudo apt --purge remove -y

# Create the file repository configuration:
$ sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

# Import the repository signing key:
$ wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# Update the package lists:
$ sudo apt-get update

# Install the PostgreSQL of version 12.
$ sudo apt-get -y install postgresql-12

# Check if postgres is successfully installed.
$ sudo service postgresql restart
$ sudo -u postgres psql
psql (12.4 (Ubuntu 12.4-1.pgdg18.04+1))
Type "help" for help.

postgres=#
```

- You may need to configure PostgreSQL settings, if `FATAL: Peer authentication failed for user` occurs while logging in as user created by `init.sh`.

```
# Open the configuration file:
$ sudo vi /etc/postgresql/12/main/pg_hba.conf

# Then, replace the line

local   all             all                                     peer

# to

local   all             all                                     md5

# Save the file and restart the server.
$ sudo service postgresql restart
```

3. **Execute initialization script.**

- Grant `init.sh` execution permission.

```
# cwd is project root directory
$ chmod 744 ./init.sh
```

- Execute `init.sh`, with arguments according to your own project.

```
$ source ./init.sh -h
init.sh [-h] [-n APP_NAME] [-u USER_SUFFIX] -- initialize serverless-boilerplate project with custom settings

options:
    -h    shows this help text
    -n    sets APP_NAME, which is applied to app environment (default is "serverless-boilerplate")
    -u    sets USER_SUFFIX, which is applied to postgresql role and database name (default is $USER)

$ source ./init.sh -n APP_NAME
```

- This script does several jobs.

  - It fills up several environment variables on `.env.local`.
  - It creates role and database on local PostgreSQL server, with name `$APP_NAME-$USER_SUFFIX`.
  - It sets several environment variables, including `PGDATABASE`, `PGUSER`, etc. So, you may connect to your local database server just using:

```
# This command logs in to local server as role $APP_NAME-$USER_SUFFIX.
$ psql
```

- Use other DB management tools (e.g. pgAdmin, MySQL workbench, etc) using the username and password generated on `.env.local` file.

4. **Check if local server is working.**

```
$ yarn start:local
```

- Database tables (configured at `src/db/config.ts`) are created lazily on first api request to the local server.

### IDE Setup

1. Use Linter.

- If you are using VS Code, install **"ESLint"** package. Then, you are good to go! VS Code will automatically format your code, according to `.vscode/settings.json`.

## Development

### Local development

To run server locally, use:

```
$ yarn start:local
```

The server is executed with environment `APP_STAGE=local`. Since `--respawn` option is enabled for `ts-node-dev`, any changes within `./src` will restart server automatically. `.env.local` file contains configuration for local development. Feel free to adjust some variables (e.g. dev server port, etc)

## Testing

The test environment uses [`mocha`](https://mochajs.org/) and [`chai`](https://www.chaijs.com/).

### Local testing

To test your server locally, run the server:

```
$ yarn start:local
```

Then, at another terminal execute:

```
$ yarn test:local
```

This executes every `*.test.ts` files in `src` directory.

## Deployment (for project managers)

On devops script, configure `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables from your AWS IAM user. The devops IAM user should have `AdministratorAccess` granted to deploy resources.

### Storing parameters and secret keys

Navigate to [AWS SSM](https://ap-northeast-2.console.aws.amazon.com/systems-manager/home) (Systems Manager). We will use SSM to store secret parameters (database master password, jwt signing key, etc). At [Parameter Store](https://ap-northeast-2.console.aws.amazon.com/systems-manager/parameters), create parameters:

- `/${APP_NAME}-${APP_STAGE}/rds_password`
- `/${APP_NAME}-${APP_STAGE}/lambda_rds_password`

You may set any arbitrary string to those parameters. However, you should securely store those parameters and do not distribute on public. (For example, you may need database master password to handle DB migration, etc)

### Database lambda role configuration

After deploying the application, you should create PostgreSQL role that lambda function will use when connecting to database.

Connect to the created database, then execute:

```
CREATE ROLE lambda WITH LOGIN ENCRYPTED PASSWORD '<lambda_rds_password>';
```

This password string should be also stored to AWS SSM parameter store, at `/${APP_NAME}-${APP_STAGE}/lambda_rds_password`.

### Commands

- Beta stage deployment: `$ yarn deploy:beta`
- Beta stgae unmount: `$ yarn remove:beta`

### Database migartion

- **You should execute migration scripts on AWS deployments manually.** The schema configuration at `src/db/config.ts` only updates your local PostgreSQL server.
- Drop old tables on local database to migrate into new schema.
