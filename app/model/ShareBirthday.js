"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    const { INTEGER, DATE } = app.Sequelize;
    const ShareBirthday = app.model.define('ShareBirthday', {
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
    }, {
        tableName: 'share_birthday',
    });
    return ShareBirthday;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hhcmVCaXJ0aGRheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNoYXJlQmlydGhkYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxrQkFBZSxDQUNiLEdBQUcsRUFDMkQsRUFBRTtJQUNoRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFFeEMsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQ3BDLGVBQWUsRUFDZjtRQUNFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFO1FBQzVELGVBQWUsRUFBRTtZQUNmLElBQUksRUFBRSxPQUFPO1lBQ2IsS0FBSyxFQUFFLG1CQUFtQjtTQUMzQjtRQUNELGtCQUFrQixFQUFFO1lBQ2xCLElBQUksRUFBRSxPQUFPO1lBQ2IsS0FBSyxFQUFFLHVCQUF1QjtTQUMvQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxJQUFJO1lBQ1YsS0FBSyxFQUFFLFlBQVk7U0FDcEI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssRUFBRSxZQUFZO1NBQ3BCO0tBQ0YsRUFDRDtRQUNFLFNBQVMsRUFBRSxnQkFBZ0I7S0FDNUIsQ0FDRixDQUFDO0lBRUYsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQyxDQUFDIn0=