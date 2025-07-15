package app.models;

export class CalculationResult {
    constructor(
        public id: number,
        public value: number,
        public status: string,
        public timestamp: Date
    ) {}
}