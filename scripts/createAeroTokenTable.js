// createTable.js
const sequelize = require('./config/database');
const AeroToken = require('./models/aeroToken'); 

async function createAeroTokenTable() {
  try {
    // Sync the model with the database
    await AeroToken.sync({ force: false }); // Set force: true to drop the table if it exists
    console.log('AeroToken table created successfully!');
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
}

createAeroTokenTable();