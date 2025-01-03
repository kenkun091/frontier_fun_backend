import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  host: process.env.DB_DEV_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_DEV_USERNAME || 'admin',
  password: process.env.DB_DEV_PASSWORD || 'admin1234',
  database: process.env.DB_DEV_NAME || 'tokens_db',
  dialect: "postgres",
  dialectOptions:{
    ssl:{
      require: true,
      rejectUnauthorized: false,
    }
  },
  logging: console.log, // Set to false in production
  pool: {
    max: 5, // Maximum number of connection in pool
    min: 0, // Minimum number of connection in pool
    acquire: 30000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 10000 // The maximum time, in milliseconds, that a connection can be idle before being released
  }
});
// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;