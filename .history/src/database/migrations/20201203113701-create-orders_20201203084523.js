'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Order", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        }
      },
    },
  )},

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("Order");
  }
};
