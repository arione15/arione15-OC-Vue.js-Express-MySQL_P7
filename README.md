# intern-social-network-p7oc

## Project setup
```
npm install
```

### Compiles and hot-reloads for development : frontend on port : 8080
```
npm run serve
```
### backend on port : 3000
```
npm start or nodemon server
```
### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
### testInstalation & Usage
First you must have the latest node.js version (above v8). Also, make sure to have installed nodemon. After cloning the project and making it your own follow the steps to get it up and running.

1. Install all dependencies with npm or Yarn:

npm install
or
yarn

2. Open PHPMyAdmin, create a Database & import db.sql file.

3. Create a .env file and insert the following code. Replace the values with your own.

PORT=YOUR_PORT // desired port to localhost
MYSQL_HOST="localhost"
MYSQL_USER="user" // your username
MYSQL_PASSWORD="password" // your password
MYSQL_DATABASE="db" // name of created DB
SESSION_SECRET_LETTER="anything-secret"

4. Start the server
npm start [OR] yarn start

5. At this step you might come across some errors, check your node services.

6. Now run the app

localhost:[PORT] PORT=8080 (By default)

7. Enjoy!!