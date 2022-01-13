const Pool = require("pg").Pool;

const pool = new Pool({
    user:'postgres',
    password:'Lumbangaol99',
    host:'localhost',
    port:5432,
    database:'twitter'
});

module.exports = pool;