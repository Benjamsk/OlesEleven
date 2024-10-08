import { Box, Container } from '@mui/material';
import React from 'react';

export const Tiles = () => {
    const width = 50;
    const height = 50;

    const horizontal = new Array<boolean>(height - 1).fill(false).map(() => Math.random() < 0.5);
    const vertical = new Array<boolean>(width - 1).fill(false).map(() => Math.random() < 0.5);
    const grid = new Array(width).fill(null).map(() => new Array<boolean>(height).fill(false));

 
    for(let y = 0; y < height; y++) {
        if (y > 0) {
            grid[0][y] = horizontal[y] ? !grid[0][y - 1] : grid[0][y - 1];
        }

        for(let x = 1; x < width; x++) {
            var leftValue = grid[x - 1][y];

            if (y % 2 == 0) {
                grid[x][y] = vertical[x - 1] ? !leftValue : leftValue;
            } else {
                grid[x][y] = vertical[x - 1] ? leftValue : !leftValue;
            }
        }
    }

    return (
        <Box sx={{ my: 4, display: 'flex', justifyContent: 'center'}}>
            <svg width={width * 16} height={height * 16}>
                {grid.map((row, x) =>
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
            </svg>
        </Box>
    );
};