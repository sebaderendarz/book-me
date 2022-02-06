# **book-me**

## How to use

1. Get repo
2. Create environment variables file in main directory by typing command: `touch .env`
3. Populate .env according to `.env-sample` file.
4. Run one of make commands. Type `make help` to get the list of available commands with descriptions. Go to `Makefile` file to see more details.

## Running docker-compose development stack

``` sh
make up-dev
```

## Running docker-compose staging/QA stack

``` sh
make up-stg
```
