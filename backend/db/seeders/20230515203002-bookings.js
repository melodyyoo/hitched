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
   options.tableName = 'Bookings'
   await queryInterface.bulkInsert(options, [
    {
      spotId:1,
      userId:1,
      startDate: '2023-1-1',
      endDate: '2023-1-18'
    },
    {
      spotId:2,
      userId:1,
      startDate: '2023-2-4',
      endDate: '2023-2-10'
    },
    {
      spotId:3,
      userId:3,
      startDate: '2023-3-5',
      endDate: '2023-3-8'
    },
    {
      spotId:4,
      userId:2,
      startDate: '2023-5-10',
      endDate:  '2023-5-12'
    }
   ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings'
    await queryInterface.bulkDelete(options)
  }
};
