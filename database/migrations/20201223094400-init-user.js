
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('user', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      open_id: {
        type: STRING(255),
        unique: true,
      },
      created_at: DATE,
      updated_at: DATE,
    }, {
      indexes: [{ unique: true, fields: [ 'open_id' ] }],
    });
  },

  down: async queryInterface => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('user');
  },
};
