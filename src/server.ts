import {
    createConnection,
    ProposedFeatures,
    TextDocuments,
    TextDocument,
    Diagnostic,
    DiagnosticSeverity,
    DidChangeConfigurationParams
} from 'vscode-languageserver';

import { basename } from 'path';

import { ExampleConfiguration, Severity, RuleKeys } from './configuration';

const customLinter = require('../lib/linter/linter.js');

const conn = createConnection(ProposedFeatures.all);
const docs = new TextDocuments();
let conf: ExampleConfiguration | undefined;

conn.onInitialize(() => {
    return {
        capabilities: {
            textDocumentSync: 1
        }
    };
});

function GetSeverity(code: string): DiagnosticSeverity | undefined {
    if (!conf || !conf.severity) {
        return undefined;
    }

    let key: RuleKeys;

    switch (code) {
        case 'WARNING.TEXT_SIZES_SHOULD_BE_EQUAL':
            key = RuleKeys.TextSizesShoulBeEqual;
            break;
        case 'WARNING.INVALID_BUTTON_SIZE':
            key = RuleKeys.InvalidButtonSize;
            break;
        case 'WARNING.INVALID_BUTTON_POSITION':
            key = RuleKeys.InvalidButtonPosition;
            break;
        case 'WARNING.INVALID_PLACEHOLDER_SIZE':
            key = RuleKeys.InvalidPlaceholderSize;
            break;
        case 'TEXT.SEVERAL_H1':
            key = RuleKeys.SeveralH1;
            break;
        case 'TEXT.INVALID_H2_POSITION':
            key = RuleKeys.InvalidH2Position;
            break;
        case 'TEXT.INVALID_H3_POSITION':
            key = RuleKeys.InvalidH3Position;
            break;
        case 'GRID.TOO_MUCH_MARKETING_BLOCKS':
            key = RuleKeys.TooMuchMarketingBlocks;
            break;
        default:
            return undefined;
    }

    const severity: Severity = conf.severity[key];

    switch (severity) {
        case Severity.Error:
            return DiagnosticSeverity.Error;
        case Severity.Warning:
            return DiagnosticSeverity.Warning;
        case Severity.Information:
            return DiagnosticSeverity.Information;
        case Severity.Hint:
            return DiagnosticSeverity.Hint;
        default:
            return undefined;
    }
}

async function validateTextDocument(textDocument: TextDocument): Promise<void> {
    const source = basename(textDocument.uri);
    const json = textDocument.getText();

    const problemList = lint(json);
    const diagnostics: Diagnostic[] = [];

    problemList.forEach((problem: Problem) => {
        const severity = GetSeverity(problem.code);

        if (severity) {
            diagnostics.push({
                range: {
                    start: textDocument.positionAt(problem.location.start.offset),
                    end: textDocument.positionAt(problem.location.end.offset)
                },
                code: problem.code,
                message: problem.error,
                severity,
                source
            });
        }
    });

    conn.sendDiagnostics({ uri: textDocument.uri, diagnostics });
}

async function validateAll() {
    for (const document of docs.all()) {
        await validateTextDocument(document);
    }
}

docs.onDidChangeContent((change) => {
    validateTextDocument(change.document);
});

conn.onDidChangeConfiguration(({ settings }: DidChangeConfigurationParams) => {
    conf = settings.example;
    validateAll();
});

docs.listen(conn);
conn.listen();
