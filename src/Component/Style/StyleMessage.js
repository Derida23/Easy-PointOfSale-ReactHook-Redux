import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
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
  rootMessage: {
    padding: theme.spacing(3, 2),
  },
  typoColor:{
    color:"#252525"
  },
  bigAvatar: {
    margin: 10,
    width: 250,
    height: 250,
  },
}));
