import { Model, Sequelize } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UniV2Token extends Model {
    static associate(models) {
    }
  }

UniV2Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: true,
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
    },
    price: {
      type: DataTypes.DECIMAL(38,18),
      allowNull: true,
    },
    priceUnit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'uni_v2_tokens',
    modelName: 'UniV2Token',
    timestamps: true,
  });

  return UniV2Token;
};