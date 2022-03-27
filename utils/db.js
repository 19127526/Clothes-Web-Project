import knexObj from "knex";

const knex = knexObj({
    client: 'mysql2',
    connection: {
        host : 'db4free.net',
        port : 3306,
        user : 'clothesshopapp',
        password : 'b2ef08c3',
        database : 'clothesshopapp',
    },
    pool: {
        min: 0,
        max: 10
    }
});

export default knex;