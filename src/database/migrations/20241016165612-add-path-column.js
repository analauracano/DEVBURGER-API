'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // ... sua lógica de "up" ...
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Products', 'Products_category_id_fkey');
    await queryInterface.dropTable('Categories');
  }
};