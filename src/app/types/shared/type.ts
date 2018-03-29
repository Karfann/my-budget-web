export class Type {
    constructor(
        public id: number,
        public name: string,
        public isActive: boolean,
        public value: number,
        public created_at?: Date,
        public updated_at?: Date
    ) { }
}
