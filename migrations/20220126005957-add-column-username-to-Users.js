'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'username', Sequelize.STRING)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'username')
  }
};
