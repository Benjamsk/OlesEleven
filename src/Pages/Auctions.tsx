import * as React from 'react';
import { AuctionGenerator, Linear, LinearDown, Uniform } from './AuctionDistribution';

import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ConstructionOutlined } from '@mui/icons-material';
import { DatasetElementType } from '@mui/x-charts/internals';

export interface DataPoint {
    x: number;
    y: number;
}

export const Auctions = () => {
    const numberOfAuctions = 1000;
    const numBidders = 10;

    var uniform = new AuctionGenerator(numBidders, new LinearDown());

    
    const secondPriceSealedBidWinners: number[] = [];
    const firstPriceSealedBidWinners: number[] = [];

    for (let i = 0; i < numberOfAuctions; i++) {
        const firstPriceBidders = uniform.generateFirstPriceSealedBidBidders();
        firstPriceSealedBidWinners.push(firstPriceBidders[0].bidValue);

        const secondPriceBidders = uniform.generateSecondPriceSealedBidBidders();
        secondPriceSealedBidWinners.push(secondPriceBidders[1].bidValue);
    }

    const firstPriceAveragePrice = firstPriceSealedBidWinners.reduce((a, b) => a + b, 0) / numberOfAuctions;
    const firstPriceVariance = firstPriceSealedBidWinners.reduce((a, b) => a + Math.pow(b - firstPriceAveragePrice, 2), 0) / (numberOfAuctions - 1);

    const secondPriceAveragePrice = secondPriceSealedBidWinners.reduce((a, b) => a + b, 0) / numberOfAuctions;
    const secondPriceVariance = secondPriceSealedBidWinners.reduce((a, b) => a + Math.pow(b - secondPriceAveragePrice, 2), 0) / (numberOfAuctions - 1);

    console.log('First Price Average Price: ', firstPriceAveragePrice);
    console.log('Second Price Average Price: ', secondPriceAveragePrice);

    const firstPriceSealedBidAuctionWinners: DatasetElementType<number>[] = Array.from({ length: 100 }, (_, i) => ({ x: (i + 1) / 100, y: 0 }));
    firstPriceSealedBidWinners.forEach((value) => {
        const bin = Math.floor(value * 100);
        if (firstPriceSealedBidAuctionWinners[bin]) {
            firstPriceSealedBidAuctionWinners[bin].y += 1;
        } else {
            firstPriceSealedBidAuctionWinners[bin] = { x: value, y: 1 };
        }
    });

    const secondPriceSealedBidAuctionWinners: DatasetElementType<number>[] = Array.from({ length: 100 }, (_, i) => ({ x: (i + 1) / 100, y: 0 }));
    secondPriceSealedBidWinners.forEach((value) => {
        const bin = Math.floor(value * 100);
        if (secondPriceSealedBidAuctionWinners[bin]) {
            secondPriceSealedBidAuctionWinners[bin].y += 1;
        } else {
            secondPriceSealedBidAuctionWinners[bin] = { x: value, y: 1 };
        }
    });


    return (
        <div style={containerStyle}>
            {LineChartWithReferenceLines(firstPriceSealedBidAuctionWinners, 'First Price Sealed Bid Auction', firstPriceAveragePrice, firstPriceVariance)}
            {LineChartWithReferenceLines(secondPriceSealedBidAuctionWinners, 'Second Price Sealed Bid Auction', secondPriceAveragePrice, secondPriceVariance)}
        </div>
    );
};

const containerStyle = {
    textAlign: 'center' as const,
    padding: '20px',
};

const tableStyle = {
    margin: '0 auto',
    borderCollapse: 'collapse' as const,
    width: '50%',
};


export const LineChartWithReferenceLines = (dataset : DatasetElementType<number>[], title: string, averageValue: number, variance: number) => {
    const standardDeviation = Math.sqrt(variance);
    return (
        <div>
            <h2>{title}</h2>
            <h4>Average: {averageValue.toFixed(3)}, Standard Deviation: {standardDeviation.toFixed(3)}</h4>
            <ChartContainer
                width={500}
                height={300}
                series={[
                    { dataKey:'y', type: 'line', curve: 'stepAfter', showMark: false },
                ]}
                dataset={dataset}
                xAxis={[{ dataKey: 'x'}]}
            >
                <LinePlot />
                <MarkPlot />
                <ChartsReferenceLine
                    x={averageValue}
                    lineStyle={{ stroke: 'red' }}
                />
                <ChartsXAxis />
                <ChartsYAxis />
            </ChartContainer>
        </div>
    );
}