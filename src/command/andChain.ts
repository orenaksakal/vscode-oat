import * as vscode from 'vscode';

function transformToAndChain(diagnosticCollection: vscode.DiagnosticCollection) {
    return vscode.commands.registerCommand('vscode-oat.transformToAndChain', () => {
        diagnosticCollection.clear();
        const editor = vscode.window.activeTextEditor;
        const selection = editor.selection;
        const selectedRange = new vscode.Range(
            selection.start,
            selection.end
        );
        const str = editor.document.getText(selectedRange);

        function parse(text: String) {
            let container: Array<String> = [];

            text.split(/(\.|\(.*?\)|\[.*?\])/g).forEach((item, index) => {
                if (index === 0) {
                    container.push(item);
                } else if (item !== '') {
                    container.push(container.slice(-1, index) + item);
                }
            });

            return container.filter(el => el.slice(-1) !== '.').join(' && ');
        }

        if (!editor) {
            vscode.window.showWarningMessage(
                'You can only use vscode-oat within a document'
            );

        } else {
            try {
                editor.edit((editBuilder: vscode.TextEditorEdit) => editBuilder.replace(selection, parse(str))).then(() => editor.document.save());
            } catch (error) {
                const diagnostic = new vscode.Diagnostic(selectedRange, `[vscode-oat]: ${error.message}`, vscode.DiagnosticSeverity.Error);
                diagnosticCollection.set(editor.document.uri, [diagnostic]);
            }
        }
    }
    );
}
export default transformToAndChain;
