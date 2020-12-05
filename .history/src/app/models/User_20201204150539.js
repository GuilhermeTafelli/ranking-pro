const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      fullName: DataTypes.STRING,
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
      cpf: DataTypes.STRING,
      whatsApp: DataTypes.STRING,
      sex: DataTypes.INTEGER
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            console.log(user.password)
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
    //TODO: adicionar expiresIn
    return jwt.sign({ id: this.id }, process.env.APP_SECRET);
  };

  return User;
};