const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { DATE, INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      passwordHash: DataTypes.STRING,
      passwordResetExpiresIn: DataTypes.DATE,
      passwordResetToken: DataTypes.STRING,
      profilePhotoLink: DataTypes.STRING,
      address: DataTypes.STRING,
      addressNumber: DataTypes.STRING,
      addressComplement: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING,
      postalCode: DataTypes.STRING,
      phone: DataTypes.STRING,
      whatsApp: DataTypes.STRING,
      sex: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.passwordHash = await bcrypt.hash(user.password, 8);
          }
        }
      }
    }
  );

  User.prototype.checkPassword = function(password) {
    return bcrypt.compare(password, this.passwordHash);
  };

  User.prototype.generateToken = function() {
    return jwt.sign({ id: this.id }, process.env.APP_SECRET);
  };

  return User;
};