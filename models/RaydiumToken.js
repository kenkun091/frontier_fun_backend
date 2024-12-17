import { Model, DataTypes } from 'sequelize';
// import sequelize from '../config/database.js';
// import { isAddress } from 'ethers';

export default (sequelize, DataTypes) => {
  class RaydiumToken extends Model {}

  RaydiumToken.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    sequelize,
    modelName: 'RaydiumToken',
    tableName: 'raydium_tokens',
    timestamps: true,
    underscored: true  // This will use snake_case for automatically added attributes
  });

  return RaydiumToken;
};