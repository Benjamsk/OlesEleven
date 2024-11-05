export interface AuctionDistribution {
    privateValue(): number;
    firstPriceSealedBid(value: number, numberOfBidders: number): number;
    secondPriceSealedBid(value: number, numberOfBidders: number): number;
    thirdPriceSealedBid(value: number, numberOfBidders: number): number;
    probability(value: number): number;
    cummulativeProbability(value: number): number;
}

export class Uniform implements AuctionDistribution {
    public privateValue() : number {
        return Math.random();
    }

    public firstPriceSealedBid(value: number, numberOfBidders: number) : number {
        return value * (numberOfBidders - 1) / numberOfBidders;
    }

    public secondPriceSealedBid(value: number, numberOfBidders: number) : number {
        return value;
    }

    public thirdPriceSealedBid(value: number, numberOfBidders: number) : number {
        return value * (numberOfBidders - 1) / (numberOfBidders - 2);
    }

    public probability(value: number): number {
        return 1;
    }
    
    public cummulativeProbability(value: number): number {
        return value;
    }
}

export class Linear implements AuctionDistribution {
    public privateValue() : number {
        return Math.sqrt(Math.random());
    }

    public firstPriceSealedBid(value: number, numberOfBidders: number) : number {
        return value * ((2 * numberOfBidders - 2) / (2 * numberOfBidders - 1));
    }

    public secondPriceSealedBid(value: number, numberOfBidders: number) : number {
        return value;
    }

    public thirdPriceSealedBid(value: number, numberOfBidders: number) : number {
        return value * ((3 * numberOfBidders - 3) / (3 * numberOfBidders - 2));
    }

    public probability(value: number): number {
        return 2 * value;
    }
    
    public cummulativeProbability(value: number): number {
        return Math.pow(value, 2);
    }
}

export class InverseSquareRoot implements AuctionDistribution {
    public privateValue(): number {
        return Math.pow(Math.random(), 2);
    }

    public firstPriceSealedBid(value: number, numberOfBidders: number): number {
        return value * (numberOfBidders - 1) / (numberOfBidders + 1);
    }

    public secondPriceSealedBid(value: number, numberOfBidders: number): number {
        return value;
    }

    public thirdPriceSealedBid(value: number, numberOfBidders: number): number {
        return value * (numberOfBidders - 1) / (numberOfBidders + 2);
    }

    public probability(value: number): number {
        return 0.5 * Math.pow(value, -0.5);
    }
    
    public cummulativeProbability(value: number): number {
        return Math.pow(value, 0.5);
    }
}

export interface Bidder {
    privateValue: number;
    bidValue: number;
}

export class AuctionGenerator {
    private numberOfBidders: number;
    private distribution: AuctionDistribution;

    constructor(numberOfBidders: number, distribution: AuctionDistribution) {
        this.numberOfBidders = numberOfBidders;
        this.distribution = distribution;
    }

    public generateFirstPriceSealedBidBidders() : Bidder[] {
        const bidders: Bidder[] = [];
        for (let i = 0; i < this.numberOfBidders; i++) {
            const privateValue = this.distribution.privateValue();
            const bidValue = this.distribution.firstPriceSealedBid(privateValue, this.numberOfBidders);
            bidders.push({privateValue, bidValue});
        }

        return bidders.sort((a, b) => b.bidValue - a.bidValue)
    }

    public generateSecondPriceSealedBidBidders() : Bidder[] {
        const bidders: Bidder[] = [];
        for (let i = 0; i < this.numberOfBidders; i++) {
            const privateValue = this.distribution.privateValue();
            const bidValue = this.distribution.secondPriceSealedBid(privateValue, this.numberOfBidders);
            bidders.push({privateValue, bidValue});
        }

        return bidders.sort((a, b) => b.bidValue - a.bidValue)
    }

    public generateThirdPriceSealedBidBidders() : Bidder[] {
        const bidders: Bidder[] = [];
        for (let i = 0; i < this.numberOfBidders; i++) {
            const privateValue = this.distribution.privateValue();
            const bidValue = this.distribution.thirdPriceSealedBid(privateValue, this.numberOfBidders);
            bidders.push({privateValue, bidValue});
        }

        return bidders.sort((a, b) => b.bidValue - a.bidValue)
    }
}