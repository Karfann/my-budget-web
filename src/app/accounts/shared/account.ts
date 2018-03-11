export class Account {
    constructor(
        public id: number,
        public name: string,
        public balance: number,
        public isActive: boolean,
        public created_at?: Date,
        public updated_at?: Date
    ) { }
}
