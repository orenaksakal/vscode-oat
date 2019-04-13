import * as vscode from 'vscode';

export function transform5to6(
    diagnosticCollection: vscode.DiagnosticCollection
) {
    return vscode.commands.registerCommand(
        'stringtransformer.transform5to6',
        () => {
            diagnosticCollection.clear();

            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showWarningMessage(
                    'You can only use extension within a document'
                );
                return;
            }
            const selection = editor.selection;

            const selectedRange = new vscode.Range(
                selection.start,
                selection.end
            );

            const str = editor.document.getText(selectedRange);

            function split(text: String) {
                let container:Array<String> = [];

                text.split(/(\.|\(.*?\)|\[.*?\])/g).forEach((item, index) => {
                    if (index === 0) {
                        container.push(item);
                    } else if (item !== '') {
                        container.push(container.slice(-1, index) + item);
                    }
                });

                return container
                    .filter(el => {
                        return el.slice(-1) !== '.';
                    })
                    .join(' && \n');
            }

            try {
                const result = split(str);
                editor
                    .edit((editBuilder: vscode.TextEditorEdit) => {
                        editBuilder.replace(selection, result);
                    })
                    .then(result => editor.document.save());
            } catch (error) {
                const diagnostic = new vscode.Diagnostic(
                    selectedRange,
                    `[string-transformer]: ${error.message}`,
                    vscode.DiagnosticSeverity.Error
                );
                diagnosticCollection.set(editor.document.uri, [diagnostic]);
            }
        }
    );
}
