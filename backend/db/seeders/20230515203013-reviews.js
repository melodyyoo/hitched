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
    options.tableName = 'Reviews'
    await queryInterface.bulkInsert(options, [
     {
      spotId: 1,
      userId: 1,
      review: 'Very chill vibes. Would recommend. ',
      stars: 5,
     },
     {
      spotId: 2,
      userId: 2,
      review: 'Great staycation with family. Saw a celeb from the patio.',
      stars: 4,
     },
     {
      spotId: 3,
      userId: 3,
      review: 'Description made it sound better than it was...',
      stars: 3,
     },
     {
      spotId: 4,
      userId: 1,
      review: 'Smelled mildewy and had cockroaches..',
      stars: 1,
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
    options.tableName = 'Reviews'
    await queryInterface.bulkDelete(options)
  }
};
