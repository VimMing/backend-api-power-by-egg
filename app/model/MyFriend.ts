import { MyFriend as MyFriendInterface } from './index';
import { ModelDefined } from 'sequelize';
export default (app): ModelDefined<MyFriendInterface, MyFriendInterface> => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const MyFriend = app.model.define(
    'MyFriend',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userId: {
        type: INTEGER,
        field: 'user_id',
      },
      friendId: {
        type: INTEGER,
        field: 'friend_id',
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
