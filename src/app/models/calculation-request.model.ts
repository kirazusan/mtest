package app.models;

import { IsString, IsArray, IsNumber, IsOptional, IsInt, Min } from 'class-validator';

export class CalculationRequest {
    @IsString()
    public operation: string;

    @IsArray()
    @IsNumber({}, { each: true })
    public operands: number[];

    @IsOptional()
    @IsInt()
    @Min(0)
    public precision?: number;

    constructor(operation: string, operands: number[], precision?: number) {
        this.operation = operation;
        this.operands = operands;
        this.precision = precision;
    }
}