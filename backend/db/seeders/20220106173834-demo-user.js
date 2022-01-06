'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Users', [
       {
        email: 'demo@user.io',
        username: 'deMOUSEr',
        hashedPassword: bcrypt.hashSync('imdebestmouse'),
      },
      {
        email: 'fakeuserONE@gmail.com',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('iamthetruefaker'),
      },
      {
        email: 'fakeuserTWO@gmail.com',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('iamafakerCLONE'),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['deMOUSEr', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
