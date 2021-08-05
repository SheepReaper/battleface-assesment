# Requirements

This project was built and tested on Ubuntu 20.04 with nginx as the web server.

The following system packages are required on a vanilla Ubuntu 20.04:

- nginx (web server)
- unzip (composer req)
- php-fpm (php runtime req)
- php-mbstring (laravel runtime req)
- php-xml (laravel runtime req)
- php-sqlite3 (project-specific runtime req)

Install them like this:

```shell
sudo apt update && sudo apt install nginx unzip php-fpm php-mbstring php-xml php-sqlite3
```

### You could save some trouble and just use a laravel appliance or Docker, but NBD

Next, you need to have the php project dependencies installed (composer)

From `src/api`:

```shell
php composer.phar update
```

Finally, you need to install npm dependencies (assuming you have angular cli installed globally)

From `src/web-client`:

```shell
npm install
```

# Running

You must initialize the database once before trying to run the app. A default user is also created with credentials `email@email.com:password`

From `src/api`:

```shell
php artisan migrate:refresh --seed
```

Then start the api server with:

```shell
php artisan serve
```

## Now we just need to run the front-end

From `src/web-client`:

```shell
ng serve
```

If all goes well, the Api should sit at `http://127.0.0.1:8000` and the app at `http://localhost:4200/`.

It's very important the api runs where i've indicated as the client is currently hard-coded to it. You may change this behavior in `src/web-client/src/environments/environment.ts`

Please check out the `TODO.md` for additional comments/ramblings.
