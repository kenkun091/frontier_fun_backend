// testConnection.js
import sequelize from './../database.js'; // Adjust the path if necessary

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the development database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the development database:', error);
    }
}

testConnection();