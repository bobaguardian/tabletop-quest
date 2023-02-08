
# [Tabletop Quest](https://tabletopquest.herokuapp.com/)

Tabletop Quest, a [Product Hunt](https://www.producthunt.com/) clone, is a social media application that allows users to browse table top games and create posts for the game products and participate in discussions of those games.

## Table of Contents
* [MVP Feature List Document](https://github.com/bobaguardian/tabletop-quest/wiki/MVP-Feature-List)
* [React Components List](https://github.com/bobaguardian/tabletop-quest/wiki/React-Components)
* [Database Schema](https://github.com/bobaguardian/tabletop-quest/wiki/Database-Schema)
* [Frontend Routes](https://github.com/bobaguardian/tabletop-quest/wiki/Frontend-Routes)
* [API Routes](https://github.com/bobaguardian/tabletop-quest/wiki/API-Documentation)
* [Technologies Used](https://github.com/bobaguardian/tabletop-quest#technologies-used)
* [Application Screenshots](https://github.com/bobaguardian/tabletop-quest#application-screenshots)
* [Future Implementations](https://github.com/bobaguardian/tabletop-quest#future-implementations)
* [Code Snippet](https://github.com/bobaguardian/tabletop-quest#Code-Snippet)
* [Redux Store Tree](https://github.com/bobaguardian/tabletop-quest#redux-store-tree)

## Technologies Used
* NodeJS
* Express
* PostgreSQL
* Sequelize
* React
* Redux

## Application Screenshots

### Splash Page
On the splash page, users can login, signup or demo the site as a guest.  Displayed is a nice background image symbolizing the embarking on a new journey to find the best tabletop game. 
![Splash Page](https://github.com/bobaguardian/tabletop-quest/blob/main/frontend/public/images/splash-page-with-links.JPG)

### Products Page
This lists all the products that have been submitted to tabletop quest organized by most recently created/updated. Clicking on a product opens the Product Profile modal below.
![Products Page](https://github.com/bobaguardian/tabletop-quest/blob/main/frontend/public/images/products-page.png)

### Product Profile Modal
This modal displays the tabletop game's product details along with its title, description, and the user that submitted the product.  This is also where the discussions for that product are housed.
![Product Profile Modal](https://github.com/bobaguardian/tabletop-quest/blob/main/frontend/public/images/product-profile-modal.JPG)

### Discussions Section
This lists discussions for the specified product organized by most recently updated/created.
![Discussions Section](https://github.com/bobaguardian/tabletop-quest/blob/main/frontend/public/images/discussions-section.JPG)

### Product Search
An added functionality to search through products via a search bar.
![Product Search Page](https://github.com/bobaguardian/tabletop-quest/blob/main/frontend/public/images/product-search.PNG)

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

## Future Implementations
* Add an upvote feature for products

## Code Snippet
This is the handleSubmit event handler for creating and updating a product.  I reused my ProductForm component by passing in a prop "type" to indicate whether the form should create or update a product.
```
const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      userId: sessionUser.id,
      title,
      imageSrc,
      description
    }
    setErrors([]);

    if (type === 'create') { // CREATE
      dispatch(submitProduct(product))
        .then((res) => {
          history.push('/products');
        })
        .catch(async(res) => {
          const data = await res.json();
          if (data && data.errors) return setErrors(data.errors);
        });
    } else { // UPDATE
      dispatch(editProduct(productId, product))
        .then((res) => {
          history.push('/products');
        })
        .catch(async(res) => {
          const data = await res.json();
          if (data && data.errors) return setErrors(data.errors);
        });
    }
  }
```

## Redux Store Tree

    state: {
	    session: { user },
	    products: { entries }
    }
