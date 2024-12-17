// models/aeroToken.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class AeroToken extends Model {}

AeroToken.init(
  {
    symbol: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEthereumAddress(value) {
          if (!/^0x[a-fA-F0-9]{40}$/.test(value)) {
            throw new Error('Invalid Ethereum address');
          }
        },
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'AeroToken',
    tableName: 'aero_tokens',
    timestamps: true,
  }
);

module.exports = AeroToken;