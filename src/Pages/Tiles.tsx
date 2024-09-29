import { Box, Container } from '@mui/material';
import React from 'react';

class Connection {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export const Tiles = () => {
    const width = 3;
    const height = 3;

    const connections = new Array(width).fill(null).map(() => new Array(height).fill(null).map(() => new Array<Connection>()));
    
    const horizontal = new Array<boolean>(width).fill(false).map(() => Math.random() < 0.5);
    const vertical = new Array<boolean>(height).fill(false).map(() => Math.random() < 0.5);

    const connections2 = new Array(width-1).fill(null).map(() => new Array<boolean>(height - 1).fill(true));
    // connections2 should take over for connections, as it is much simpler. The connections are pretty much a smaller array inside 

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            if (((horizontal[x] && y % 2 === 0) || (!horizontal[x] && y % 2 === 1)) && x > 0) {
                connections[x][y].push(new Connection(x, y + 1));
            }
            if (((vertical[y] && x % 2 === 0) || (!vertical[y] && x % 2 === 1)) && y > 0) {
                connections[x][y].push(new Connection(x + 1, y));
            }
        }


    }

    console.log(connections);

    const cells = new Array(width).fill(null).map(() => new Array<boolean>(height).fill(false));

    cells[0][0] = Math.random() < 0.5;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (x === 0 && y === 0) {
                continue;
            }

            const previousCell = x === 0 ? cells[x][y - 1] : cells[x - 1][y];
            const cellConnections = connections[x][y];
    
            if (x === 0) {
                cells[x][y] = cellConnections.some(c => c.x === x + 1 && c.y === y) ? !previousCell : previousCell;
            } else {
                cells[x][y] = cellConnections.some(c => c.x === x && c.y === y + 1) ? !previousCell : previousCell;
            }
        }
    }

    // Render the pattern
    return (
        <Box sx={{ my: 4, display: 'flex', justifyContent: 'center'}}>
            <svg width={width * 16} height={height * 16}>
                {cells.map((row, x) =>
                    row.map((region, y) => (
                        <rect
                            key={`${x}-${y}`}
                            x={x * 16}
                            y={y * 16}
                            width={16}
                            height={16}
                            fill={region ? 'grey' : 'none'}
                        />
                    ))
                )}
                {/*connections.map((row, x) =>
                    row.map((cell, y) =>
                        cell.map((connection, index) => (
                            <line
                                key={`${x}-${y}-${index}`}
                                x1={x * 16}
                                y1={y * 16}
                                x2={connection.x * 16}
                                y2={connection.y * 16}
                                stroke="white"
                            />
                        ))
                    )
                )*/}
            </svg>
        </Box>
    );
};