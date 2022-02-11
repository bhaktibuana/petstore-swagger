# petstore-swagger
petstore-swagger is a Day30 Assignment from Dibimbing course in the form API server for pet store web application based on [petstore.swagger.io](https://petstore.swagger.io/#/) API documentation. This project uses [ExpressJs](https://www.npmjs.com/package/express) framework and MySQL as the database.

## Installation
In the root project directory run `npm install` on your terminal.


## Database configuration
There are two ways how to setup the database configuration. You can choose one of the methods below:

###### 1st method
- First of all you have to do is install MySQL database on your computer (this only if you don't have MySQL database yet).
- Import **./mysql/petstore_swagger.sql** file into your MySQL Database. It will automatically create new schema named "petstore_swagger" with its tables and datas.
- Open **dbConnection.js** in the **./src/config/** directory and you will see the following code:
```javascript
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "YOUR_MYSQL_HOST", // "localhost" by default
  user: "YOUR_MYSQL_USER", // "root" by default
  password: "YOUR_MYSQL_PASSWORD",
  database: "petstore_swagger",
});

module.exports = db;
```
- Change value of **host**, **user** and **password** to your MySQL configuration.

###### 2nd method
- First of all you have to do is install MySQL database on your computer (this only if you don't have MySQL database yet).
- Open **dbConnection.js** in the **./src/config/** directory and you will see the code like 1st method above.
- Change value of **host**, **user** and **password** to your MySQL configuration.
- In the root project directory open your terminal and run `node ./mysql/create.js`.
- After that you need to insert the data to the database by running `node ./mysql/insert.js`.

## Run the app
- In the root directory you can run `npm start` on your terminal.
- The server uses port: `3001` and it will be running on [http://localhost:3001](http://localhost:3001).

## Usage
The use of the API in this application is divided into 3 groups, namely pet, store and user. How to access the API is as follows:

### Pet
- #### Get all pet data
  `GET` `/pet`

  *Parameters:* none
- #### Get pet data by id
  `GET` `/pet/{id}`

  *parameters:* path 
  - `id` integer *required
- #### Get pet data by status
  `GET` `/pet/findByStatus`

  *parameters:* query
  - `status` string *required (choose between "available" or "sold")
- #### Add new pet data
  `POST` `/pet`

  *parameters:* body
  - `category_id` integer *required
  - `name` string *required
  - `quantity` integer *required
- #### Update exiting pet data
  `PUT` `/pet`

  *parameters:* body
  - `id` integer *required
  - `category_id` integer *required (reference category_id at pet_category table)
  - `name` string *required
  - `status` string *required (choose between "available" or "sold")
  - `quantity` integer *required
- #### Delete exiting pet data
  `DELETE` `/pet/{id}`

  *parameters:* path
  - `id` integer *required

### Store
- #### Place an store order for pet
  `POST` `/store/order`

  *parameters:* body
  - `pet_id` integer *required
  - `quantity` integer *required
- #### Find purchase store order by id
  `GET` `/store/order/{id}`

  *parameters:* path
  - `id` integer *required
- #### Update status approved purchase order
  `PUT` `/store/order/approve`

  *parameters:* body
  - `id` integer *required
- #### Update status delivered purchase order
  `PUT` `/store/order/deliver`

  *parameters:* body
  - `id` integer *required
- #### Delete purchase order by id
  `DELETE` `/store/order/{id}`

  *parameters:* path
  - `id` integer *required

### User
- #### Create new user
  `POST` `/user`

  *parameters:* body
  - `username` stirng *required (between 5 - 20 characters)
  - `first_name` string *required
  - `last_name` string *required
  - `email` string *required (valid email format)
  - `password` string *required
  - `password_confirmation` string *required
  - `phone` string *required (only Indonesian mobile phone format)
- #### Get user by username
  `GET` `/user/{username}`

  *parameters:* path
  - `username` string *required
- #### Update user by username
  `PUT` `/user/{username}`

  *parameters:* path, body
  - `username` string *required (path params)
  - `username` string *required (body params for new username)
  - `first_name` string *required
  - `last_name` string required
  - `email` string *required (new email and valid format)
  - `password` string *required (current password, password doesn't updated)
  - `phone` string *required (new phone number, only Indonesian mobile format)
- #### Delete user by username
  `DELETE` `/user/{username}`

  *parameters:* path
  - `username` string *required


To see the response you can do API testing using an application like [Postman](https://www.postman.com/). 
You can also import this project's postman_collection at **./postman_collection/petstore-swagger.postman_collection.json** to your [Postman](https://www.postman.com/).

I hope you guys like this project and ENJOY!!! :grin: