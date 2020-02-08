# cms-nextjs
## Usage

### Install dependencies

```bash
npm install
```
### Run in dev mode
Before running app in dev mode, please make sure mongodb is running in localhost. Set DB_HOST=localhost in .env file then run

```bash
npm run start:dev
```

### Run bundled app, with docker setup for mongo db
set DB_HOST=mongo in .env file then run

```bash
docker-compose up
```

The app url is http://localhost:3000.
