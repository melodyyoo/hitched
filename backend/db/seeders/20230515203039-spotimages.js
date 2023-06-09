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
      url: "https://media-api.xogrp.com/images/6e6ebcd3-8312-431e-8310-8f4a1576ef15~rs_1016.678",
      preview: true
     },
     {
      spotId: 1,
      url: "https://media-api.xogrp.com/images/e1c00d70-ef7f-436f-ad17-627eea6a45a8~rs_1016.678",
      preview: false
     },
     {
      spotId: 1,
      url: "https://media-api.xogrp.com/images/7afd7d3c-12f7-4ac1-b7d4-c2329f6cac9b~rs_1016.678",
      preview: false
     },
     {
      spotId: 1,
      url: "https://media-api.xogrp.com/images/9bc095fd-68d5-4406-b712-930311500fb9~rs_1016.678",
      preview: false
     },
     {
      spotId: 1,
      url: "https://media-api.xogrp.com/images/bf62806f-e70e-4f79-af95-1736e59fad3d~rs_1016.678",
      preview: false
     },
     {
      spotId: 2,
      url: 'https://media-api.xogrp.com/images/efbbfc92-905f-411b-a08a-fdfd48d9ef9f~rs_1016.678',
      preview: true
     },
     {
      spotId: 2,
      url: 'https://media-api.xogrp.com/images/4f7a49dc-cd75-4db2-9fa8-d1cda8fa20ab~rs_1016.678',
      preview: false
     },
     {
      spotId: 2,
      url: 'https://media-api.xogrp.com/images/ee0b11f0-5939-422f-b588-060630042699~rs_1016.678',
      preview: false
     },
     {
      spotId: 2,
      url: 'https://media-api.xogrp.com/images/6d2c610a-4b42-42f0-989c-f559b9944c4e~rs_1016.678',
      preview: false
     },
     {
      spotId: 2,
      url: 'https://media-api.xogrp.com/images/cf1ce5d4-dd21-4de7-bed5-e2b2e461c91e~rs_1016.678',
      preview: false
     },
     {
      spotId: 3,
      url: 'https://media-api.xogrp.com/images/e29e3234-fc9c-41a1-978f-9499d2c9f13e~rs_1016.678',
      preview: true
     },
     {
      spotId: 3,
      url: 'https://media-api.xogrp.com/images/1a833d79-a7f6-45c2-966d-805f0c8242e2~rs_1016.678',
      preview: false
     },
     {
      spotId: 3,
      url: 'https://media-api.xogrp.com/images/4f14d4eb-effe-4bff-b638-b4946cb1927d~rs_1016.678',
      preview: false
     },
     {
      spotId: 3,
      url: 'https://media-api.xogrp.com/images/e2bd1352-90bf-4ba9-9415-aa33c95ac579~rs_1016.678',
      preview: false
     },
     {
      spotId: 3,
      url: 'https://media-api.xogrp.com/images/f374622f-c93f-48fa-a374-eba5938b8d35~rs_1016.678',
      preview: false
     },
     {
      spotId: 4,
      url: 'https://media-api.xogrp.com/images/a54f3119-9e44-4bad-ab8f-f377ced38e07~rs_1016.678',
      preview: true
     },
     {
      spotId: 4,
      url: 'https://media-api.xogrp.com/images/0087059a-88d5-4718-8c60-4e4a8a960d26~rs_1016.678',
      preview: false
     },
     {
      spotId: 4,
      url: 'https://media-api.xogrp.com/images/d6cfdc32-5308-4eb1-9e54-0886638392b2~rs_1016.678',
      preview: false
     },
     {
      spotId: 4,
      url: 'https://media-api.xogrp.com/images/c87787f9-6e44-48e7-8e77-d1b17c96d3bb~rs_1016.678',
      preview: false
     },
     {
      spotId: 4,
      url: 'https://media-api.xogrp.com/images/d4502f13-9072-41e1-aa96-a89facd02efd~rs_1016.678',
      preview: false
     },
     {
      spotId: 5,
      url: 'https://media-api.xogrp.com/images/a7350055-599c-484b-8e81-f65362f79d61~rs_1016.678',
      preview: true
     },
     {
      spotId: 5,
      url: 'https://media-api.xogrp.com/images/879f933b-c1ce-420a-9c74-d6c060d35fea~rs_1016.678',
      preview: false
     },
     {
      spotId: 5,
      url: 'https://media-api.xogrp.com/images/489527c1-b7a8-4813-92d9-0d2788a4941c~rs_1016.678',
      preview: false
     },
     {
      spotId: 5,
      url: 'https://media-api.xogrp.com/images/7f18e68c-3f47-40f4-9433-8a4c4b6dcd0a~rs_1016.678',
      preview: false
     },
     {
      spotId: 5,
      url: 'https://media-api.xogrp.com/images/b98e33ad-297c-4a85-bac0-5ff856e7a61c~rs_1016.678',
      preview: false
     },
     {
      spotId: 6,
      url: 'https://media-api.xogrp.com/images/e66c8468-fdc5-4f91-b311-d6e2bdacdd1b~rs_1016.678',
      preview: true
     },
     {
      spotId: 6,
      url: 'https://media-api.xogrp.com/images/6eb10a76-201f-4b8b-a3d5-fe199cc2b8a7~rs_1016.678',
      preview: false
     },
     {
      spotId: 6,
      url: 'https://media-api.xogrp.com/images/75d3b6a5-02e2-4cb0-9865-34b37dc0fc31~rs_1016.678',
      preview: false
     },
     {
      spotId: 6,
      url: 'https://media-api.xogrp.com/images/6c45ade1-e119-483a-980c-3a083ef40afa~rs_1016.678',
      preview: false
     },
     {
      spotId: 6,
      url: 'https://media-api.xogrp.com/images/835c43f4-dae6-4132-9a85-6f56a197f6c9~rs_1016.678',
      preview: false
     },
     {
      spotId: 7,
      url: 'https://media-api.xogrp.com/images/2dd82499-dce7-4a68-a133-0ce5fd498eab~rs_1016.678',
      preview: true
     },
     {
      spotId: 7,
      url: 'https://media-api.xogrp.com/images/44cd4946-4c60-483f-a4b0-939685f9672c~rs_1016.678',
      preview: false
     },
     {
      spotId: 7,
      url: 'https://media-api.xogrp.com/images/2fcec172-cb9a-455b-8af9-34c85cd8cad2~rs_1016.678',
      preview: false
     },
     {
      spotId: 7,
      url: 'https://media-api.xogrp.com/images/7b105314-8fab-4d4c-a16d-b88702c72e96~rs_1016.678',
      preview: false
     },
     {
      spotId: 7,
      url: 'https://media-api.xogrp.com/images/fdeaf60e-f939-4afc-b818-c3a796072393~rs_1016.678',
      preview: false
     },
     {
      spotId: 8,
      url: 'https://media-api.xogrp.com/images/66a9d4df-f4ad-4885-8954-db9a80f5dfb7~rs_1016.678',
      preview: true
     },
     {
      spotId: 8,
      url: 'https://media-api.xogrp.com/images/66dc0356-5504-420d-83b3-773212d783ce~rs_1016.678',
      preview: false
     },
     {
      spotId: 8,
      url: 'https://media-api.xogrp.com/images/f1c5dabd-5fd0-4126-b546-fca19637f3ca~rs_1016.678',
      preview: false
     },
     {
      spotId: 8,
      url: 'https://media-api.xogrp.com/images/0b8a3bbf-edd8-4e7e-9e91-5b94cae01947~rs_1016.678',
      preview: false
     },
     {
      spotId: 8,
      url: 'https://media-api.xogrp.com/images/d3d4cafc-a6b8-428a-be1e-c387b4610d16~rs_1016.678',
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
