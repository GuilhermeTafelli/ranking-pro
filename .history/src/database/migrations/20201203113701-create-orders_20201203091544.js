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
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      filesLink: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      statusMessage: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      messages: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
    },
  )},

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("Order");
  }
};
