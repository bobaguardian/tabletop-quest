# Tabletop Quest

Tabletop Quest, a [Product Hunt](https://www.producthunt.com/) clone, is a social media application that allows users to browse table top games, create posts for the games and participate in discussions about specific games.

## Local Machine Launch Instructions
* Clone the tabletop-quest repo
* In the `backend` folder, create a `.env` file using the `.env.example` as a template
* Using PostgreSQL: create your user with the credentials you inputted in the .env file
  * `psql`
  * In psql terminal:
    * `CREATE USER <<DB_USERNAME>> WITH PASSWORD <<DB_PASSWORD>> CREATEDB;`
* In your terminal navigate to the directory on your local machine
  * Move into the `backend` folder
    * Run `npm install`
    * Set up your database with Sequelize:
      * `npx dotenv sequelize db:create`
      * `npx dotenv sequelize db:migrate`
      * `npx dotenv sequelize db:seed:all`
    * Then run `npm start`
  * Move into the `frontend` folder
    * Run `npm install`
    * Then Run `npm start`
### Awesome! Now you can navigate to http://localhost:3000 and use the application!
