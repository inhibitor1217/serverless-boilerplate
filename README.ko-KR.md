# serverless-boilerplate

Serverless, koa.js, typescript, AWS Cloudformation, AWS RDS 등을 사용하는 백엔드 서비스 템플릿

## 설정

### 개발자 환경 설정

1. **Node.js와 Node.js 패키지를 설치합니다.**

- [Node.js](https://nodejs.org/en/download/)를 설치합니다.
  - 필요한 경우 node version manager ([nvm](https://github.com/nvm-sh/nvm))를 이용하세요.

```
# Node.js 최신 버전(12.x)을 사용하고 있는지 확인하세요.
$ node --version
v12.xx.xx
```

- Node.js 패키지 관리를 위해 [yarn](https://classic.yarnpkg.com/en/docs/install)을 설치하세요.

```
# yarn이 설치되었는지 확인하세요.
$ yarn --version
1.22.4  # or over
```

- 필요한 Node.js 패키지들을 설치하세요.

```
$ yarn
```

2. **로컬 기기에 PostgreSQL 데이터베이스를 설치합니다.**

- 로컬 데이터베이스는 개발 환경에서 사용됩니다. (개발 중에는 로컬 서버가 로컬 기기의 데이터베이스에 접속합니다.) 해당 데이터베이스는 다른 개발자로부터 분리되어 있기 때문에 자유롭게 작업할 수 있습니다. 배포 환경 (`beta`, `release` 스테이지)의 경우 AWS RDS를 사용합니다.

- [PostgreSQL을 설치하세요.](https://www.postgresql.org/download/)
  - 버전 12를 설치해야 합니다.
  - Ubuntu에서는 PostgreSQL이 기본적으로 설치되어 있기 때문에, 다른 버전이 설치되어 있다면 먼저 제거 후 진행하세요.

```
# 설치된 postgresql 패키지를 확인합니다.
$ dpkg -l | grep postgres

# 설치된 모든 postgresql 관련 패키지를 제거합니다.
$ dpkg -l | grep postgres | cut -d' ' -f3 | xargs sudo apt --purge remove -y

# PostgreSQL repository를 업데이트합니다.
$ sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

# Repository signing key를 가져옵니다.
$ wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# 패키지 목록을 업데이트합니다.
$ sudo apt-get update

# PostgreSQL 버전 12를 설치합니다.
$ sudo apt-get -y install postgresql-12

# PostgreSQL이 설치되었는지 확인합니다.
$ sudo service postgresql restart
$ sudo -u postgres psql
psql (12.4 (Ubuntu 12.4-1.pgdg18.04+1))
Type "help" for help.

postgres=#
```

- 개발 도중 `FATAL: Peer authentication failed for user` 에러가 일어나는 경우, PostgreSQL 설정을 변경해야 합니다.

```
# PostgreSQL 설정 파일을 엽니다.
$ sudo vi /etc/postgresql/12/main/pg_hba.conf

# 다음 줄을:

local   all             all                                     peer

# 이렇게 수정하세요.

local   all             all                                     md5

# 파일을 저장하고, PostgreSQL 서버를 재시작합니다.
$ sudo service postgresql restart
```

3. **초기화 스크립트를 실행합니다.**

- `init.sh`에 실행 권한을 부여하세요.

```
$ chmod 744 ./init.sh
```

- `init.sh`를 적절한 옵션으로 실행하세요.

```
$ source ./init.sh -h
init.sh [-h] [-n APP_NAME] [-u USER_SUFFIX] -- initialize serverless-boilerplate project with custom settings

options:
    -h    shows this help text
    -n    sets APP_NAME, which is applied to app environment (default is "serverless-boilerplate")
    -u    sets USER_SUFFIX, which is applied to postgresql role and database name (default is $USER)

$ source ./init.sh -n APP_NAME
```

- `init.sh`는 다음과 같은 작업을 수행합니다.
- `.env.local`과 `.env.test`에 정의된 환경 변수 일부를 재지정합니다.
- 로컬 PostgreSQL 서버에 `$APP_NAME-$USER_SUFFIX` 이름의 role과 database를 생성합니다.
- `PGDATABASE`, `PGUESR` 등의 환경 변수를 설정하여, `psql` 커맨드로 바로 PostgreSQL 서버에 접속할 수 있도록 합니다.

- 다른 DB 관리 툴(pgAdmin, MySQL Workbench 등)을 사용할 때는 `.env.local`에 생성된 유저명과 비밀번호를 사용하세요.

4. **로컬 서버를 실행하고 작동하는지 확인하세요.**

```
$ yarn start:local
```

- 로컬 환경에서, `src/db/config.ts`에 정의된 데이터베이스 테이블은 첫 API request에 lazy하게 생성됩니다.
- 데이터베이스 migration 시, `src/db/config.ts`에도 해당 스키마를 수정하세요.

### IDE 설정

1. Linter를 사용하세요.

- VS Code를 사용하고 있다면 (추천), **"ESLint"** 패키지를 설치하세요. `.vscode/settings.json`에 정의된 linter 설정이 적용됩니다.

## 개발

### 로컬 환경에서 개발하기

로컬 서버를 실행하세요.

```
$ yarn start:local
```

로컬 서버는 `APP_STAGE=local` 환경에서 실행됩니다. `./src` 이하에 존재하는 파일을 변경하면, 서버가 재시작됩니다. `.env.local` 파일을 변경하여 서버 포트 등 설정을 변경할 수 있습니다.

## 테스트

테스트 환경은 [`mocha`](https://mochajs.org/)와 [`chai`](https://www.chaijs.com/)를 사용합니다.

테스트 커맨드는 `src/` 아래의 모든 `*.test.ts` 파일을 실행합니다.

### 로컬 테스트

먼저 로컬 서버를 실행하세요.

```
$ yarn start:local
```

다른 터미널을 켜고, 테스트 스크립트를 실행하세요.

```
$ yarn test:local
```

### 배포 테스트

`beta`와 `release` 스테이지에 배포된 어플리케이션을 테스트하려면, 다음 스크립트를 실행합니다.

```
$ yarn test:beta
$ yarn test:release
```

## 프로젝트 배포

DevOps 스크립트에 `AWS_ACCESS_KEY_ID`와 `AWS_SECRET_ACCESS_KEY` 환경 변수를 설정하세요. `serverless` 프레임워크를 이용하기 위한 IAM 유저의 인증 정보를 설정해야 합니다. 해당 IAM 유저는 `AdministratorAccess`를 가지고 있는 것이 편리합니다.

### 비밀 키와 환경 변수 설정하기

[AWS SSM](https://ap-northeast-2.console.aws.amazon.com/systems-manager/home)로 이동하세요. 비밀 키나 환경 변수를 저장하기 위해 AWS SSM을 사용합니다. [Parameter Store](https://ap-northeast-2.console.aws.amazon.com/systems-manager/parameters)에서 다음과 같은 parameter를 생성하세요.

- `/${APP_NAME}-${APP_STAGE}/rds_password`
- `/${APP_NAME}-${APP_STAGE}/lambda_rds_password`

AWS SSM에 저장한 키들은 안전하게 저장해야 합니다. 이후 DB migration 등 작업을 수행할 때 해당 키들을 활용하세요.

### 데이터베이스 role 설정하기

어플리케이션을 배포한 후, 생성된 데이터베이스에 AWS Lambda 함수가 이용하기 위한 role을 생성해야 합니다.

다음 SQL문을 실행하세요.

```
CREATE ROLE lambda WITH LOGIN ENCRYPTED PASSWORD '<lambda_rds_password>';
```

비밀번호를 AWS SSM Paramter store `/${APP_NAME}-${APP_STAGE}/lambda_rds_password`에 보관하면, AWS Lambda에서 데이터베이스에 연결할 수 있습니다.

### 커맨드

- 베타 배포: `$ yarn deploy:beta`
- 베타 배포 내리기: `$ yarn remove:beta`
- 릴리즈 배포: `$ yarn deploy:release`
- 릴리즈 배포 내리기: `$ yarn remove:release`

### 데이터베이스 migration

- **AWS에 배포된 데이터베이스에 migration을 적용하기 위해서는, migration script를 직접 데이터베이스에 접속하여 실행해야 합니다.** 또한 `src/db/config.ts`에 스키마 변경 사항을 적용해 로컬 데이터베이스 사용자들이 업데이트할 수 있도록 하세요.
- 로컬 데이터베이스 사용자는 migration이 적용된 테이블을 drop하면, 다음 로컬 서버 실행 시 적용됩니다.
