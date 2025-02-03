import { Model, DataTypes } from 'sequelize';


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
      allowNull: true
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
    price: {
      type: DataTypes.DECIMAL(38,18),
      allowNull: true,
    },
    totalSupply: {
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