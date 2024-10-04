import React from 'react';
import sonnetsJson from '../static/sonnets.json';
import { Box, Typography } from '@mui/material';
import { Random } from '../Random';

const SHAKESPEARE_SONNETS_COUNT : number = 154;
const SHAKESPEARE_BIRTHDAY : string = '1564-04-23';

class SonnetRecord {
    title: string;
    lines: string[];

    constructor(title: string, lines: string[]) {
        this.title = title;
        this.lines = lines.map(line => line);
        this.lines[this.lines.length - 2] = "\u00A0\u00A0" + this.lines[this.lines.length - 2];
        this.lines[this.lines.length - 1] = "\u00A0\u00A0" + this.lines[this.lines.length - 1];
    }
}

const today = new Date();
const startDate = new Date(SHAKESPEARE_BIRTHDAY);
const daysDifference = Math.floor((today.getTime() - startDate.getTime()) / 86400000);

var ran = new Random();
sonnetsJson.sort(() => ran.next() - 0.5);

const sonnet = sonnetsJson[daysDifference % SHAKESPEARE_SONNETS_COUNT];
const sonnetRecord = new SonnetRecord(sonnet.title, sonnet.lines);

export const DailySonnet = () => {
    return (
        <Box sx={{ my: 10, maxWidth: '800px', mx: 'auto', textAlign: 'center' }}>
            <Typography variant="h5" component="blockquote" sx={{ fontStyle: 'italic', marginBottom: 2 }}>
                {sonnetRecord.title}
            </Typography>
            <Box sx={{ display: 'inline-block', textAlign: 'left' }}>
                {sonnetRecord.lines.map((line, index) => (
                    <Typography key={index} variant="subtitle1" component="cite" sx={{ display: 'block' }}>
                        {line}
                    </Typography>
                ))}
            </Box>
        </Box>
    )
};