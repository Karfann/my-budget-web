export class Alert {
    constructor(
        public type: AlertType,
        public message: string
    ) { }
}

export enum AlertType {
    Error = 'danger',
    Info = 'info',
    Success = 'success',
    Warning = 'warning'
}
