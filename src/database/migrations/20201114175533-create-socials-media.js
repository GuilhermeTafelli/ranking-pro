'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("SocialMedia", {
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
      instagram: {
        type: Sequelize.STRING,
        allowNull: false
      },
      facebook: {
        type: Sequelize.STRING,
        allowNull: true
      },
      youtube: {
        type: Sequelize.STRING,
        allowNull: true
      },
      linkedin: {
        type: Sequelize.STRING,
        allowNull: true
      },
      twitter: {
        type: Sequelize.STRING,
        allowNull: true
      },
      tiktok: {
        type: Sequelize.STRING,
        allowNull: true
      },
      aboutMe: {
        type: Sequelize.STRING,
        allowNull: false
      },
      whereYouFrom: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      },
      monthlyInvoicing: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      skills: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      niches: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      medals: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      currentContracts: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },

    }
  )},

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("SocialMedia");

  }
};
