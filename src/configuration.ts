export enum RuleKeys {
    TextSizesShoulBeEqual = 'textSizesShoulBeEqual',
    InvalidButtonSize = 'invalidButtonSize',
    InvalidButtonPosition = 'invalidButtonPosition',
    InvalidPlaceholderSize = 'invalidPlaceholderSize',
    SeveralH1 = 'severalH1',
    InvalidH2Position = 'invalidH2Position',
    InvalidH3Position = 'invalidH3Position',
    TooMuchMarketingBlocks = 'tooMuchMarketingBlocks',
}

export enum Severity {
    Error = 'Error',
    Warning = 'Warning',
    Information = 'Information',
    Hint = 'Hint',
    None = 'None'
}

export interface SeverityConfiguration {
    [RuleKeys.TextSizesShoulBeEqual]: Severity;
    [RuleKeys.InvalidButtonSize]: Severity;
    [RuleKeys.InvalidButtonPosition]: Severity;
    [RuleKeys.InvalidPlaceholderSize]: Severity;
    [RuleKeys.SeveralH1]: Severity;
    [RuleKeys.InvalidH2Position]: Severity;
    [RuleKeys.InvalidH3Position]: Severity;
    [RuleKeys.TooMuchMarketingBlocks]: Severity;
}

export interface ExampleConfiguration {

    enable: boolean;

    severity: SeverityConfiguration;
}
