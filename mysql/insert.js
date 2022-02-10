const db = require("../src/config/dbConnection");

const dataPetCategory = [{ name: "Dog" }, { name: "Cat" }];

dataPetCategory.forEach((value) => {
  const insertQuery = `INSERT INTO pet_category (name) VALUES (?);`;

  db.query(insertQuery, [value.name], (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(`Data pet_category: "${value.name}" inserted!`);
    }
  });
});

const dataPet = [
  {
    category_id: 1,
    name: "Husky Siberia",
    status: "available",
    quantity: 3,
  },
  {
    category_id: 1,
    name: "Shiba Inu",
    status: "available",
    quantity: 4,
  },
  {
    category_id: 1,
    name: "Golden Retriever",
    status: "available",
    quantity: 2,
  },
  {
    category_id: 2,
    name: "Maine Coon",
    status: "available",
    quantity: 4,
  },
  {
    category_id: 2,
    name: "Persian",
    status: "available",
    quantity: 7,
  },
  {
    category_id: 2,
    name: "Angora",
    status: "available",
    quantity: 5,
  },
  {
    category_id: 2,
    name: "Siamese",
    status: "available",
    quantity: 2,
  },
];

dataPet.forEach((value) => {
  const insertQuery = `INSERT INTO pet (category_id, name, status, quantity) VALUES (?, ?, ?, ?);`;

  db.query(
    insertQuery,
    [value.category_id, value.name, value.status, value.quantity],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log(`Data pet: "${value.name}" inserted!`);
      }
    }
  );
});

const dataUser = [
  {
    username: "john1023",
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@gmail.com",
    password: "qwerty12345",
    phone: "081234961756",
  },
  {
    username: "yoasobi99",
    first_name: "Rira",
    last_name: "Ikuta",
    email: "ikutarira@gmail.com",
    password: "qwerty12345",
    phone: "081325971259",
  },
  {
    username: "hyojoo256",
    first_name: "Han",
    last_name: "Hyo Joo",
    email: "hyojooohan@gmail.com",
    password: "qwerty12345",
    phone: "081232942038",
  },
];

dataUser.forEach((value) => {
  const insertQuery = `INSERT INTO user (username, first_name, last_name, email, password, phone) VALUES (?, ?, ?, ?, ?, ?);`;

  db.query(
    insertQuery,
    [
      value.username,
      value.first_name,
      value.last_name,
      value.email,
      value.password,
      value.phone,
    ],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log(`Data user: "${value.username}" inserted!`);
      }
    }
  );
});
