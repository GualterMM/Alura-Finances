'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Despesas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Despesas.init({
    descricao: DataTypes.STRING,
    valor: DataTypes.DECIMAL,
    data: DataTypes.DATEONLY,
    categoria: {
      type: DataTypes.STRING,
      defaultValue: 'Outras',
      validate: {
        isIn: {
          args: [['Alimentação', 'Saúde', 'Moradia', 'Transporte', 'Educação', 'Lazer', 'Imprevistos', 'Outras']],
          msg: "Categoria inválida."
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Despesas',
  });
  return Despesas;
};