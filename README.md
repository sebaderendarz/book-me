# **BookMe - hairdresser service booking platform**

## Deployment

Great tutorial [LONDON APP DEV](https://londonappdeveloper.com/django-docker-deployment-with-https-using-letsencrypt/) -> [YT VERSION](https://www.youtube.com/watch?v=3_ZJWlf25bY). Description here is an extended version of this tutorial adjusted for the BookMe use case.

1. Buy a free domain on www.freenom.com. Country will be quite unknown like `bookme.tk`, but it does not matter.
   1. When searching for a free domain you need to specify a full domain, with country code like `example.tk`. Otherwise you will see that the domain you are insterested in is not available in any country.
2. Add a ssh key pair for ec2 instances - import the public ssh key for your local machine. It is needed to log into ec2 instace via ssh.
   1. Other solution is to log into ec2 instance only through AWS management console.
3. Spin up AWS ec2 t2.micro instance with 25GB of disk space.No need of Elastic IP address. You just need Public IPv4 DNS address that is assigned automatically.
   1. Remember to specify the ssh key pair you just created.
4. Create a hosted zone in AWS Route 53 for the domain.
5. Create hosted zone A records pointing to the default name (hosted zone name) and subdomains like `api.bookme.tk`. All domains should target the ec2 instance Public IPv4 address.
   1. You can create CNAME record pointing to the Public IPv4 DNS address, but then you need to specify the subdomain.
   2. Remember that both Public IPv4 and Public IPv4 DNS addresses change when you shutdown and restart the ec2 instance! In case you don't want such behaviour you should use an instance offered by other cloud provider with a stable public IP address or purchase Elastic IP address in AWS.
6. Go to Freenom and configure custom domain nameservers for your domain. Take nameservers specified in the AWS hosted zone NS record. [Useful Link](https://medium.com/@kcabading/getting-a-free-domain-for-your-ec2-instance-3ac2955b0a2f). Nameserver is like a phonebook. DNS records are like phone numbers in the phonebook. By changing nameservers to AWS ones you move the management of DNS from Freenom to AWS hosted zone.
7. Log into ec2 instance `ssh ec2-user@<Public IPv4 DNS>`.
8. Run `ssh-keygen -t ed25519 -C 'Github BookMe Deploy key'` to generate a new ssh key.
9. Take the newly created ssh public key and add this key to the remote repo deploy keys. This way you grant access to the remote repo for the ec2 instance.
10. Run `sudo yum install -y git` to install git.
11. Pull the app repo from remote. Use ssh based URL.
12. Run `install_deps.sh` script. You might be prompted to type sudo password a few times.
13. Configure env vars for each container. Copy/paste the correct `env_vars/*-sample` file to the same directory, remove `-sample` suffix from the file name and specify correct values for variables in the file.
14. Run `make up-prod`. To see the full list of available commands run `make help`.
15. Containers should be running now. If there are some problems start investigation from checking docker container logs.
16. Django based API needs some manual steps to have it ready for the production use:
    1. Apply db migrations by running `make migrate-prod`.
    2. Collect static files needed to make Django Admin Panel working properly by running `make collectstatic-prod`.
    3. By default green Django theme is used, but theme should be changed to USWDS. Add USWDS theme by running `make django-prod cmd='loaddata admin_interface_theme_uswds.json'`.
    4. Change Django Admin Panel theme to USWDS:
       1. Login to Django Admin Panel using your admin account credentials.
       2. Go to Home -> Admin Interface -> Themes and change theme to USWDS.
       3. In case you don't have the admin account created yet you can create a superuser/admin account by running `make django-prod cmd=createsuperuser`.
       4. List of available themes [here](https://github.com/fabiocaccamo/django-admin-interface#optional-themes).
    5. Adjust texts and logos in Django Admin Panel to follow the context of the BookMe app. Go to Django Admin Panel -> Home -> Admin Interface -> Themes -> USWDS and change:
       1. Logo to the one located in `frontend/public/media/bookme_200_white.png`.
       2. Favicon to the one located in `frontend/public/media/bookme_200_white.png`.
       3. Title to `BookMe`.
17. To be continued...

## Additional Deployment Steps

These steps are not needed to have the production stack working. Follow the steps below to make the production stack more robust.

1. Configure custom dashboards in Grafana:
   1. Go to Grafana.
   2. Login. You should be able to login with initial credentials -> username: admin, password: admin. Then You have to change these credentials to more secure ones.
   3. Configure dashboards with charts and so on that will help you monitoring BookMe app.

## Code formatting and linting

There are linting tools configured to keep the python code in the same style across the entire BE part. Before merging new changes to the `develop` you should run `make format-api` to automatically format code e.g line lenght. After that you should run `make lint-api` to check if linting is correct and make changes accordingly if linting tools found some inconsistencies.

## Database ERD diagram

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
