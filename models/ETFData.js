import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ETFData extends Model {
    static associate(models) {
    }
  }

  ETFData.init(
    {
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      netFlow: {
        type: DataTypes.FLOAT, // Use FLOAT for decimal numbers
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ETFData',
      tableName: 'etf_data', // Use a pluralized table name
      timestamps: true,
    }
  );

  return ETFData;
}; 