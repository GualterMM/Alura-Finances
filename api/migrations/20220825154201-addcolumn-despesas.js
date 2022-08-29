'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Despesas',
      'categoria',
      {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Outras'
      },
    )
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Despesas', 'categoria');
  }
};