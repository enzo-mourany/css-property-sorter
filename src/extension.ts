import * as vscode from 'vscode';

let cssSortButton: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "css-property-sorter" is now active!');
	
	cssSortButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	cssSortButton.command = 'css-property-sorter.sort';
	cssSortButton.text = 'CSS Sort';
	cssSortButton.tooltip = 'Sort CSS properties';
	cssSortButton.show();
	
	let sortCommand = vscode.commands.registerCommand('css-property-sorter.sort', () => {
		vscode.window.showInformationMessage('Do you want to sort your CSS properties?', 'Cancel', 'Run').then(val => {
			if (val === 'Run') {
				// Code to sort CSS properties here
				vscode.window.showInformationMessage('CSS properties sorted!');
			}
		});
	});
	
	context.subscriptions.push(sortCommand, cssSortButton);
}

export function deactivate() {
	cssSortButton.dispose();
}
