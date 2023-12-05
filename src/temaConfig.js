import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ['Lexend'].join(','),
    h2: {
      color: '#FFF',
      fontWeight: 400,
      fontSize: '1rem',
      fontFamily: ['Hagrid Trial'].join(','),
    },
    h2Custom: {
      color: '#164439',
      fontWeight: 500,
      fontSize: '1rem',
      fontFamily: ['Lexend'].join(','),
    },
    h3: {
      color: '#FFFFFF',
    },
    h4: {
      color: '#FFF',
      fontWeight: 400,
      fontSize: '0.88rem',
      fontFamily: ['Hagrid Trial'].join(','),
    },
    h4Custom: {
      color: '#0C0901',
      fontWeight: 300,
      fontSize: '0.88rem',
      fontFamily: ['Lexend'].join(','),
    },
    h5: {
      color: '#FFF',
      fontWeight: 300,
      fontSize: '0.80rem',
    },
    h6: {
      color: '#FFF',
      fontWeight: 400,
      fontSize: '0.75rem',
      fontFamily: ['Hagrid Trial'].join(','),
    },
  },
  palette: {
    primary: {
      main: '#164439',
    },
    secondary: {
      main: '#00ff00',
    },
  },
});

export default theme;