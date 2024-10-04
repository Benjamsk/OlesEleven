import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { GlobalStoreContext } from '.';
import { Page } from './stores/Page';

export default function ButtonAppBar() {
    const store = React.useContext(GlobalStoreContext);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Oles Eleven
                    </Typography>
                    <Button color="inherit" onClick={() => store.setSelectedTab(Page.Home)}>Home</Button>
                    <Button color="inherit" onClick={() => store.setSelectedTab(Page.DailySonnet)}>Daily Sonnet</Button>
                    <Button color="inherit" onClick={() => store.setSelectedTab(Page.Questions)}>Questions</Button>
                    <Button color="inherit" onClick={() => store.setSelectedTab(Page.Challenge)}>Challenge</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}