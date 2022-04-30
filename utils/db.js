import knexObj from "knex";

const knex = knexObj({
  client: "mysql2",
  connection: {
    host: "remotemysql.com",
    port: 3306,
    user: "izRJh0nyla",
    password: "KwlSy9Sv78",
    database: "izRJh0nyla",
  },
  pool: {
    min: 0,
    max: 100,
  },
});

export default knex;
