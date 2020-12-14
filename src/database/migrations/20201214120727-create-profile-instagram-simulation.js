'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("ProfileInstagramSimulations", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
      socialMediaId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "SocialMedia",
          key: "id"
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      profilePhoto: {
        type: Sequelize.STRING,
        allowNull: false
      },
      publications: {
        type: Sequelize.STRING,
        allowNull: false
      },
      followers: {
        type: Sequelize.STRING,
        allowNull: false
      },
      following: {
        type: Sequelize.STRING,
        allowNull: false
      },
      profileName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true
      },
      bio: {
        type: Sequelize.STRING,
        allowNull: false
      },
      highlights: {
        type: Sequelize.ARRAY(Sequelize.JSON),
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
      customFields: {
        type: Sequelize.JSON,
        allowNull: true
      },
    },
  )},

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("ProfileInstagramSimulations");
  }
};
