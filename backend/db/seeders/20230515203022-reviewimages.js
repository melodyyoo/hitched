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
   options.tableName = 'ReviewImages';
    await queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'https://lantowerriverlanding.com/wp-content/uploads/2021/02/DSC_3710.jpg'
      },
      {
        reviewId: 2,
        url: 'https://pbs.twimg.com/media/EXy2ZC-XYAA1V4V.jpg'
      },
      {
        reviewId: 3,
        url: 'https://sanibelrealestateguide.com/images/Dont-Buy-Ugly-Houses.jpg'
      },
      {
        reviewId: 4,
        url: 'https://www.maids.com/cleaning-hacks/wp-content/uploads/2018/01/mildew2-featured-1000x675.jpg'
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'ReviewImages';
    await queryInterface.bulkDelete(options)
  }
};
