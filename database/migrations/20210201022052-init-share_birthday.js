

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('share_birthday', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      share_birthday_id: {
        type: INTEGER,
      },
      share_birthday_add_id: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    }, {
      indexes: [{ fields: [ 'share_birthday_id' ] }, { fields: [ 'share_birthday_add_id' ] }],
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('share_birthday');
  },
};
