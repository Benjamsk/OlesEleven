export interface AuctionDistribution {
    privateValue(): number;
    firstPriceSealedBid(value: number, numberOfBidders: number): number;
    secondPriceSealedBid(value: number): number;
    probability(value: number): number;
    cumulativeProbability(value: number): number;
}

export class Uniform implements AuctionDistribution {
    public privateValue() : number {
        return Math.random();
    }

    public firstPriceSealedBid(value: number, numberOfBidders: number) : number {
        return value * (numberOfBidders - 1) / numberOfBidders;
    }

    public secondPriceSealedBid(value: number) : number {
        return value;
    }

    public probability(value: number): number {
        return 1;
    }
    
    public cumulativeProbability(value: number): number {
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

    public secondPriceSealedBid(value: number) : number {
        return value;
    }

    public probability(value: number): number {
        return 2 * value;
    }
    
    public cumulativeProbability(value: number): number {
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

    public secondPriceSealedBid(value: number): number {
        return value;
    }

    public probability(value: number): number {
        return 0.5 * Math.pow(value, -0.5);
    }
    
    public cumulativeProbability(value: number): number {
        return Math.pow(value, 0.5);
    }
}

export class Square implements AuctionDistribution {
    public privateValue(): number {
        return Math.pow(Math.random(), (1/3));
    }

    public firstPriceSealedBid(value: number, numberOfBidders: number): number {
        return value * ((3 * numberOfBidders - 3) / (3 * numberOfBidders - 2));
    }

    public secondPriceSealedBid(value: number): number {
        return value;
    }

    public probability(value: number): number {
        return Math.pow(value, 2);
    }
    
    public cumulativeProbability(value: number): number {
        return Math.pow(value, 3);
    }
}

export interface Bidder {
    privateValue: number;
    bidValue: number;
}

export class AuctionGenerator {
    private numberOfBidders: number;
    private auctionDistribution: AuctionDistribution;

    constructor(numberOfBidders: number, distribution: AuctionDistribution) {
        this.numberOfBidders = numberOfBidders;
        this.auctionDistribution = distribution;
    }

    public generateFirstPriceSealedBidBidders() : Bidder[] {
        const bidders: Bidder[] = [];
        for (let i = 0; i < this.numberOfBidders; i++) {
            const privateValue = this.auctionDistribution.privateValue();
            const bidValue = this.auctionDistribution.firstPriceSealedBid(privateValue, this.numberOfBidders);
            bidders.push({privateValue, bidValue});
        }

        return bidders.sort((a, b) => b.bidValue - a.bidValue)
    }

    public generateSecondPriceSealedBidBidders() : Bidder[] {
        const bidders: Bidder[] = [];
        for (let i = 0; i < this.numberOfBidders; i++) {
            const privateValue = this.auctionDistribution.privateValue();
            const bidValue = this.auctionDistribution.secondPriceSealedBid(privateValue);
            bidders.push({privateValue, bidValue});
        }

        return bidders.sort((a, b) => b.bidValue - a.bidValue)
    }
}