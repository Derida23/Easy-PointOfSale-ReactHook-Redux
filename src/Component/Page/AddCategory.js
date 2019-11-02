import clsx from 'clsx';
import axios from 'axios';
import React,{ useState } from 'react'
import { useStyles } from '../Style/StyleAdd';
import { withRouter } from 'react-router-dom';

import ClassIcon from '@material-ui/icons/Class';
import { ListItem, Avatar, ListItemIcon, ListItemText, TextField, Dialog, DialogActions, DialogContent, DialogContentText, Typography, Button } from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const variantIcon = {
  success : CheckCircleIcon,
  error : ErrorIcon
}

function SnackbarAlert (props){
  const classes = useStyles();
  const { className, message, variant} = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
    />
  )
}

function AddCategory(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [saveCategory, setSaveCategory] = useState({name:''});
  const [showStatus, setShowStatus] = useState(false);
  const [validate, setValidate] = useState('');
  const [success, setSuccess] = useState('error');
  const [token] = useState(localStorage.getItem("jwt"))
  const apiAddCategory = 'http://localhost:3030/category/';

  const addCategory = (e) => {
    e.preventDefault();
    const newCategory = {
      name:saveCategory.name
    }

    axios.post(apiAddCategory, newCategory, {
      headers: {
        "x-access-token":token
      },
    })
    .then((result) => {
      if (token === null){
        props.history.push('/')
      } else {
        if (result.data.status !== 400){
          setValidate(result.data.data)
          setSuccess("success")
          setShowStatus(true)
          handleClose()
          setTimeout(() => {
            props.history.push('/dashboard/admincategory/')
          }, 1000)
        } else {
          setValidate(result.data.data)
          setShowStatus(true)
        }
      }
    })
    .catch((error) => setShowStatus(false))
  }

  const onChangeSaveCategory = (e) => {
    e.persist()
    setSaveCategory({...saveCategory, [e.target.name] : e.target.value})
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = () => {
    setShowStatus(false)
  }

  return(
    <div>
    <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={showStatus}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarAlert
          variant={success}
          className={classes.margin}
          message={validate}
        />
      </Snackbar>

    <ListItem button onClick={handleClickOpen}>
      <ListItemIcon>
        <ClassIcon />
      </ListItemIcon>
      <ListItemText primary="Add Data Category" />
    </ListItem>
      <Dialog className={classes.widthDialog} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent align="center">
          <Avatar alt="Remy Sharp" src="https://cdn.dribbble.com/users/146798/screenshots/5927075/dribbble-watermeloon.jpg" className={classes.bigAvatar} />
          <DialogContentText>
            Add Category
          </DialogContentText>
          <table>
            <tbody>
              <tr>
                <td><Typography variant="h6">
                      Name
                    </Typography>
                </td>
                <td>&emsp;&emsp;</td>
                <td>
                <form onSubmit={addCategory}>
                  <TextField
                    id="outlined-dense"
                    placeholder="Name category"
                    margin="dense"
                    variant="outlined"
                    className={classes.textField}
                    name="name"
                    type="text"
                    value={saveCategory.name}
                    onChange={onChangeSaveCategory}
                  />
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </DialogContent><br/>
        <DialogActions >
          <Button variant="outlined" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addCategory} className = {classes.buttonModal} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions> <br/>
      </Dialog>
    </div>
  )
}

export default withRouter(AddCategory)
