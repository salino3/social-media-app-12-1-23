import mysql from 'mysql';

export const db = mysql.createConnection({
    host: "localhost",
    user: "",
    password: "",
    database: "social_test",
    port: 3306

});







