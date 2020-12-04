'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Orders", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        }
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
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
      messages: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
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
