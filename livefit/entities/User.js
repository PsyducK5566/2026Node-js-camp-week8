/**
 * 主鍵使用 id（uuid）
 *
 * 欄位
 * name: varchar(50) 必填
 * email: varchar(320) 必填且唯一
 * role: varchar(20) 必填
 * created_at、updated_at（建立／更新時間，由系統自動帶入）
 *
 * 關聯：無
 */

const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
	// name: "User"程式碼層級：定義這個實體在專案程式碼（Node.js / TypeScript）中的對應名稱。
	// 用途：設定資料表之間的關聯（如 One-to-Many、Many-to-Many）時，其他實體會透過這個名稱（Target）來引用它。
	name: "User",

	// 資料庫層級：定義這個實體對應到 SQL 資料庫中，實際的資料表名稱（Table Name）。
	// 用途：ORM 產生的 SQL 語法（如 SELECT * FROM USER;）會直接使用這個名稱。
	tableName: "USER",

	columns: {
		id: {
			type: "uuid",
			primary: true,
			generated: "uuid", // 設定當新增資料時，系統會自動在背景產生一組唯一的 UUID 隨機碼，不需要手動賦值。
		},
		name: {
			type: "varchar",
			length: 50,
			nullable: false, // 對應 SQL 的 NOT NULL 約束。本欄位不允許為空值（NULL），在建立或更新資料時為必填項。
		},
		email: {
			type: "varchar",
			length: 320,
			nullable: false,
			unique: true, // 唯一約束（UNIQUE）。確保整個資料庫裡，不能有兩筆資料使用相同的 Email(防止重複註冊）。
		},
		role: {
			type: "varchar",
			length: 20,
			nullable: false,
		},
		created_at: {
			type: "timestamp",
			createDate: true, // 自動化行為：當這筆資料第一次被新增（Insert/Create）到資料庫時，系統會自動擷取當下的伺服器時間並填入，之後不論資料如何修改，這個數值都不會再改變。
		},
		updated_at: {
			type: "timestamp",
			updateDate: true, // 自動化行為：除了在資料第一次建立時會寫入時間外，後續只要這筆資料有任何欄位被修改並儲存（Update/Save），系統就會自動將此欄位更新為當下的最新時間。
		},
	},
});
