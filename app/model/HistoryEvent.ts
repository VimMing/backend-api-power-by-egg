import { sequlizeModel, HistoryEvent as HistoryEventInterface } from './index';

export default (app): sequlizeModel<HistoryEventInterface> => {
  const { JSON, DATE, STRING } = app.Sequelize;

  const HistoryEvent = app.model.define(
    'HistoryEvent',
    {
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
    },
    {
      tableName: 'history_event',
    }
  );

  return HistoryEvent;
};
