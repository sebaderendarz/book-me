# **BookMe - hairdresser service booking platform**

## Development environment configuration

1. Get repo.
2. Create environment variables file in main directory by typing command: `touch .env`.
3. Populate .env according to `.env-sample` file.
4. Type `make help` to get the list of available commands with descriptions. Go to `Makefile` file to see more details.
5. Run one of make commands. All commands that end with `-dev` have its counterpart for staging/QA environment. Simply type `-stg` instead. To start the entire stack for the first time run:

``` bash
make up-dev
```

API should be accessible on `localhost:8000` and frontend on `localhost:3000`. Go to `docker-compose.dev.yml` to check ports mapping for other services e.g `grafana`.
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

The final goal is to have nginx configuration that can be used to run BookMe on the server with SSL certificate and other security improvements. This work is still in progress. Go to `frontend/nginx`, `docker-compose.prod.yml` and `.env-sample` to check the current status.

## Code formatting and linting

There are linting tools configured to keep the python code in the same style across the entire BE part. Before merging new changes to the `develop` you should run `make format-api` to automatically format code e.g line lenght. After that you should run `make lint-api` to check if linting is correct and make changes accordingly if linting tools found some inconsistencies.

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

## Deployment

Great tutorial [LONDON APP DEV](https://londonappdeveloper.com/django-docker-deployment-with-https-using-letsencrypt/) -> [YT VERSION](https://www.youtube.com/watch?v=3_ZJWlf25bY). Description here is an extended version of this tutorial adjusted for book-me use case.

1. Buy a free domain on www.freenom.com. Country will be quite unknown like `bookme.tk`, but it does not metter.
   1. When searching for a free domain you need to specify a full domain, with country code like `example.tk`. Otherwise you will see that the domain you are insterested in is not available in any country.
2. Add a ssh key pair for ec2 instances - import the public ssh key for your local machine. It is needed to log into ec2 instace via ssh.
   1. Other solution is to log into ec2 instance only through AWS management console.
3. Spin up AWS ec2 t2.micro instance with 25GB of disk space.No need of Elastic IP address. You just need Public IPv4 DNS address that is assigned automatically.
   1. Remember to specify the ssh key pair you just created.
4. Add CNAME record to the AWS hosted zone. Pass ec2 instance Public IPv4 DNS address as target.
5. Create a hosted zone in AWS Route 53 for the domain.
6. Create A record for the hosted zone pointing to the default name (hosted zone name) and targeting the ec2 instance Public IPv4 address.
   1. You can create CNAME record pointing to the Public IPv4 DNS address, but then you need to specify the subdomain.
   2. Remember that both Public IPv4 and Public IPv4 DNS addresses change when you shutdown and restart the ec2 instance! In case you don't want such behaviour you should use an instance offered by other cloud provider with a stable public IP address or purchase Elastic IP address in AWS.
7. Log into ec2 instance `ssh ec2-user@<Public IPv4 DNS>`.
8. Run `ssh-keygen -t ed25519 -C 'Github BookMe Deploy key'` to generate a new ssh key.
9. Take the newly created ssh public key and add this key to the remote repo deploy keys. This way you grant access to the remote repo for the ec2 instance.
10. Run `sudo yum install -y git` to install git.
11. Pull the app repo from remote. Use ssh based URL.
12. `chmod +x` scripts in the scipts folder located at the top level directory of the repo.
13. Run `install_deps.sh` script. You might be prompted to type sudo password a few times.
14. Configure env vars for each container. Copy/paste the correct `env_vars/*-sample` file to the same directory, remove `-sample` suffix from the file name and specify correct values for variables in the file.
15. 
