"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    const { JSON, DATE, STRING } = app.Sequelize;
    const HistoryEvent = app.model.define('HistoryEvent', {
        date: { type: STRING, primaryKey: true },
        events: {
            type: JSON,
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
        tableName: 'history_event',
    });
    return HistoryEvent;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGlzdG9yeUV2ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiSGlzdG9yeUV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWUsQ0FBQyxHQUFHLEVBQXdDLEVBQUU7SUFDM0QsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUU3QyxNQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FDbkMsY0FBYyxFQUNkO1FBQ0UsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO1FBQ3hDLE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxJQUFJO1NBQ1g7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssRUFBRSxZQUFZO1NBQ3BCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLElBQUk7WUFDVixLQUFLLEVBQUUsWUFBWTtTQUNwQjtLQUNGLEVBQ0Q7UUFDRSxTQUFTLEVBQUUsZUFBZTtLQUMzQixDQUNGLENBQUM7SUFFRixPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDLENBQUMifQ==