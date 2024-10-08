import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ButtonAppBar from './Bar';
import { GlobalStoreContext } from '.';
import { observer } from "mobx-react";
import { Challenge } from './Pages/Challenge';
import { Page } from './stores/Page';
import Home from './Pages/Home';
import { Questions } from './Pages/Questions';
import { DailySonnet } from './Pages/DailySonnet';
import { Tiles } from './Pages/Tiles';

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

const Content = (page: Page) => {
  switch (page) {
      case Page.Challenge:
          return <Challenge />;
      case Page.Questions:
          return <Questions />;
      case Page.DailySonnet:
          return <DailySonnet />;
      case Page.Questions:
          return <Questions />;
      case Page.Tiles:
          return <Tiles />;
      case Page.Home:
          return <Home />;
      default:
          return <Home />;
  }
};

const App = () => {
  const store = React.useContext(GlobalStoreContext);

  return (
    <Box>
      <ButtonAppBar />
      <Container>
          {Content(store.selectedTab)}
      </Container>
      <Copyright />
    </Box>
  );
}

export default observer(App);