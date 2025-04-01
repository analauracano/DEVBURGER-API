'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Categories', 'path', {
      type: Sequelize.STRING,
      allowNull: true, // Ou false, se quiser obrigatório
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Categories', 'path');
  }
};
