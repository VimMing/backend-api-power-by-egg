

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('my_friend', 'share_code', {
        type: Sequelize.DataTypes.STRING,
      }, { transaction });
      await queryInterface.addIndex('my_friend', [ 'share_code' ], {
        unique: true,
        fields: 'share_code_index',
        transaction,
      }),
      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('my_friend', 'share_code', { transaction: t }),
      ]);
    });
  },
};
