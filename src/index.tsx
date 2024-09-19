import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';
import { AppStore, IAppStore } from './stores/AppStore';

const store = AppStore.create({ selectedTab: 0 });

const root = ReactDOM.createRoot(document.getElementById('root')!);

export const GlobalStoreContext = React.createContext<IAppStore>(store);

root.render(
  <GlobalStoreContext.Provider value={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </GlobalStoreContext.Provider>,
);