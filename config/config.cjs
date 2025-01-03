// config/config.js
require('dotenv').config();

module.exports = {
    development: {
      username: process.env.DB_DEV_USERNAME,
      password: process.env.DB_DEV_PASSWORD,
      database: process.env.DB_DEV_NAME,
      host: process.env.DB_DEV_HOST,
      dialect: process.env.DB_DIALECT,
      dialectOptions:{
        ssl:{
          require: true,
          rejectUnauthorized: false,
        }
      },
      port: process.env.DB_PORT
    },
    local: {
      username: "admin",
      password: "admin1234",
      database: "tokens_db",
      host: "127.0.0.1",
      dialect: "postgres"
    },
    test: {
      username: "admin",
      password: "admin1234",
      database: "tokens_db",
      host: "127.0.0.1",
      dialect: "postgres"
    },
    production: {
      username: "your_username",
      password: "your_password",
      database: "your_production_database_name",
      host: "127.0.0.1",
      dialect: "postgres"
    }
  };
