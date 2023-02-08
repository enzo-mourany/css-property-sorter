import * as vscode from 'vscode';
import { sortProperties } from './sort';

// Create a status bar item to display the sort button
let cssSortButton: vscode.StatusBarItem;

/**
* This method is called when your extension is activated.
* @param context The extension context provided by VS Code.
*/
export function activate(context: vscode.ExtensionContext) {
	cssSortButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	cssSortButton.command = 'css-property-sorter.sortProperties' as string | vscode.Command;
	cssSortButton.text = 'CSS Sort' as string;
	cssSortButton.tooltip = 'Sort CSS properties' as string | vscode.MarkdownString;
	cssSortButton.show();
	
	let sortCommand: vscode.Disposable = vscode.commands.registerCommand('css-property-sorter.sortProperties', () => {
		if (!vscode.window.activeTextEditor) {
			vscode.window.showErrorMessage('Please open a file to sort');
			return;
		}
		if (vscode.window.activeTextEditor?.document.languageId !== 'css' && vscode.window.activeTextEditor?.document.languageId !== 'scss') {
			vscode.window.showErrorMessage('Please open a CSS or SCSS file to sort');
			return;
		}
		vscode.window.showInformationMessage('Do you want to sort your CSS properties?', 'Cancel', 'Run').then(val => {
			if (val === 'Run') {
				sortProperties();
			}
		});
	});
	
	context.subscriptions.push(sortCommand, cssSortButton);
}

export function deactivate() {
	cssSortButton.dispose();
}
