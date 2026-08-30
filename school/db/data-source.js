require('dotenv').config()
const { DataSource } = require('typeorm')

const Class = require('../entities/Class')
const Subject = require('../entities/Subject')
const Student = require('../entities/Student')
const Grade = require('../entities/Grade')

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5433),
  username: process.env.DB_USERNAME || 'student',
  password: process.env.DB_PASSWORD || 'student666',
  database: process.env.DB_DATABASE || 'school',

  // ⚠️ 鐵律：synchronize 固定為 false，將 ORM 自動同步結構關閉，避免它動到正式資料；結構一律走 Migration
  synchronize: false,

  entities: [
    Class,
    Subject,
    Student,
    Grade,
  ],
  migrations: ['db/migrations/*.js'],
})

module.exports = { dataSource }
