export {};

declare global {
    interface Array<T> {
        Average(this: Array<number>): number;
        SampleVariance(this: Array<number>): number;
    }
}

export function Average(this: Array<number>): number {
    return this.length === 0 ? 0 : this.reduce((a, b) => a + b, 0) / this.length;
}

export function SampleVariance(this: Array<number>): number {
    const average = this.Average();
    return this.length <= 1 ? 0 : this.reduce((a, b) => a + Math.pow(b - average, 2), 0) / (this.length - 1);
}

Array.prototype.Average = Average;
Array.prototype.SampleVariance = SampleVariance;