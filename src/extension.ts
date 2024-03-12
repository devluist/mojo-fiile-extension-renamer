import * as vscode from "vscode";

const SHORT_EXTENSION = ".mj";
const FIRE_EXTENSION = ".🔥";
const MOJO_EXTENSION = ".mojo";

export function activate() {
	vscode.workspace.onWillCreateFiles((ev) => {
		const filePath = ev.files[0].fsPath;
		if (filePath.endsWith(SHORT_EXTENSION)) {
			let we = new vscode.WorkspaceEdit();

			const replaceWithMojo = vscode.workspace
				.getConfiguration("replaceWith")
				.get("mojo");
			const newExtension = replaceWithMojo
				? MOJO_EXTENSION
				: FIRE_EXTENSION;
			const newFilePath = filePath.replace(SHORT_EXTENSION, newExtension);

			const fileUri = vscode.Uri.file(filePath);
			const newFileUri = vscode.Uri.file(newFilePath);
			we.renameFile(fileUri, newFileUri, {
				overwrite: false,
				ignoreIfExists: true,
			});
			vscode.workspace.applyEdit(we);
		}
	});
}
