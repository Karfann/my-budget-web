export class Transaction {
    constructor(
        public id: number,
        public date: Date,
        public description: string,
        public note: string,
        public amount: number,
        public account_id: number,
        public created_at?: Date,
        public updated_at?: Date
    ) { }
}
