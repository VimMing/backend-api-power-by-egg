'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'my_friend',
        'friend_id',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true,
        },
        { transaction }
      );
      await queryInterface.addIndex('my_friend', ['friend_id'], {
        fields: 'friend_id_index',
        transaction,
      }),
        await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('my_friend', 'friend_id', {
          transaction: t,
        }),
      ]);
    });
  },
};
