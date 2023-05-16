'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Spots';
   await queryInterface.bulkInsert(options, [
    {
      ownerId: 1,
      address: '302 Greenwich Ave.',
      city: 'Miami',
      state: 'Florida',
      country: 'USA',
      lat: 37.7645458,
      lng: -122.4730327,
      name: 'Beach Condo',
      description: 'Luxurious condo with beachside view.',
      price: 250
    },
    {
      ownerId: 2,
      address: '1280 Manhatten Dr.',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA',
      lat: 37.2723898,
      lng: -130.4730327,
      name: 'Private Studio',
      description: 'Enjoy this cozy studio in the heart of LA.',
      price: 130
    },
    {
      ownerId: 3,
      address: '290 Fontana St.',
      city: 'Polson',
      state: 'Montana',
      country: 'USA',
      lat: 38.1289043,
      lng: -123.4430327,
      name: 'Lakefront House',
      description: 'Beautiful house on flathead with gym.',
      price: 230
    },
    {
      ownerId: 2,
      address: '421 AppleBottom Rd.',
      city: 'Naperville',
      state: 'Illinois',
      country: 'USA',
      lat: 40.7645458,
      lng: -127.4750227,
      name: 'New Apartment',
      description: '3 bed 2 bath apartment',
      price: 140
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots'
    await queryInterface.bulkDelete(options)
  }
};
