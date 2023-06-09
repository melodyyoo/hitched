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
      name: 'The Addison',
      description: "The Addison is a Five Star Diamond Award-winning event venue. It is the perfect setting to host the single most important day.",
      price: 8000
    },
    {
      ownerId: 2,
      address: '1280 Manhatten Dr.',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA',
      name: 'Ella Ballroom',
      description: "Ella Ballroom, with its’ stunning Art Deco interior design, accommodates up to 120 guests for weddings. We are committed to designing an event that is uniquely yours.",
      price: 9200
    },
    {
      ownerId: 3,
      address: '290 Fontana St.',
      city: 'Irvine',
      state: 'California',
      country: 'USA',
      name: 'University Clubhouse Wedding',
      description: "Discover this classic yet modern event venue in the heart of Irvine! This gorgeous venue offers a serene, laidback setting complimented by lush greenery, a charming gazebo, and an immaculate design.",
      price: 5230
    },
    {
      ownerId: 4,
      address: '421 AppleBottom Jeans Rd.',
      city: 'Naperville',
      state: 'Illinois',
      country: 'USA',
      name: 'Hotel Baker',
      description: "Hotel Baker is a historic wedding venue located in Saint Charles, IL. Listed on the National Register of Historic Places, this riverfront hotel has welcomed some of society’s most elite. History will unfold before you as your wedding celebration commences amidst authentic 1920’s glamour.",
      price: 6800
    },
    {
      ownerId: 5,
      address: '3289 BearClaw Dr.',
      city: 'Pasadena',
      state: 'California',
      country: 'USA',
      name: 'Town and Country Club',
      description: "This twentieth century cottage is a charming Craftsman-style escape. Carefully manicured surroundings stretch for several acres, creating a private retreat for your milestone celebration",
      price: 10300
    },
    {
      ownerId: 1,
      address: '3390 Swift Ave.',
      city: 'Charlottesville',
      state: 'Virginia',
      country: 'USA',
      name: 'Museum of Art',
      description: "The Museum Of Art is a stylish and sophisticated beachside venue for weddings and nuptial events.",
      price: 7700
    },
    {
      ownerId: 2,
      address: '2901 One Direction St.',
      city: 'Santa Monica',
      state: 'California',
      country: 'USA',
      name: 'Garden Venue',
      description: "With over 3,500 square feet of gorgeous space, this is the perfect indoor/outdoor venue for the foodie couple.",
      price: 8000
    },
    {
      ownerId: 3,
      address: '3919 Butler Ave.',
      city: 'Portland',
      state: 'Oregon',
      country: 'USA',
      name: 'The Little White Church',
      description: "This church is more than a century old and has recently undergone some renovations that have allowed for the addition of modern amenities, including a central air conditioning system, security system, and additional technology.",
      price: 6200
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
