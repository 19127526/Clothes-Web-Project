import knexObj from "knex";

const knex = knexObj({
  client: "mysql2",
  connection: {
<<<<<<< Updated upstream
    host : '127.0.0.1',
    port: 3306,
    user : 'root',
    password : '123456',
    database : 'clothes'
=======
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123456",
    database: "qlbh",
>>>>>>> Stashed changes
  },
  pool: {
    min: 0,
    max: 10,
  },
});

export default knex;
