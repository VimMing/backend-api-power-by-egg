"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;
    const User = app.model.define('user', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        mobile: STRING,
        password: STRING,
        openId: {
            type: STRING,
            field: 'open_id',
        },
        createdAt: {
            type: DATE,
            field: 'created_at',
        },
        nickName: {
            field: 'nickname',
            type: STRING,
        },
        updatedAt: {
            type: DATE,
            field: 'updated_at',
        },
        avatarUrl: {
            type: STRING,
            field: 'avatar_url',
        },
        isAdmin: {
            type: BOOLEAN,
            field: 'is_admin',
        },
    }, {
        tableName: 'user',
    });
    return User;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxrQkFBZSxDQUFDLEdBQUcsRUFBOEMsRUFBRTtJQUNqRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUV6RCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDM0IsTUFBTSxFQUNOO1FBQ0UsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUU7UUFDNUQsTUFBTSxFQUFFLE1BQU07UUFDZCxRQUFRLEVBQUUsTUFBTTtRQUNoQixNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxTQUFTO1NBQ2pCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUUsWUFBWTtTQUNwQjtRQUNELFFBQVEsRUFBRTtZQUNSLEtBQUssRUFBRSxVQUFVO1lBQ2pCLElBQUksRUFBRSxNQUFNO1NBQ2I7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssRUFBRSxZQUFZO1NBQ3BCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsWUFBWTtTQUNwQjtRQUNELE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxPQUFPO1lBQ2IsS0FBSyxFQUFFLFVBQVU7U0FDbEI7S0FDRixFQUNEO1FBQ0UsU0FBUyxFQUFFLE1BQU07S0FDbEIsQ0FDRixDQUFDO0lBRUYsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUMifQ==