import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class UniV3Token extends Model {
    static associate(models) {
    }
  }


UniV3Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
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
    },
    price: {
      type: DataTypes.DECIMAL(38,18),
      allowNull: true,
    },
    totalSupply: {
      type: DataTypes.STRING,
      allowNull: false
    },
    priceUnit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    poolFee: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'uni_v3_tokens',
    modelName: 'UniV3Token',
    timestamps: true,
  }
);

  return UniV3Token;
};