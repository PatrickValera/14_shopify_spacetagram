import { createTheme, responsiveFontSizes } from "@mui/material";

let darkTheme = createTheme({})
darkTheme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            light: '#1C1E1F',
            main: '#181A1B',
            dark: '#161819',
            contrastText: '#a9a9aC',
        },
        background: {
            paper: '#27292E',
            default: '#27292E',
        },
        text: {
            primary: "#fafafa",
            secondary: "#ddd",
        }
    },
    typography: {
        body1: {
            fontSize: '.4rem',
            [darkTheme.breakpoints.up('md')]: {
                fontSize: '.5rem',
            },
            [darkTheme.breakpoints.up('sm')]: {
                fontSize: '.9rem',
            },
        },
        body2: {
            fontSize: '0.5rem',
            [darkTheme.breakpoints.up('md')]: {
                fontSize: '.9rem',
            },
        },
        h1: {
            fontSize: '4rem',
        },
        h2: {
            fontSize: '1.2rem',
            [darkTheme.breakpoints.up('sm')]: {
                fontSize: '1.5rem',
            },
            [darkTheme.breakpoints.up('md')]: {
                fontSize: '2rem',
            },
        },
        h3: {
            fontSize: '.75rem',
            [darkTheme.breakpoints.up('md')]: {
                fontSize: '2rem',
            },
        },
        h4: {
            fontSize: '.9rem',
            [darkTheme.breakpoints.up('md')]: {
                fontSize: '1.3rem',
            },
        },
        h5: {
            fontSize: '1.1rem',
        },
        h6: {
            fontSize: '1rem',
        },
        fontFamily: 'Montserrat',
    },
    props: {
        MuiButtonBase: {
            disableRipple: true,
        },
        MuiButton: {
            size: 'small',
        },
        MuiButtonGroup: {
            size: 'small',
        },
        MuiCheckbox: {
            size: 'small',
        },
        MuiFab: {
            size: 'small',
        },
        MuiFormControl: {
            margin: 'dense',
            size: 'small',
        },
        MuiFormHelperText: {
            margin: 'dense',
        },
        MuiIconButton: {
            size: 'small',
        },
        MuiInputBase: {
            margin: 'dense',
        },
        MuiInputLabel: {
            margin: 'dense',
        },
        MuiRadio: {
            size: 'small',
        },
        MuiSwitch: {
            size: 'small',
        },
        MuiTextField: {
            margin: 'dense',
            size: 'small',
        },
    },
})



export { darkTheme }