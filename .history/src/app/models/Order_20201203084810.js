
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userId: DataTypes.STRING,
        description: DataTypes.STRING,
        filesLink: DataTypes.ARRAY(DataTypes.STRING),
    }
  );
  
  Order.associate = function(models) {
        Order.belongsTo(models.User, {foreignKey: 'userId'})
  }
  
  return Order;
};