
# [Tabletop Quest](https://tabletopquest.herokuapp.com/)

Tabletop Quest, a [Product Hunt](https://www.producthunt.com/) clone, is a social media application that allows users to browse table top games and create posts for the game products.

[See the site live here!](https://tabletopquest.herokuapp.com/)

## Table of Contents
* [MVP Feature List Document](https://github.com/bobaguardian/tabletop-quest/wiki/MVP-Feature-List)
* [React Components List](https://github.com/bobaguardian/tabletop-quest/wiki/React-Components)
* [Database Schema](https://github.com/bobaguardian/tabletop-quest/wiki/Database-Schema)
* [Frontend Routes](https://github.com/bobaguardian/tabletop-quest/wiki/Frontend-Routes)
* [API Routes](https://github.com/bobaguardian/tabletop-quest/wiki/API-Documentation)
* [Application Screenshots](https://github.com/bobaguardian/tabletop-quest#application-screenshots)
* [Technologies Used](https://github.com/bobaguardian/tabletop-quest#technologies-used)
* [Future Implementations](https://github.com/bobaguardian/tabletop-quest#future-implementations)
* [Redux Store Tree](https://github.com/bobaguardian/tabletop-quest#redux-store-tree)


## Application Screenshots

### Splash Page
![Splash Page](https://github.com/bobaguardian/tabletop-quest/blob/main/frontend/public/images/splash-page-with-links.JPG)

### Products Page
![Products Page](https://github.com/bobaguardian/tabletop-quest/blob/main/frontend/public/images/products-page.png)

### Product Profile Modal
![Product Profile Modal](https://github.com/bobaguardian/tabletop-quest/blob/main/frontend/public/images/product-profile-modal.JPG)

### Discussions Section
![Discussions Section](https://github.com/bobaguardian/tabletop-quest/blob/main/frontend/public/images/discussions-section.JPG)

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
#### Awesome! Now you can navigate to http://localhost:3000 and use the application!

## Technologies Used
* NodeJS
* Express
* PostgreSQL
* Sequelize
* React
* Redux

## Future Implementations
* Add a discussion feature so that users can partake in discussions for specific products
* Add a search feature for products
* Add an upvote feature for products

## Redux Store Tree

    state: {
	    session: { user },
	    products: { entries }
    }
