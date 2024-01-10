import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';

import { createTheme, ThemeProvider } from '@mui/material';
import Routes from './routes';


const theme = createTheme({
  palette: {
    primary: {
      main:'#DB6A00'
    },
    secondary: {
      main: '#000000'
    }
  },
});

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </React.StrictMode>
    );
});
