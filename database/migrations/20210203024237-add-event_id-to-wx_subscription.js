'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('wx_subscription', 'event_id', {
        type: Sequelize.DataTypes.INTEGER,
      }, { transaction });
      await queryInterface.addIndex('wx_subscription', [ 'event_id' ], {
        fields: 'event_id_index',
        transaction,
      });
      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('wx_subscription', 'event_id', { transaction: t }),
      ]);
    });
  },
};
