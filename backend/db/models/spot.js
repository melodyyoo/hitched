'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(models.Review, {foreignKey: 'spotId', onDelete: 'cascade', hooks: true});

      Spot.hasMany(models.SpotImage, {foreignKey: 'spotId', onDelete: 'cascade', hooks: true});

      Spot.belongsTo(models.User, {foreignKey: 'ownerId', as: 'Owner'});

      Spot.hasMany(models.Booking, {foreignKey: 'spotId', onDelete: 'cascade', hooks: true})
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull:false
    },
    state: {
      type: DataTypes.STRING,
      allowNull:false
    },
    country: {
      type: DataTypes.STRING,
      allowNull:false
    },
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [1,50]
      },
      allowNull:false
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        len:[1, 600]
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
