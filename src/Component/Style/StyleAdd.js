import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import InputBase from '@material-ui/core/InputBase';

export const BootstrapInput = withStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },'*::-webkit-scrollbar': {
        backgroundColor:'#fff',
        width:'16px'
    },
    '*::-webkit-scrollbar-track': {
        backgroundColor:'#fff'
    },
    '*::-webkit-scrollbar-thumb': {
        backgroundColor: '#babac0',
        borderRadius: '16px',
        border:'5px solid #fff'
    },
  },
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

export const useStyles = makeStyles(theme => ({
  textField: {
    width: 300,
  },
  buttonModal : {
    background: 'linear-gradient(120deg, #fe924e 30%, #f96504 90%)'
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));
