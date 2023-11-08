import { createTheme } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: ['Agbalumo'].join(','),
        h3: {
            fontSize: '1.2rem',
            '@media (min-width:600px)': {
                fontSize: '1.5rem',
            },
            '@media (min-width:960px)': {
                fontSize: '2.4rem',
            },
            '@media (min-width:1280px)': {
                fontSize: '3rem',
            },
            '@media (min-width:1920px)': {
                fontSize: '4rem',
            },
        },
    },
});

export default theme;