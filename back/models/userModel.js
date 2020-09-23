module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    name: {
      type: DataTypes.STRING(45),
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    profileImage: {
      type: DataTypes.STRING(200),
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      defaultValues: false,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    paranoid: true,
  });
};