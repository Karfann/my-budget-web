export class Status {
    constructor(
        public id: number,
        public name: string,
        public isActive: boolean,
        public created_at?: Date,
        public updated_at?: Date
    ) { }
}
