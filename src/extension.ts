import * as vscode from 'vscode';
import { sortProperties } from './sort';

// Create a status bar item to display the sort button
let cssSortButton: vscode.StatusBarItem;

/**
 * This method is called when your extension is activated.
 * @param context The extension context provided by VS Code.
 */
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "css-property-sorter" is now active!');
	
	cssSortButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	cssSortButton.command = 'css-property-sorter.sort';
	cssSortButton.text = 'CSS Sort';
	cssSortButton.tooltip = 'Sort CSS properties';
	cssSortButton.show();
	
	let sortCommand: vscode.Disposable = vscode.commands.registerCommand('css-property-sorter.sort', () => {
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
