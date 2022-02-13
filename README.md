# **Book Me - barber service booking platform**

## How to use

1. Get repo
2. Create environment variables file in main directory by typing command: `touch .env`
3. Populate .env according to `.env-sample` file.
4. Type `make help` to get the list of available commands with descriptions. Go to `Makefile` file to see more details.
5. Run one of make commands. All commands that end with `-dev` have its counterpart for staging/QA environment. Simply type `-stg` instead. To start the entire stack for the first time run:

``` sh
make up-dev
```

6. Apply migrations:

```sh
make migrate-dev
```

7. Collect static files needed to make django admin work properly:

```sh
make collectstatic-dev
```

[django-admin-interface](https://github.com/fabiocaccamo/django-admin-interface) extension is installed. It allows to tune-up Django Admin theme. By default green Django theme is used, but it is possible to add another themes. To add another theme run:

```sh
make django-dev cmd='loaddata admin_interface_theme_uswds.json'
```

List of available themes [link](https://github.com/fabiocaccamo/django-admin-interface#optional-themes).
