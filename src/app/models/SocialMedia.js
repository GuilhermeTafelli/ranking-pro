
module.exports = (sequelize, DataTypes) => {
  const SocialMedia = sequelize.define(
    "SocialMedia",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      userId: DataTypes.STRING,
      instagram: DataTypes.STRING,
      facebook: DataTypes.STRING,
      youtube: DataTypes.STRING,
      twitter: DataTypes.STRING,
      linkedin: DataTypes.STRING,
      tiktok: DataTypes.STRING,
      aboutMe: DataTypes.STRING,
      whereYouFrom: DataTypes.ARRAY(DataTypes.STRING),
      monthlyInvoicing: DataTypes.INTEGER,
      skills: DataTypes.ARRAY(DataTypes.STRING),
      niches: DataTypes.ARRAY(DataTypes.STRING),
      medals: DataTypes.ARRAY(DataTypes.STRING),
      customers: DataTypes.INTEGER,
      testCustomers: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
      gamificationCodes: DataTypes.ARRAY(DataTypes.JSON),
    }
  );

  SocialMedia.associate = function (models) {
    SocialMedia.belongsTo(models.User, { foreignKey: 'userId' })
  }

  return SocialMedia;
};