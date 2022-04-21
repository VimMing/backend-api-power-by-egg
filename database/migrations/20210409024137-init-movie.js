'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { JSON, DATE, STRING } = Sequelize;
    await queryInterface.createTable('movie', {
      id: { type: STRING, unique: true },
      rating: JSON,
      pubdate: STRING,
      pic: JSON,
      year: STRING,
      card_subtitle: STRING,
      genres: JSON,
      title: STRING,
      actors: JSON,
      url: STRING,
      directors: JSON,
      cover_url: STRING,
      subtype: STRING,
      comment: JSON,
      created_at: DATE,
      updated_at: DATE,
    }, {
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('movie');
  },
};
