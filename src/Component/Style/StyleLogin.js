import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
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
  paperLogin: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  bigAvatar: {
    margin: 10,
    width: 120,
    height: 120,
  },
  buttonColor:{
    background: 'linear-gradient(45deg, #4abd89 30%, #3ac46e 90%)'
  },
  linkUnderline:{
    textDecoration: 'none'
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
