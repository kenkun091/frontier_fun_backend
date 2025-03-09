// config/config.js
require('dotenv').config();

module.exports = {
    development: {
      username: "postgres",
      password: "admin123",
      database: "tokens_db6",
      host: "127.0.0.1",
      dialect: "postgres"
    },
    local: {
      username: "postgres",
      password: "admin123",
      database: "tokens_db6",
      host: "127.0.0.1",
      dialect: "postgres"
    },
    test: {
      username: "postgres",
      password: "admin123",
      database: "tokens_db6",
      host: "127.0.0.1",
      dialect: "postgres"
    },
    production: {
      username: "admin",
      password: "admin123",
      database: "tokens_db4",
      host: "127.0.0.1",
      dialect: "postgres"
    }
  };
