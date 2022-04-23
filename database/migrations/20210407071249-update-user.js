

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('user', 'nickname', {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      }, { transaction });
      await queryInterface.addColumn('user', 'mobile', {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        unique: true,
      }, { transaction });
      await queryInterface.addColumn('user', 'password', {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      }, { transaction });
      await queryInterface.addColumn('user', 'address', {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      }, { transaction });
      await queryInterface.addColumn('user', 'gender', {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      }, { transaction });
      await queryInterface.addColumn('user', 'is_admin', {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      }, { transaction });
      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('user', 'nickname', { transaction: t }),
        queryInterface.removeColumn('user', 'mobile', { transaction: t }),
        queryInterface.removeColumn('user', 'password', { transaction: t }),
        queryInterface.removeColumn('user', 'address', { transaction: t }),
        queryInterface.removeColumn('user', 'gender', { transaction: t }),
        queryInterface.removeColumn('user', 'is_admin', { transaction: t }),
      ]);
    });
  },
};
