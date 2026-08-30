/**
 * 任務 5：Seeder，種一些資料，證明你建立的資料表真的能使用。
 * 規則：可重複執行（先清空、再種入資料），即使執行多次也不會有資料疊加的狀況。
 * 執行順序：一定要先 npm run migration:run（沒有資料表，就無法種資料）
 */
const { dataSource } = require("./data-source");

/** 清空：被 FK 指著的表最後刪（GRADE 先刪，CLASS / SUBJECT 最後刪）。
 *  不用 clear()（TRUNCATE 會被 FK 擋）、不用 delete({})（TypeORM 拒絕空條件）。 */
async function clearAll() {
	const ORDER = ["Grade", "Student", "Class", "Subject"];
	for (const name of ORDER) {
		if (dataSource.hasMetadata(name)) {
			await dataSource.createQueryBuilder().delete().from(name).execute();
		}
	}
}

async function main() {
	await dataSource.initialize();
	await clearAll();

	const classRepo = dataSource.getRepository("Class");
	const subjectRepo = dataSource.getRepository("Subject");
	const studentRepo = dataSource.getRepository("Student");
	const gradeRepo = dataSource.getRepository("Grade");

	// 1. CLASS 兩班
	const classA = await classRepo.save({ name: "一年甲班" });
	const classB = await classRepo.save({ name: "一年乙班" });

	// 2. SUBJECT 兩科
	const math = await subjectRepo.save({ name: "數學" });
	const english = await subjectRepo.save({ name: "英文" });

	// 3. STUDENT 幾位學生（記得接上 class）
	const alice = await studentRepo.save({ name: "小明", class: classA });
	const bob = await studentRepo.save({ name: "小華", class: classA });
	const carol = await studentRepo.save({ name: "小美", class: classB });

	// 4. GRADE 幾筆成績（記得接上 student + subject；小華數學不及格，補考 78 分）
	await gradeRepo.save({ score: 88, student: alice, subject: math });
	await gradeRepo.save({ score: 92, student: alice, subject: english });
	await gradeRepo.save({
		score: 58,
		student: bob,
		subject: math,
		retake_score: 78,
	});
	await gradeRepo.save({ score: 81, student: carol, subject: english });

	console.log("🌱 seed 完成");
	await dataSource.destroy();
}

main().catch((e) => {
	console.error("seed 失敗：", e.message);
	process.exit(1);
});
