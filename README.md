# serverless-boilerplate

Boilerplate for backend using serverless, koa.js, typescript, AWS RDS, etc

## Setup

### Environment setup

1. Install [Node.js](https://nodejs.org/en/download/).

- Ensure that you are using the latest version of node (12.x).

```
$ node --version
v12.xx.xx
```

- Use node version manager ([nvm](https://github.com/nvm-sh/nvm)) if necessary.

2. Install [yarn](https://classic.yarnpkg.com/en/docs/install), a package manager for node.

- Check if yarn is successfully installed.

```
$ yarn --version
1.22.4  // or over
```

3. Install dependencies.

```
$ yarn
```

4. Grant `init.sh` execution permission.

```
// cwd is project root directory
$ chmod 744 ./init.sh
```

5. Execute `init.sh`, with arguments according to your own project.

```
$ ./init.sh -h
init.sh [-h] [-n APP_NAME] -- initialize serverless-boilerplate project with custom settings

where:
    -h    shows this help text
    -n    sets APP_NAME, which is applied to app environment

$ ./init.sh -n APP_NAME
```

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
