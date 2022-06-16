import dotenv from "dotenv";
dotenv.config();

import knexObj from "knex";
// import { Client } from "@elastic/elasticsearch";

const knex = knexObj({
  client: "mysql2",
  acquireConnectionTimeout: 60000,
  connection:
    process.env.APP_ENV === "production"
      ? {
          host: process.env.DB_PROD_HOST,
          user: process.env.DB_PROD_USER,
          password: process.env.DB_PROD_PASS,
          database: process.env.DB_PROD_NAME,
          port: process.env.DB_PROD_PORT,
        }
      : {
          host: process.env.DB_DEV_HOST,
          user: process.env.DB_DEV_USER,
          password: process.env.DB_DEV_PASS,
          database: process.env.DB_DEV_NAME,
          port: process.env.DB_DEV_PORT,
        },
  pool: {
    min: 0,
    max: 100,
  },
});

// export const esClient = new Client({
//   node: `http://${process.env.ES_HOST}:${process.env.ES_PORT}`,
//   auth: {
//     username: process.env.ES_USER,
//     password: process.env.ES_PASS,
//   },
// });

export default knex;