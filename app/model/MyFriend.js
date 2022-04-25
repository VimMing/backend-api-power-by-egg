"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Instance<MyFriend>['Model']
exports.default = (app) => {
    const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;
    const MyFriend = app.model.define('MyFriend', {
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
    }, {
        tableName: 'my_friend',
    });
    return MyFriend;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlGcmllbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNeUZyaWVuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWNBLDhCQUE4QjtBQUM5QixrQkFBZSxDQUFDLEdBQUcsRUFBa0QsRUFBRTtJQUNyRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUV6RCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDL0IsVUFBVSxFQUNWO1FBQ0UsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUU7UUFDNUQsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLE9BQU87WUFDYixLQUFLLEVBQUUsU0FBUztTQUNqQjtRQUNELElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsT0FBTztZQUNiLEtBQUssRUFBRSxVQUFVO1NBQ2xCO1FBQ0QsTUFBTSxFQUFFLE9BQU87UUFDZixTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxZQUFZO1NBQ3BCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUUsWUFBWTtTQUNwQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFLFlBQVk7U0FDcEI7S0FDRixFQUNEO1FBQ0UsU0FBUyxFQUFFLFdBQVc7S0FDdkIsQ0FDRixDQUFDO0lBQ0YsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyxDQUFDIn0=