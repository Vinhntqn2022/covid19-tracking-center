import { createTheme } from '@mui/material/styles';

const arcBlue = '#0B72B9';
const arcOrange = '#FFBA60';

const theme = createTheme({
  palette: {
    common: {
      blue: `${arcBlue}`,
      orange: `${arcOrange}`,
    },
    primary: {
      main: `${arcBlue}`,
    },
    secondary: {
      main: `${arcOrange}`,
    },
  },
  typography: {
    tab: {
      textTransform: 'none',
      fontFamily: 'Raleway',
      fontSize: '1rem',
      fontWeight: 700,
      color: 'white',
    },
    auth: {
      textTransform: 'none',
      color: 'white',
      fontSize: '1em',
      backgroundColor: `${arcOrange}`,
    },
  },
});
export default theme;
