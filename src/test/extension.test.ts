import * as assert from "assert";
import * as myExtension from "../extension";
import * as fs from "fs";
import * as path from "path";

suite("Mojify Test Suite", () => {
	let testFilePath: fs.PathLike;
	let expectedFilePath: fs.PathLike;

	teardown(() => {
		// Delete the test file
		if (fs.existsSync(testFilePath)) {
			fs.unlinkSync(testFilePath);
		}
		if (fs.existsSync(expectedFilePath)) {
			fs.unlinkSync(expectedFilePath);
		}
	});

	// TODO: needs improvment
	test("File extension is replaced", async () => {
		// Run extension
		myExtension.activate();

		// Create a test file
		fs.writeFileSync(testFilePath, "");

		testFilePath = path.resolve(__dirname, "./test.mj");
		expectedFilePath = path.resolve(__dirname, "./test.🔥");

		await setTimeout(() => {}, 2000);
		// Check that the file has been renamed
		assert.ok(fs.existsSync(expectedFilePath));
	});
});
