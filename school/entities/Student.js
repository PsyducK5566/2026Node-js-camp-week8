/**
 * 主鍵使用 id（uuid）
 *
 * 欄位
 * name: varchar(50) 必填
 *
 * 關聯：class_id → CLASS（必填，一個學生屬於一個班級）
 */
const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: 'Student',
  tableName: 'STUDENT',
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
  relations: {
    class: {
      type: 'many-to-one',
      target: 'Class',
      joinColumn: { name: 'class_id' },
      nullable: false,
    },
  },
})
