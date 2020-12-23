'use strict';
// CREATE TABLE `test`.`user`  (
//   `id` int(0) NOT NULL AUTO_INCREMENT,
//   `open_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
//   `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
//   `birthday` date NOT NULL COMMENT '生日',
//   `is_lunar` tinyint(0) NOT NULL DEFAULT 0 COMMENT '0不是农历 1是农历',
//   `password` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
//   `phone` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
//   PRIMARY KEY (`id`) USING BTREE,
//   UNIQUE INDEX `idKey`(`open_id`) USING BTREE
// ) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

// CREATE TABLE `test`.`my_friend`  (
//   `my_id` int(0) NOT NULL,
//   `friend_id` int(0) NULL DEFAULT NULL,
//   INDEX `myIdKey`(`my_id`) USING BTREE,
//   INDEX `friendIdKey`(`friend_id`) USING BTREE
// ) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
