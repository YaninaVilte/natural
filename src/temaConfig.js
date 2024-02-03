import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    color: '#0C0901',
    fontFamily: ['Lexend'].join(','),
    reset: {
      color: '#0C0901',
      fontWeight: 500,
      fontSize: '10px',
      fontFamily: ['Lexend'].join(','),
    },
    detalle: {
      color: '#FFF',
      fontWeight: 400,
      fontSize: '11px',
      fontFamily: ['Hagrid Trial'].join(','),
    },
    h1Custom: {
      color: '#FFF',
      fontWeight: 700,
      fontSize: '36px',
      fontFamily: ['Lexend'].join(','),
    },
    h1: {
      color: '#FFF',
      fontWeight: 400,
      fontSize: '32px',
      fontFamily: ['Hagrid Trial'].join(','),
    },
    carrusel: {
      color: '#FFF',
      fontWeight: 200,
      fontSize: '32px',
      fontFamily: ['Lexend'].join(','),
    },
    titulo: {
      color: '#164439',
      fontWeight: 800,
      fontSize: '18px',
      fontFamily: ['Hagrid Text Trial'].join(','),
    },
    h2: {
      color: '#0C0901',
      fontWeight: 400,
      fontSize: '16px',
      fontFamily: ['Hagrid Trial'].join(','),
    },
    h2Custom: {
      color: '#164439',
      fontWeight: 500,
      fontSize: '16px',
    },
    h2Description: {
      color: '#FFF',
      fontWeight: 300,
      fontSize: '16px',
    },
    h3: {
      color: '#FFFFFF',
    },
    h3Counter: {
      color: '#9A9A9A',
      fontWeight: 200,
      fontSize: '15px',
      fontFamily: ['Lexend'].join(','),
    },
    category: {
      color: '#FFF',
      fontWeight: 400,
      fontSize: "14px",
    },
    h4: {
      color: '#FFF',
      fontWeight: 400,
      fontSize: '14px',
      fontFamily: ['Hagrid Trial'].join(','),
    },
    h4Custom: {
      color: '#0C0901',
      fontWeight: 300,
      fontSize: '14px',
      fontFamily: ['Lexend'].join(','),
    },
    drawer: {
      color: '#9A9A9A',
      fontWeight: 300,
      fontSize: '14px',
    },
    stock: {
      fontWeight: 500,
      fontSize: '14px',
    },
    h5: {
      color: '#FFF',
      fontWeight: 300,
      fontSize: '13px',
    },
    h6: {
      color: '#FFF',
      fontWeight: 400,
      fontSize: '12px',
      fontFamily: ['Hagrid Trial'].join(','),
    },
    service: {
      color: '#164439',
      fontWeight: 400,
      fontSize: '22px',
      fontFamily: ['Hagrid Trial'].join(','),
    },
    serviceBold: {
      color: '#164439',
      fontWeight: 800,
      fontSize: '24px',
      fontFamily: ['Hagrid Text Trial'].join(','),
    },
  },
});

export default theme;