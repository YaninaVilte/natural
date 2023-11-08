import { createTheme } from "@mui/material";

const theme = createTheme({
        typography: {
            fontFamily: [
            'Agbalumo',
        ].join(','),
    }
    });

    

    theme.typography.h3 = {
        fontSize: '1.2rem',
        [theme.breakpoints.up('sm')]: {
          fontSize: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '2.4rem',
        },
        [theme.breakpoints.up('lg')]: {
          fontSize: '3rem',
        },
        [theme.breakpoints.up('xl')]: {
          fontSize: '4rem',
        },
    }

export default theme