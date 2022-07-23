"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    const { STRING, INTEGER, DATE, JSON } = app.Sequelize;
    const WxSubscription = app.model.define('WxSubscription', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true },
        userId: {
            type: INTEGER,
            field: 'user_id',
        },
        name: STRING,
        when: DATE,
        content: {
            type: JSON,
        },
        status: INTEGER,
        templateId: {
            type: STRING,
            field: 'template_id',
        },
        eventId: {
            type: INTEGER,
            field: 'event_id',
        },
        ErrMessage: {
            type: STRING,
            field: 'err_message',
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
        tableName: 'wx_subscription',
    });
    return WxSubscription;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV3hTdWJzY3JpcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJXeFN1YnNjcmlwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLGtCQUFlLENBQUMsR0FBRyxFQUEwQyxFQUFFO0lBQzdELE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBRXRELE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUNyQyxnQkFBZ0IsRUFDaEI7UUFDRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRTtRQUM1RCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsT0FBTztZQUNiLEtBQUssRUFBRSxTQUFTO1NBQ2pCO1FBQ0QsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsSUFBSTtRQUNWLE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxJQUFJO1NBQ1g7UUFDRCxNQUFNLEVBQUUsT0FBTztRQUNmLFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxNQUFNO1lBQ1osS0FBSyxFQUFFLGFBQWE7U0FDckI7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsT0FBTztZQUNiLEtBQUssRUFBRSxVQUFVO1NBQ2xCO1FBQ0QsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLE1BQU07WUFDWixLQUFLLEVBQUUsYUFBYTtTQUNyQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFLFlBQVk7U0FDcEI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssRUFBRSxZQUFZO1NBQ3BCO0tBQ0YsRUFDRDtRQUNFLFNBQVMsRUFBRSxpQkFBaUI7S0FDN0IsQ0FDRixDQUFDO0lBQ0YsT0FBTyxjQUFjLENBQUM7QUFDeEIsQ0FBQyxDQUFDIn0=