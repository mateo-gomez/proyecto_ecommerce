'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CCTransactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  CCTransactions.init({
    code: DataTypes.STRING,
    order_id: DataTypes.INTEGER,
    transdate: DataTypes.DATE,
    processor: DataTypes.STRING,
    processor_trans_id: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    cc_num: DataTypes.STRING,
    cc_type: DataTypes.STRING,
    responde: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CCTransactions',
    tableName: 'cc_transactions'
  });
  return CCTransactions;
};