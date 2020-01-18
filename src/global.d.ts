declare function lint(json: string): Problem[];

declare interface Problem {
    code: string;
    error: string;
    location: Location;
}

declare interface Location {
    start: StartEnd;
    end: StartEnd;
}

declare interface StartEnd {
    line: number;
    column: number;
    offset: number;
}
