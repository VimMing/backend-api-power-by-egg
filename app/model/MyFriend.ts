import { Instance, Model } from 'sequelize';

interface MyFriend {
  id?: number;
  userId: number;
  name: string;
  birthday: Date;
  isLunar: boolean;
  zodiac: number;
  shareCode?: string;
  solarBirthday?: { year: number; month: number; day: number };
  createdAt?: Date;
  updatedAt?: Date;
}
// Instance<MyFriend>['Model']
export default (app): Model<MyFriend & Instance<MyFriend>, MyFriend> => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const MyFriend = app.model.define(
    'MyFriend',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userId: {
        type: INTEGER,
        field: 'user_id',
      },
      name: STRING,
      birthday: DATE,
      isLunar: {
        type: BOOLEAN,
        field: 'is_lunar',
      },
      zodiac: INTEGER,
      shareCode: {
        type: STRING,
        field: 'share_code',
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
      tableName: 'my_friend',
    }
  );
  return MyFriend;
};
