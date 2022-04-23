

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { JSON, DATE, STRING } = Sequelize;
    await queryInterface.createTable('history_event', {
      date: { type: STRING(8), primaryKey: true },
      events: {
        type: JSON,
      },
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('history_event');
  },
};
