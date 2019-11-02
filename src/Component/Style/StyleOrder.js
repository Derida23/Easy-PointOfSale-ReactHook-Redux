import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
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
  card: {
    maxWidth: 190,
  },
  grid: {
    justifyContent: 'center'
  },
  h3: {
    color: "#192a56"
  },
  circleIconColor: {
    marginLeft:"1em",
    color: 'green'
  },
  linkCustom: {
    textDecoration: 'none'
  },
  fabColor: {
    background: '#02aefe'
  },
  textField: {
    width: 200,
  },
  buttonColor:{
    background: 'linear-gradient(120deg, #fe924e 30%, #f96504 90%)'
  },
  bigAvatar: {
    margin: 10,
    width: 300,
    height: 300,
  },
}));
