/**
 * 主鍵使用 id（uuid）
 *
 * 欄位
 * score: integer 必填
 * retake_score: integer 可為空（補考分數，加分挑戰新增欄位）
 *
 * 關聯：student_id → STUDENT、subject_id → SUBJECT（皆必填，一筆成績對應一位學生與一個科目）
 */
const { EntitySchema } = require('typeorm')

module.exports = new EntitySchema({
  name: 'Grade',
  tableName: 'GRADE',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    score: {
      type: 'integer',
      nullable: false,
    },
    retake_score: {
      type: 'integer',
      nullable: true,
    },
  },
  relations: {
    student: {
      type: 'many-to-one',
      target: 'Student',
      joinColumn: { name: 'student_id' },
      nullable: false,
    },
    subject: {
      type: 'many-to-one',
      target: 'Subject',
      joinColumn: { name: 'subject_id' },
      nullable: false,
    },
  },
})
