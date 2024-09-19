import * as React from 'react';
import Box from "@mui/material/Box";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Typography } from '@mui/material';

class ChallengeRecord {
    public name: string;
    public date: string;
    public totalDistance: number;
    public runDistance: number;
    public completed: string;

    constructor(name: string, date: string, totalDistance: number, runDistance: number, completed: string) {
        this.name = name;
        this.date = date;
        this.totalDistance = totalDistance;
        this.runDistance = runDistance;
        this.completed = completed;
    }
}

const challengeRecords : ChallengeRecord[] = [
  new ChallengeRecord('Ole', '2023-07-13', 71.53, 10, 'No'),
  new ChallengeRecord('Benjamin', '2023-07-13', 71.53, 10, 'No')
];

export const Challenge = () => { 
    return (
        <Box sx={{ my: 4 }}>
            {GetChallengeDescription()}
            {GetChallengeTable(challengeRecords)}
        </Box>
    );
}

function GetChallengeTable(challengeRecords : ChallengeRecord[]) {
    return <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Total distance (km)</TableCell>
                    <TableCell align="right">Run distance (km)</TableCell>
                    <TableCell align="right">Completed</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {challengeRecords.map((row) => (
                    <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell>{row.name}</TableCell>
                        <TableCell align="right">{row.date}</TableCell>
                        <TableCell align="right">{row.totalDistance}</TableCell>
                        <TableCell align="right">{row.runDistance}</TableCell>
                        <TableCell align="right">{row.completed}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>;
}

function GetChallengeDescription() {
    return (
        <Container maxWidth="md" style={{marginBottom: '20px'}}>
            <Typography align='center' variant="h2" gutterBottom>
                11 Scandinavian Miles
            </Typography>
            <Typography variant="body1" gutterBottom>
                The 11 Scandinavian Miles is the challenge to traverse 110 kilometers by walking and running within 24 hours. The two rules are simple: 1) no other mode of transportation than your own legs, and 2) at least 10 kilometers of the distance must be traversed while running.
            </Typography>
        </Container>
    );
}
