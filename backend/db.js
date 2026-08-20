/* eslint-disable no-undef */

require("dotenv").config();

const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "tirupur-fashion-hub-iniya9962-3f36.f.aivencloud.com",
    port: 21317,
    user: "avnadmin",
    password: process.env.DB_PASSWORD,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: require("fs").readFileSync(__dirname + "./aiven-ca.pem")
    }
});

db.connect((err) => {
    if (err) {
        console.error("❌ Aiven MySQL connection failed:", err.message);
        return;
    }

    console.log("✅ Aiven MySQL connected successfully!");
});

module.exports = db;