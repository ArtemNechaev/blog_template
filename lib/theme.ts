import { createMuiTheme } from '@material-ui/core/styles';
import { green, pink, red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: '#fff' ,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#ebebeb',
    }
  },
});

export default theme;