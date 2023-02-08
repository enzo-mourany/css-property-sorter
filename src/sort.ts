import * as vscode from 'vscode';
import { ORDERED_PROPERTIES } from './orderedProperties';

/**
* Sorts the CSS properties within the active text editor.
* @returns void
*/
export const sortProperties = (): void => {
  // Get the active text editor
  let editor = vscode.window.activeTextEditor as vscode.TextEditor;
  let document = editor.document;
  
  // Get the text within the active text editor
  let text: string = document.getText();
  let lines: string[] = text.split('\n');
  
  // Initialize an empty array to store the sorted lines
  let sortedLines: string[] = [];
  
  let i: number = 0;
  while (i < lines.length) {
    let line: string = lines[i];
    
    // Use regular expression to extract current indentation for the selector
    let indentationMatch = line.match(/^\s+/) as RegExpMatchArray;
    let indentation: string = indentationMatch ? indentationMatch[0] : '';
    
    // get the indentation in vscode settings (CSS file only)
    let workspaceIndentation: number = vscode.workspace.getConfiguration('editor').get('tabSize') as number;
    for (let j: number = 0; j < workspaceIndentation; j++) {
      indentation += ' ';
    }
    
    // Check if the line is a CSS selector
    if (line.trim().endsWith('{') && !line.trim().startsWith('@')) {
      let selector: string = line.trim();
      let properties: string[] = [];
      let nextLine: string = lines[i + 1];
      
      while (!nextLine.trim().endsWith('}') && !nextLine.trim().endsWith('{')) {
        // Check if the next line is a CSS property
        if (nextLine.trim().includes(':')) {
          indentationMatch = nextLine.match(/^\s+/) as RegExpMatchArray;
          indentation = indentationMatch ? indentationMatch[0] : '' as string;
          properties.push(nextLine.trim());
        }
        i++;
        nextLine = lines[i + 1];
      }
      
      // Sort the properties according to the ORDERED_PROPERTIES constant
      let seenProperties: Set<string> = new Set();
      properties = properties.filter(prop => {
        let propName: string = prop.split(':')[0].trim();
        if (seenProperties.has(propName)) {
          return false;
        }
        seenProperties.add(propName);
        return true;
      });
      properties.sort((a, b) => {
        let aProp: string = a.split(':')[0].trim();
        let bProp: string = b.split(':')[0].trim();
        return ORDERED_PROPERTIES.indexOf(aProp) - ORDERED_PROPERTIES.indexOf(bProp);
      });
      
      // Add the selector and sorted properties to the sortedLines array
      if (document.languageId === 'css') {
        sortedLines.push(selector);
      } else if (document.languageId === 'scss') {
        // scss indentation
        let selectorIndent: string = '';
        for (let j: number = 0; j < indentation.split('').length - workspaceIndentation; j++) {
          selectorIndent += ' ';
        }
        // remove selectorIdent from indentation
        sortedLines.push(selectorIndent + selector);
      }
      
      // Add the properties to the sortedLines array
      for (let prop of properties) {
        sortedLines.push(indentation + prop);
      }
      if(lines[i + 1] && lines[i + 1].trim() !== '}') {
        if (document.languageId === 'css') {
          sortedLines.push('}');
        }
      }
      i++;
    } else if (line.trim().startsWith('@') && !line.trim().startsWith('@import')) {
      // Check if the line is a CSS at-rule
      let closeBracket: number = 0;
      while (closeBracket < 2) {
        if (line.trim().endsWith('{')) {
          closeBracket++;
        } else if (line.trim().endsWith('}')) {
          closeBracket--;
        }
        sortedLines.push(line);
        i++;
        line = lines[i];
      }
    } else {
      sortedLines.push(line);
      i++;
    }
  }
  
  // Replace the text within the active text editor with the sorted lines		
  let newText: string = sortedLines.join('\n');
  editor.edit(editBuilder => {
    editBuilder.replace(new vscode.Range(0, 0, document.lineCount, 0), newText);
  });
};
