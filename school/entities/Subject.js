/**
 * 主鍵使用 id（uuid）
 *
 * 欄位
 * name: varchar(50) 必填
 *
 * 關聯：無
 */
const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: 'Subject',
  tableName: 'SUBJECT',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    name: {
      type: 'varchar',
      length: 50,
      nullable: false,
    },
  },
})
