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
      userId: 2,
      review: "Wow I almost got lost at this venue because it was so big. I was like where are my friends!! Haha!",
      stars: 4,
     },
     {
      spotId: 1,
      userId: 3,
      review: "Amazing venue... even saw Zendaya there.. LA man.....",
      stars: 5,
     },
     {
      spotId: 2,
      userId: 4,
      review: "The host was very rude. I asked if I could bring 400 people over the capacity and he said no",
      stars: 1,
     },
     {
      spotId: 2,
      userId: 5,
      review: "The host was sooo accomodating and friendly! It was the perfect venue to celebrate my sister and her husband's new chapter.",
      stars: 5,
     },
     {
      spotId: 3,
      userId: 1,
      review: "BIG REGRETS. That I did not book this venue sooner. Because if I did... I would have warned my future self not to.",
      stars: 1,
     },
     {
      spotId: 3,
      userId: 2,
      review: "Me and my cream puff got married here 12 years ago. I still think about it every day. So grateful for him.",
      stars: 4,
     },
     {
      spotId: 4,
      userId: 3,
      review: 'Getting married at a hotel was the right choice. I had always dreamed of it and this venue exceeded my expectations.',
      stars: 4,
     },
     {
      spotId: 4,
      userId: 5,
      review: 'Lavish. Stunning. Spectacular. Ornate. Regal. Grand. Gorgeous. Never Done Before. Totally Unique. Wickedly Splended.',
      stars: 5,
     },
     {
      spotId: 5,
      userId: 1,
      review: "YEEEEHAWWW I love me a country club. The sliders were finger lickin good.",
      stars: 5,
     },
     {
      spotId: 5,
      userId: 2,
      review: 'There were no decorations to be found an hour before the wedding. A nightmare. Nightmare I tell you.',
      stars: 3,
     },
     {
      spotId: 6,
      userId: 3,
      review: "This venue was a no brainer. The greatest art in life is love. So yeah.",
      stars: 4,
     },
     {
      spotId: 6,
      userId: 4,
      review: "Getting married next to the real Mona Lisa was something else. How many people can say they have that opportunity in life? ",
      stars: 5,
     },
     {
      spotId: 7,
      userId: 5,
      review: 'The description was very misleading....Why would you say this venue is perfect for foodies and cater from Chik fil a??',
      stars: 2,
     },
     {
      spotId: 7,
      userId: 4,
      review: "Was a really pleasant evening. The ambience was perfect and I'll cherish the memory forever.",
      stars: 4,
     },
     {
      spotId: 8,
      userId: 3,
      review: 'There was literally a sermon going on when my family and I got there. Host failed to book us for the time that was promised.',
      stars: 2,
     },
     {
      spotId: 8,
      userId: 2,
      review: "The chapel is beautiful and the stained glass windows glow gorgeously. Also got blessed at the altar. John 3:16",
      stars: 5,
     },
     {
      spotId: 1,
      userId: 4,
      review: 'Courtyard was the best and Keanu made it even more special. He really hooked us up and made our special day great, with no Hassle.',
      stars: 4,
     },
     {
      spotId: 2,
      userId: 3,
      review: "Ella Ballroom was so special. Beautiful venue with excellent food, music, and service.",
      stars: 4,
     },
     {
      spotId: 3,
      userId: 4,
      review: "My fam and I are all alums of UCI. Getting married here brought back all the memories and I can't wait to go back for my next marriage.",
      stars: 5,
     },
     {
      spotId: 4,
      userId: 2,
      review: "This place was gorgeous!!! The history did in fact unfold before me.",
      stars: 4,
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
