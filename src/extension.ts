import * as vscode from 'vscode';

let cssSortButton: vscode.StatusBarItem;

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
				const ORDERED_PROPERTIES: string[] = [
					'content',
					// flexbox properties
					'display',
					'flex-direction',
					'flex-wrap',
					'flex-flow',
					'justify-content',
					'align-items',
					'align-content',
					'gap',
					'row-gap',
					'column-gap',
					'order',
					'flex-grow',
					'flex-shrink',
					'flex-basis',
					'flex',
					'align-self',
					// grid properties
					'grid',
					'grid-template',
					'grid-template-rows',
					'grid-template-columns',
					'grid-template-areas',
					'grid-auto-rows',
					'grid-auto-columns',
					'grid-auto-flow',
					'grid-gap',
					'grid-row-gap',
					'grid-column-gap',
					'grid-area',
					'grid-row',
					'grid-row-start',
					'grid-row-end',
					'grid-column',
					'grid-column-start',
					'grid-column-end',
					'grid-template-rows',
					'grid-template-columns',
					'grid-template-areas',
					// positioning properties
					'position',
					'z-index',
					'top',
					'bottom',
					'left',
					'right',
					'float',
					'clear',
					// Visibility properties
					'visibility',
					'opacity',
					'transform',
					// Clipping properties
					'overflow',
					'overflow-x',
					'overflow-y',
					'clip',
					'clip-path',
					// Box properties
					'box-sizing',
					'width',
					'min-width',
					'max-width',
					'height',
					'min-height',
					'max-height',
					'margin',
					'margin-top',
					'margin-right',
					'margin-bottom',
					'margin-left',
					'padding',
					'padding-top',
					'padding-right',
					'padding-bottom',
					'padding-left',
					// Animation properties
					'transition',
					'transition-delay',
					'transition-timing-function',
					'transition-duration',
					'transition-property',
					'animation',
					'animation-name',
					'animation-duration',
					'animation-play-state',
					'animation-timing-function',
					'animation-delay',
					'animation-iteration-count',
					'animation-direction',
					// Background properties
					'background',
					'background-color',
					'background-image',
					'background-repeat',
					'background-attachment',
					'background-position',
					'background-position-x',
					'background-position-y',
					'background-clip',
					'background-origin',
					'background-size',
					'cursor',
					// Border properties
					'border',
					'border-top',
					'border-right',
					'border-bottom',
					'border-left',
					'border-width',
					'border-top-width',
					'border-right-width',
					'border-bottom-width',
					'border-left-width',
					'border-style',
					'border-top-style',
					'border-right-style',
					'border-bottom-style',
					'border-left-style',
					'border-color',
					'border-top-color',
					'border-right-color',
					'border-bottom-color',
					'border-left-color',
					'border-radius',
					'border-top-left-radius',
					'border-top-right-radius',
					'border-bottom-right-radius',
					'border-bottom-left-radius',
					'border-image',
					'border-image-source',
					'border-image-slice',
					'border-image-width',
					'border-image-outset',
					'border-image-repeat',
					// Typography properties
					'font-size',
					'font-family',
					'font-style',
					'font-variant',
					'font-weight',
					'font-stretch',
					'font-size-adjust',
					'font',
					'line-height',
					'color',
					'text-align',
					'text-align-last',
					'text-decoration',
					'text-emphasis',
					'text-emphasis-color',
					'text-emphasis-style',
					'text-emphasis-position',
					'text-indent',
					'text-justify',
					'text-outline',
					'text-transform',
					'text-wrap',
					'text-overflow',
					'text-overflow-ellipsis',
					'text-overflow-mode',
					'text-shadow',
					'letter-spacing',
					'word-spacing',
					'word-wrap',
					'word-break',
					'tab-size',
					'hyphens',
					'white-space',
					'vertical-align',
					'list-style',
					'list-style-position',
					'list-style-type',
					'list-style-image',
					'quotes',
					'counter-increment',
					'counter-reset',
				];
				
				// Get the active text editor
				let editor = vscode.window.activeTextEditor as vscode.TextEditor;
				let document = editor.document as vscode.TextDocument;
				
				// Get the text within the active text editor
				let text: string = document.getText();
				let lines: string[] = text.split('\n');
				
				// Initialize an empty array to store the sorted lines
				let sortedLines: string[] = [];
				
				let i: number = 0;
				for (let line of lines) {
					// Check if the line is a CSS selector
					if (line.trim().endsWith('{')) {
						let selector: string = line.trim();
						let properties: string[] = [];
						let nextLine: string = lines[i + 1];
						
						// Get the start and end positions of the CSS selector
						let start: vscode.Position = document.positionAt(document.getText().indexOf(selector));
						let end: vscode.Position = document.positionAt(document.getText().indexOf('}') + 1);
						
						while (!nextLine.trim().endsWith('}')) {
							// Check if the next line is a CSS property
							if (nextLine.trim().includes(':')) {
								properties.push(nextLine.trim());
							}
							i++;
							nextLine = lines[i + 1];
						}
						// Sort the properties according to the ORDERED_PROPERTIES constant
						properties.sort((a, b) => {
							let aProp: string = a.split(':')[0].trim();
							let bProp: string = b.split(':')[0].trim();
							return ORDERED_PROPERTIES.indexOf(aProp) - ORDERED_PROPERTIES.indexOf(bProp);
						});
						// Add the selector and sorted properties to the sortedLines array
						sortedLines.push(selector);
						for (let prop of properties) {
							sortedLines.push(prop);
							
							// Replace the text within the active text editor with the sorted lines
							editor.edit(editBuilder => {
								editBuilder.replace(new vscode.Range(start.line, start.character, end.line, end.character), selector + '\n' + properties.join('\n') + '\n}');
							});
						}
						sortedLines.push('}');
					} else {
						sortedLines.push(line);
					}
				}
				
				// Replace the text within the active text editor with the sorted lines				
				let newText: string = sortedLines.join('\n');
				editor.edit(editBuilder => {
					editBuilder.replace(new vscode.Range(0, 0, document.lineCount, 0), newText);
				});
				
			}
		});
	});
	
	context.subscriptions.push(sortCommand, cssSortButton);
}

export function deactivate() {
	cssSortButton.dispose();
}
