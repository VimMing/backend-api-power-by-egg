import { Movie as MovieInterface } from './index';
import { ModelDefined } from 'sequelize';

export default (app): ModelDefined<MovieInterface, MovieInterface> => {
  const { STRING, INTEGER, DATE, JSON } = app.Sequelize;

  const Movie = app.model.define(
    'movie',
    {
      uid: { type: INTEGER, primaryKey: true, autoIncrement: true },
      id: { type: STRING, unique: true },
      rating: JSON,
      pubdate: STRING,
      pic: JSON,
      year: STRING,
      cardSubtitle: {
        type: STRING,
        field: 'card_subtitle',
      },
      genres: JSON,
      title: STRING,
      actors: JSON,
      url: STRING,
      directors: JSON,
      coverUrl: {
        type: STRING,
        field: 'cover_url',
      },
      subtype: STRING,
      comment: JSON,
      createdAt: {
        type: DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DATE,
        field: 'updated_at',
      },
    },
    {
      tableName: 'movie',
    }
  );

  return Movie;
};
