import * as vscode from 'vscode';
import { ORDERED_PROPERTIES } from './orderedProperties';

/**
 * Sorts the CSS properties within the active text editor.
 * @returns void
 */
export const sortProperties = (): string[] => {
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

  return sortedLines;
};