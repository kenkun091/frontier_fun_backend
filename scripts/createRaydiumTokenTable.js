import sequelize from '../config/database.js';
import RaydiumToken from '../models/RaydiumToken.js';

async function createRaydiumTokenTable() {
  try {
    // Force: true will drop the table if it exists and create a new one
    // Set to false if you want to preserve existing data
    await RaydiumToken.sync({ force: true });
    console.log('RaydiumToken table created successfully');
  } catch (error) {
    console.error('Error creating RaydiumToken table:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
}

createRaydiumTokenTable();