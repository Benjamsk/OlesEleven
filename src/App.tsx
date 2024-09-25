import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ButtonAppBar from './Bar';
import Home from './Home';
import { GlobalStoreContext } from '.';
import { observer } from "mobx-react";
import { Challenge } from './Challenge';
import { Page } from './stores/Page';

function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: 'text.secondary',
      }}
    >
      {'Copyright © OlesEleven '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const App = () => {
  const store = React.useContext(GlobalStoreContext);
  
  const renderContent = () => {
    if (store.selectedTab === Page.Home) {
      return <Home />;
    } else {
      return <Challenge />;
    }
  };

  return (
    <Box>
        <ButtonAppBar />
        <Container>
          {renderContent()}
          <Copyright />
      </Container>
    </Box>
  );
}

export default observer(App);