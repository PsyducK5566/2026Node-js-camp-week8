/**
 * 主鍵使用 id（uuid）
 *
 * 欄位
 * name: varchar(50) 必填且唯一
 *
 * 關聯：無
 */

const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
	name: "Skill",

	tableName: "SKILL",

	columns: {
		id: {
			type: "uuid",
			primary: true,
			generated: "uuid",
		},
		name: {
			type: "varchar",
			length: 50,
			nullable: false,
			unique: true,
		},
	},
});
