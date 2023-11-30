import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ['Lexend'].join(','),
    h3: {
      color: '#FFFFFF',
      fontWeight: 500,
      // '@media (min-width: 320px) and (max-width: 480px)': {
      //   fontSize: '1.5rem',
      // },
      // '@media (min-width: 481px) and (max-width: 768px)': {
      //   fontSize: '2.4rem',
      // },
      // '@media (min-width: 769px) and (max-width: 1024px)': {
      //   fontSize: '3rem',
      // },
      // '@media (min-width: 1025px) and (max-width: 1200px)': {
      //   fontSize: '4rem',
      // },
      // '@media (min-width: 1201px)': {
      //   fontSize: '4rem',
      // },
    },
    h4: {
      color: '#FFFFFF',
      fontWeight: 400,
      // '@media (min-width: 320px) and (max-width: 480px)': {
      //   fontSize: '0.8rem',
      // },
      // '@media (min-width: 481px) and (max-width: 768px)': {
      //   fontSize: '1rem',
      // },
      // '@media (min-width: 769px) and (max-width: 1024px)': {
      //   fontSize: '1.2rem',
      // },
      // '@media (min-width: 1025px) and (max-width: 1200px)': {
      //   fontSize: '1.4rem',
      // },
      // '@media (min-width: 1201px)': {
      //   fontSize: '1.4rem',
      // },
    },
    h5: {
      color: '#FFFFFF',
      fontWeight: 300,
      // '@media (min-width: 320px) and (max-width: 480px)': {
      //   fontSize: '0.6rem',
      // },
      // '@media (min-width: 481px) and (max-width: 768px)': {
      //   fontSize: '0.8rem',
      // },
      // '@media (min-width: 769px) and (max-width: 1024px)': {
      //   fontSize: '1.0rem',
      // },
      // '@media (min-width: 1025px) and (max-width: 1200px)': {
      //   fontSize: '1.2rem',
      // },
      '@media (min-width: 1201px)': {
        fontSize: '1.2rem',
      },
    },
    h6: {
      color: '#FFFFFF',
      fontWeight: 400,
      // '@media (min-width: 320px) and (max-width: 480px)': {
      //   fontSize: '0.5rem',
      // },
      // '@media (min-width: 481px) and (max-width: 768px)': {
      //   fontSize: '0.6rem',
      // },
      // '@media (min-width: 769px) and (max-width: 1024px)': {
      //   fontSize: '0.7rem',
      // },
      '@media (min-width: 1025px) and (max-width: 1200px)': {
        fontSize: '0.8rem',
      },
      '@media (min-width: 1201px)': {
        fontSize: '0.8rem',
      },
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