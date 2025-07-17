import { SomeDependency } from 'some-module';

export interface MauiApp {
    id: string;
    name: string;
    version: string;
    description?: string;
    initialize(): void;
    start(): void;
    stop(): void;
}