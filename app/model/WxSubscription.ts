import { WxSubscription as WxSubscriptionInterface } from './index';
import { ModelDefined } from 'sequelize';
export default (
  app
): ModelDefined<WxSubscriptionInterface, WxSubscriptionInterface> => {
  const { STRING, INTEGER, DATE, JSON } = app.Sequelize;

  const WxSubscription = app.model.define(
    'WxSubscription',
    {
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
      status: INTEGER, // 0 , 1 success, 2 fail
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
    },
    {
      tableName: 'wx_subscription',
    }
  );
  return WxSubscription;
};
