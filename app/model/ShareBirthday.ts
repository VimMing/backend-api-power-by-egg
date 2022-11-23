import { ShareBirthday as ShareBirthdayInterface } from './index';
import { ModelDefined } from 'sequelize';

export default (
  app
): ModelDefined<ShareBirthdayInterface, ShareBirthdayInterface> => {
  const { INTEGER, DATE } = app.Sequelize;

  const ShareBirthday = app.model.define(
    'ShareBirthday',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      shareBirthdayId: {
        type: INTEGER,
        field: 'share_birthday_id',
      },
      shareBirthdayAddId: {
        type: INTEGER,
        field: 'share_birthday_add_id',
      },
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
      tableName: 'share_birthday',
    }
  );

  return ShareBirthday;
};
