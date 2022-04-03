# **BookMe - hairdresser service booking platform**

## Development environment configuration

1. Get repo
2. Create environment variables file in main directory by typing command: `touch .env`
3. Populate .env according to `.env-sample` file.
4. Type `make help` to get the list of available commands with descriptions. Go to `Makefile` file to see more details.
5. Run one of make commands. All commands that end with `-dev` have its counterpart for staging/QA environment. Simply type `-stg` instead. To start the entire stack for the first time run:

``` bash
make up-dev
```

API should be accessible on `localhost:8000` and frontend on `localhost:3000`. Go to `docker-compose_dev.yml` to check ports mapping for other services e.g `grafana`.
Database should be created automatically and stored in `persistent_data` folder when `make up-dev` is triggered for the first time.

6. Apply migrations:

```bash
make migrate-dev
```

7. Collect static files needed to make Django Admin Panel working properly:

```bash
make collectstatic-dev
```

[django-admin-interface](https://github.com/fabiocaccamo/django-admin-interface) extension is installed. It allows to tune-up Django Admin theme. By default green Django theme is used, but theme should be changed to USWDS. To add USWDS theme run:

```bash
make django-dev cmd='loaddata admin_interface_theme_uswds.json'
```

8. Change Django Admin Panel theme to USWDS:

    Login to Django Admin Panel using your admin account credentials, go to Home -> Admin Interface -> Themes and change theme to USWDS. In case you don't have the admin account created yet you can create a superuser/admin account by running `make django-dev cmd=createsuperuser`.

    List of available themes [here](https://github.com/fabiocaccamo/django-admin-interface#optional-themes).

9. Adjust texts and logo in Django Admin Panel:

    Some texts and logo in Django Admin Panel have to be changed from default to follow the context of the BookMe app. Go to Django Admin Panel -> Home -> Admin Interface -> Themes -> USWDS and change:
- Logo to the one located in `frontend/public/media/bookme_200_white.png`.
- Favicon to the one located in `frontend/public/media/bookme_200_white.png`.
- Title to `BookMe`.

10. Configure custom dashboards in Grafana:
- Go to Grafana.
- Login. You should be able to login with initial credentials -> username: admin, password: admin. Then You have to change these credentials to more secure ones.
- Configure dashboards with charts and so on that will help you monitoring BookMe app.

## Production environment configuration

In general, to configure BookMe in the production environment you should follow the same steps as described [here](#development-environment-configurationdevelopment-environment-configuration).

The final goal is to have nginx configuration that can be used to run BookMe on the server with SSL certificate and other security improvements. This work is still in progress. Go to `frontend/nginx`, `docker-compose.yml` and `.env-sample` to check the current status.

## Additional notes

To see ERD diagram of the current database structure go to `resources/database_diagram/erd.png`.

## Manage database

#### Restore database from gzip dump:

```bash
gunzip < DUMP_NAME | sudo psql -h 0.0.0.0 -U <postgres-user> <db-name>
```

#### Restore database from plain dump:

```bash
cat DUMP_NAME | sudo psql -h 0.0.0.0 -U <postgres-user> <db-name>
```

#### Dump database to gzip:
```bash
sudo docker exec <container name> pg_dumpall -U <postgres-user> | gzip > <file name>.sql.gzip
```
