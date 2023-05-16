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
    options.tableName = 'SpotImages'
    await queryInterface.bulkInsert(options, [
     {
      spotId: 1,
      url: 'https://media.vrbo.com/lodging/25000000/24080000/24075200/24075172/5a226b2b.c10.jpg',
      preview: true
     },
     {
      spotId: 2,
      url: 'https://cdngeneral.rentcafe.com/dmslivecafe/2/88940/IMG_2155.jpg?width=380',
      preview: true
     },
     {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/c3175af4-963d-4328-860d-b6b6a0272545.jpg?im_w=1200',
      preview: false
     },
     {
      spotId: 4,
      url: 'https://media.self.com/photos/630635c30b7f36ce816f374a/4:3/w_2560%2Cc_limit/DAB03919-10470989.jpg',
      preview: false
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
    options.tableName = 'SpotImages'
    await queryInterface.bulkDelete(options)
  }
};
