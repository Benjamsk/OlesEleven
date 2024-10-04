const MAX_UNSIGNED_INT = 4294967295;
const MAGIC_NUMBER = 0x6D2B79F5;

export class Random {
    public hash: number;

    constructor(seed?: number) {
        this.hash = Math.floor(Math.abs(seed || 0) * MAX_UNSIGNED_INT) >>> 0;
    }

    public next(): number {
        this.hash = (this.hash + MAGIC_NUMBER) >>> 0;
        
        let imul = Math.imul(this.hash ^ (this.hash >>> 15), 1 | this.hash);
        imul = imul + Math.imul(imul ^ (imul >>> 7), 61 | imul) ^ imul;
        
        return ((imul ^ (imul >>> 14)) >>> 0) / (MAX_UNSIGNED_INT + 1);
    }

    public static seededRandom(seed?: number): number {
        return new Random(seed).next();
    }
}