# **Book Me - barber service booking platform**

## How to use

1. Get repo
2. Create environment variables file in main directory by typing command: `touch .env`
3. Populate .env according to `.env-sample` file.
4. Type `make help` to get the list of available commands with descriptions. Go to `Makefile` file to see more details.
5. Run one of make commands. To start the entire stack for the first time run:

``` sh
make up-dev or make up-stg
```

6. Apply migrations:

```sh
make migrate-dev or make migrate-stg
```

7. Collect static files needed to make django admin work properly:

```sh
make collectstatic-dev or make collectstatic-stg
```
