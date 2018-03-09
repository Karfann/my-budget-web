export class Log {
    constructor(
        public type: LogType,
        public message: string
    ) { }
}

export enum LogType {
    Error,
    Log,
    Warn
}
