# **book-me**

## How to use

1. Get repo
2. Create environment variables file in main directory typing command: `touch .env`
3. Populate .env according to `.env-sample` file.
4. Run one of make commands.

## Running development stack

``` sh
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

## Running "production" stack - Doesn't work, Check TODO in docker-compose.yml file

``` sh
docker-compose -f docker-compose.yml up --build
```