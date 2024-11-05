import * as React from 'react';
import { useState } from 'react';
import { AuctionGenerator, Linear, InverseSquareRoot, Uniform } from './AuctionDistribution';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';
import { LinePlot, LineChart, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { DatasetElementType } from '@mui/x-charts/internals';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Container } from "@mui/material";
import '../ExtensionMethods/Arrays';
import Box from "@mui/material/Box";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { Typography } from '@mui/material';

export type NumberDataset = {
    values: DatasetElementType<number>[];
    average: number;
    variance: number;
}

export type AuctionSimulationResult = { 
    winningBid: NumberDataset;
    winnnersProfit: NumberDataset;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const NUMBER_OF_AUCTIONS_OPTIONS = [1, 10, 100, 1000, 10000, 100000, 1000000];


export const Auctions = () => {
    const [numberOfBidders, setNumberOfBidders] = useState(2);
    const [numberOfAuctions, setNumberOfAuctions] = useState(100000);
    const [distribution, setDistribution] = useState('Linear');

    const handleNumBiddersChange = (event: SelectChangeEvent) => {
        setNumberOfBidders(parseInt(event.target.value, 10));
    };

    const handleDistributionChange = (event: SelectChangeEvent) => {
        setDistribution(event.target.value);
    };

    const handleNumberOfAuctionsChange = (event: SelectChangeEvent) => {
        setNumberOfAuctions(parseInt(event.target.value, 10));
    }

    var auctionDistribution = distribution === 'Linear' ? new Linear() : distribution === 'Uniform' ? new Uniform() : new InverseSquareRoot();

    var probabilityDistribution : DatasetElementType<number>[] = Array.from({ length: 100 }, (_, i) => ({ x: (i + 1) / 100, y: 0 }));
    var cummulativeProbabilityDistribution : DatasetElementType<number>[] = Array.from({ length: 100 }, (_, i) => ({ x: (i + 1) / 100, y: 0 }));

    for(var i = 0; i < probabilityDistribution.length; i++ ) {
        probabilityDistribution[i].y = auctionDistribution.probability(probabilityDistribution[i].x);
        cummulativeProbabilityDistribution[i].y = auctionDistribution.cummulativeProbability(cummulativeProbabilityDistribution[i].x);
    }

    const { firstPriceAuction, secondPriceAuction} = GetAuctionSimulationResult(distribution, numberOfBidders, numberOfAuctions);

    return (
        <div style={{ display: 'flex'}}>
            <Box sx={{ width: '400px', padding: '20px' }}>
                <FormControl variant="outlined" fullWidth sx={{ marginTop: 1}}>
                    <InputLabel id="distribution">Distribution</InputLabel>
                    <Select
                        labelId="distribution"
                        value={distribution}
                        label="Distribution"
                        onChange={handleDistributionChange}
                        MenuProps={MenuProps}
                    >
                        <MenuItem value={'Uniform'}>Uniform</MenuItem>
                        <MenuItem value={'Linear'}>Linear</MenuItem>
                        <MenuItem value={'Inverse Square Root'}>Inverse Square Root</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" fullWidth sx={{ marginTop: 3}}>
                    <InputLabel id="numberOfBidders">Number of Bidders</InputLabel>
                    <Select
                        labelId="numberOfBidders"
                        value={numberOfBidders.toString()}
                        label="Number of Bidders"
                        onChange={handleNumBiddersChange}
                        MenuProps={MenuProps}
                    >
                        {[...Array(9)].map((_, i) => (
                            <MenuItem key={i + 2} value={i + 2}>
                                {i + 2}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" fullWidth sx={{marginTop: 3}}>
                    <InputLabel id="numberOfAuctions">Number of Auctions</InputLabel>
                    <Select
                        labelId="numberOfAuctions"
                        value={numberOfAuctions.toString()}
                        label="Number of Bidders"
                        onChange={handleNumberOfAuctionsChange}
                        MenuProps={MenuProps}
                    >
                        {NUMBER_OF_AUCTIONS_OPTIONS.map((numberOfAuctionsOption, i) => (
                            <MenuItem key={i} value={numberOfAuctionsOption}>
                                {numberOfAuctionsOption}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                {LineChartWithTitle(probabilityDistribution, 'Probability Distribution')}
                {LineChartWithTitle(cummulativeProbabilityDistribution, 'Cummulative Probability Distribution')}
            </Box>
            <Container sx={{ flexGrow: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {LineChartWithReferenceLines(firstPriceAuction.winningBid, 'First Price Sealed Bid Auction')}
                    {LineChartWithReferenceLines(firstPriceAuction.winnnersProfit, 'First Price Sealed Bid Auction Profit')}
                    {LineChartWithReferenceLines(secondPriceAuction.winningBid, 'Second Price Sealed Bid Auction')}
                    {LineChartWithReferenceLines(secondPriceAuction.winnnersProfit, 'Second Price Sealed Bid Auction Profit')}
                </div>
            </Container>
        </div>
    );
};


export const LineChartWithTitle = (data: DatasetElementType<number>[], title: string) => {
    return (
        <div>
            <Typography sx={{marginTop: 2}} variant="subtitle1">{title}</Typography>
            <LineChart
                margin={{ top: 10, left: 10, right: 10}}
                width={360}
                height={200}
                series={[{ dataKey: 'y', type: 'line', curve: 'linear', showMark: false }]}
                dataset={data}
                xAxis={[{ dataKey: 'x' }]}
                yAxis={[{ disableLine: true, disableTicks: true, tickLabelStyle: { display: 'none' } }]}
            />
        </div>
    );
};

export const LineChartWithReferenceLines = (data: NumberDataset, title: string) => {
    const standardDeviation = Math.sqrt(data.variance);
    return (
        <div>
            <Typography sx={{marginTop: 3}} variant="h6">{title}</Typography>
            <Typography sx={{marginTop: 1}} variant="subtitle2">Average: {data.average.toFixed(3)}, Standard Deviation: {standardDeviation.toFixed(3)}</Typography>
            <ChartContainer
                width={500}
                height={300}
                margin={{ top: 30, left: 10, right: 10}}
                series={[{ dataKey: 'y', type: 'line', curve: 'step', showMark: false }]}
                dataset={data.values}
                xAxis={[{ dataKey: 'x' }]}
            >
                <LinePlot />
                <ChartsReferenceLine x={data.average} lineStyle={{ stroke: 'red' }} />
                <ChartsXAxis />
            </ChartContainer>
        </div>
    );
};

function GetAuctionSimulationResult(distribution: string, numberOfBidders: number, numberOfAuctions: number): { firstPriceAuction: AuctionSimulationResult; secondPriceAuction: AuctionSimulationResult; } {
    const distributionInstance = distribution === 'Linear' ? new Linear() : distribution === 'Uniform' ? new Uniform() : new InverseSquareRoot();
    const auction = new AuctionGenerator(numberOfBidders, distributionInstance);

    const firstPriceSealedBidWinningBid = new Array<number>(numberOfAuctions);
    const firstPriceSealedBidProfit = new Array<number>(numberOfAuctions);
    const secondPriceSealedBidWinningBid = new Array<number>(numberOfAuctions);
    const secondPriceSealedBidProfit = new Array<number>(numberOfAuctions);

    for (let i = 0; i < numberOfAuctions; i++) {
        const firstPriceBidders = auction.generateFirstPriceSealedBidBidders();
        firstPriceSealedBidWinningBid[i] = firstPriceBidders[0].bidValue;
        firstPriceSealedBidProfit[i] = firstPriceBidders[0].privateValue - firstPriceBidders[0].bidValue;

        const secondPriceBidders = auction.generateSecondPriceSealedBidBidders();
        secondPriceSealedBidWinningBid[i] = secondPriceBidders[1].bidValue;
        secondPriceSealedBidProfit[i] = secondPriceBidders[0].privateValue - secondPriceBidders[1].bidValue;
    }

    const firstPriceAveragePrice = firstPriceSealedBidWinningBid.Average();
    const firstPriceVariance = firstPriceSealedBidWinningBid.SampleVariance();

    const firstPriceAvergageProfit = firstPriceSealedBidProfit.Average();
    const firstPriceVarianceProfit = firstPriceSealedBidProfit.SampleVariance();

    const secondPriceAveragePrice = secondPriceSealedBidWinningBid.Average();
    const secondPriceVariance = secondPriceSealedBidWinningBid.SampleVariance();

    const secondPriceAvergageProfit = secondPriceSealedBidProfit.Average();
    const secondPriceVarianceProfit = secondPriceSealedBidProfit.SampleVariance();

    const firstPriceSealedBidAuctionWinners: DatasetElementType<number>[] = Array.from({ length: 100 }, (_, i) => ({ x: (i + 1) / 100, y: 0 }));
    const firstPriceSealedBidAuctionProfit: DatasetElementType<number>[] = Array.from({ length: 100 }, (_, i) => ({ x: (i + 1) / 100, y: 0 }));
    const secondPriceSealedBidAuctionWinners: DatasetElementType<number>[] = Array.from({ length: 100 }, (_, i) => ({ x: (i + 1) / 100, y: 0 }));
    const secondPriceSealedBidAuctionProfit: DatasetElementType<number>[] = Array.from({ length: 100 }, (_, i) => ({ x: (i + 1) / 100, y: 0 }));

    for (let i = 0; i < numberOfAuctions; i++) {
        var firstPricePrice = firstPriceSealedBidWinningBid[i];
        const firstPriceBin = Math.floor(firstPricePrice * 100);
        firstPriceSealedBidAuctionWinners[firstPriceBin].y += 1;

        var firstPriceProfit = firstPriceSealedBidProfit[i];
        const firstPriceProfitBin = Math.floor(firstPriceProfit * 100);
        firstPriceSealedBidAuctionProfit[firstPriceProfitBin].y += 1;

        var secondPricePrice = secondPriceSealedBidWinningBid[i];
        const secondPriceBin = Math.floor(secondPricePrice * 100);
        secondPriceSealedBidAuctionWinners[secondPriceBin].y += 1;

        var secondPriceProfit = secondPriceSealedBidProfit[i];
        const secondPriceProfitBin = Math.floor(secondPriceProfit * 100);
        secondPriceSealedBidAuctionProfit[secondPriceProfitBin].y += 1;
    };
    
    return { 
        firstPriceAuction: {
            winningBid: { values: firstPriceSealedBidAuctionWinners, average: firstPriceAveragePrice, variance: firstPriceVariance },
            winnnersProfit: { values: firstPriceSealedBidAuctionProfit, average: firstPriceAvergageProfit, variance: firstPriceVarianceProfit }
        },
        secondPriceAuction: { 
            winningBid: { values: secondPriceSealedBidAuctionWinners, average: secondPriceAveragePrice, variance: secondPriceVariance },
            winnnersProfit: { values: secondPriceSealedBidAuctionProfit, average: secondPriceAvergageProfit, variance: secondPriceVarianceProfit }
        }
    };
}
