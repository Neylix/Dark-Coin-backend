import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseLine from '@mui/material/CssBaseline'
import { ProvideAuth } from './utils/authContext'

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={darkTheme}>
      <CssBaseLine />
      <ProvideAuth>
        <App />
      </ProvideAuth>
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
