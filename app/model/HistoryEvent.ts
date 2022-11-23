import { HistoryEvent as HistoryEventInterface } from './index';
import { ModelDefined } from 'sequelize';

export default (
  app
): ModelDefined<HistoryEventInterface, HistoryEventInterface> => {
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
