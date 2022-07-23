"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlGcmllbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNeUZyaWVuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlLENBQUMsR0FBRyxFQUFvQyxFQUFFO0lBQ3ZELE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBRXpELE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUMvQixVQUFVLEVBQ1Y7UUFDRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRTtRQUM1RCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsT0FBTztZQUNiLEtBQUssRUFBRSxTQUFTO1NBQ2pCO1FBQ0QsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxPQUFPO1lBQ2IsS0FBSyxFQUFFLFVBQVU7U0FDbEI7UUFDRCxNQUFNLEVBQUUsT0FBTztRQUNmLFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLFlBQVk7U0FDcEI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssRUFBRSxZQUFZO1NBQ3BCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUUsWUFBWTtTQUNwQjtLQUNGLEVBQ0Q7UUFDRSxTQUFTLEVBQUUsV0FBVztLQUN2QixDQUNGLENBQUM7SUFDRixPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDLENBQUMifQ==