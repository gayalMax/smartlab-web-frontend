import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { CloudinaryContext } from 'cloudinary-react';

import Router from './Router';
import theme from './App.theme';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <CloudinaryContext cloudName="open-inventory-system">
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </CloudinaryContext>
    </Provider>
  );
}

export default App;
