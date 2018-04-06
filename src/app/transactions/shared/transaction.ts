export class Transaction {
    constructor(
        public id: number,
        public date: Date,
        public description: string,
        public note: string,
        public amount: number,
        public account_id: number,
        public status_id: number,
        public category_id: number,
        public type_id: number,
        public account_destiny_id: number,
        public created_at?: Date,
        public updated_at?: Date
    ) { }
}
