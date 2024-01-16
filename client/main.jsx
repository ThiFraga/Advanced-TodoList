import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createTheme, ThemeProvider } from '@mui/material';
import Routes from './routes';


const theme = createTheme({
  palette: {
    primary: {
      main:'#DB6A00',
      dark: '#DB4400',
      light: '#DB8B00',
      contrastText: '#fff'
    },
    secondary: {
      main: '#000000',
      light: '#808080',
      contrastText: '#ffffff'
    }
  },
});

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Routes />
        </LocalizationProvider>
        
      </ThemeProvider>
    </React.StrictMode>
    );
});
