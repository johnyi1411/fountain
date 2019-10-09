# Job Posting and Application Website
This simple application allows users to sign up as an employer or an applicant. Employers can post jobs and view candidates that have applied to their jobs. Applicants can see jobs posted by all employers and apply to them. This web app is built in React, Node.js, Express.js and utilizes PostgreSQL database. Authentication is handled with passport.js.

## How It Works

1. Uses React and React Router to correctly render jobs/applicants for applicants and employers.
2. Persists employers, applicants, jobs and applications in PostgrSQL database.
3. Authenticate users based on hashed passwords and assign sessions to each user.


## Usage

1. Install dependancies:

    ```sh
    $ npm install
    ```

2. Create pgnode config file. An example is provided at ./database/config/pg.config.example.js.

    ```sh
    module.exports = {
      host: 'my.database-server.com',
      port: 5432,
      user: 'database-user',
      database: 'mydatabase',
      password: 'secretpassword!!',
      dialect: 'postgres',
    };
    ```

3. Run script to build required tables. (note: this must be done with user that has access to postgreSQL database):

    ```sh
    $ npm run build-database
    ```

4. Run script to build webpack bundle. (note: utilizes npx. If npx is not found, simply npm install npx):

    ```sh
    $ npm run build
    ```

5. Start node server:

    ```sh
    $ npm start
    ```
