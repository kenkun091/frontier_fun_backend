// models/UsdData.js
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UsdData extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  UsdData.init(
    {
      symbol: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      market_cap: {
        type: DataTypes.FLOAT, // Use FLOAT for decimal numbers
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'UsdData',
      tableName: 'usd_data', // Use a pluralized table name
      timestamps: true,
    }
  );

  return UsdData;
};