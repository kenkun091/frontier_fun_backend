# Frontier Fun

## Database Setup and Migration Guide

### Prerequisites
Before you begin, ensure you have the following installed on your machine:

- **PostgreSQL**: [Download and install PostgreSQL](https://www.postgresql.org/download/)
- **Node.js and npm**: [Download and install Node.js](https://nodejs.org/)
- **Sequelize CLI**: Install globally using npm:
  ```bash
  npm install -g sequelize-cli
  ```
- **Docker**: [Download and install Docker](https://www.docker.com/get-started/)

### 1. Initial Setup

#### Install Dependencies
Install the required Node.js packages:
```bash
npm install
```

#### Local Setup
- Initialize Sequelize:
  ```bash
  npx sequelize-cli init
  ```
- Ensure you have a `docker-compose.yml` file in the project root directory.

### 2. Configure Database
Edit the `config/config.json` file to include your local PostgreSQL configuration. Here’s an example configuration:
```json
{
  "development": {
    "username": "your_db_username",
    "password": "your_db_password",
    "database": "your_db_name",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "your_db_username",
    "password": "your_db_password",
    "database": "your_db_test_name",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "your_db_username",
    "password": "your_db_password",
    "database": "your_db_production_name",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

### 3. Start PostgreSQL
Run Docker to start the PostgreSQL service:
```bash
docker-compose up -d
```

### 4. Create Database
You can create the database using Sequelize CLI:
```bash
npx sequelize-cli db:create
```

### 5. Creating New Tables
To create new tables, you can generate migration files:
```bash
npx sequelize-cli migration:generate --name create-your-table-name
```

### 6. Running Migrations
Run the migrations to create tables in your database:
```bash
NODE_ENV=local npx sequelize-cli db:migrate
```

### 7. Verify Migration Status
To check the status of your migrations:
```bash
NODE_ENV=local npx sequelize-cli db:migrate:status
```

### 8. Undo Last Migration (if needed)
If you need to undo the last migration:
```bash
NODE_ENV=local npx sequelize-cli db:migrate:undo
```

### 9. Undo All Migrations (if needed)
To undo all migrations:
```bash
NODE_ENV=local npx sequelize-cli db:migrate:undo:all
```

### 9. SEED All Tables (if needed)
To seed all migrations:
```bash
NODE_ENV=local npx sequelize-cli db:seed:all
```

### Additional Notes
- Ensure that your Docker and PostgreSQL server is running before executing the migration commands.
- If you encounter any issues, check the logs for errors and ensure your configuration is correct.

## License
This project is licensed under the MIT License.