import clsx from 'clsx';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useStyles } from '../Style/StyleAdminPage';
import { Link, withRouter } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {  Table, TableBody, TableCell,TablePagination, TableHead, Divider, TableRow, IconButton, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

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

function AdminCategory(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [showCategory, setShowCategory] = useState([]);
  const [clickOpen, setClickOpen] = React.useState('');
  const [showStatus, setShowStatus] = useState(false)
  const [validate, setValidate] = useState('')
  const [success, setSuccess] = useState('error')
  const [token] = useState(localStorage.getItem("jwt"))
  const apiShowCategory='http://localhost:3030/category/'


    const [page, setPage] = useState(0);
    const [infoPage, setInfoPage] = useState({maxPage: 0, totalAllCategories: 0});
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, infoPage.totalAllCategories - page * rowsPerPage);


  const fetchDataCategory = async () => {
    const result = await axios(apiShowCategory, {
      headers: {
        "x-access-token":token
      },
    });
    if (token === null){
      props.history.push('/')
    } else {
      setShowCategory(result.data.data.data);
      setInfoPage (result.data.data.infoPage);
    }
  }

  useEffect(() => {
    fetchDataCategory();
  }, []);

  const deleteCategory = (e => {
    axios.delete(`http://localhost:3030/category/${clickOpen}`, {
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
            setTimeout(() => {
              props.history.push('/dashboard/admincategory')
            }, 1000)
            handleClose()
            fetchDataCategory()
          } else {
            setValidate(result.data.data)
            setShowStatus(true)
          }
        }
      })
      .catch((error) => setShowStatus(false))
  })

  const handleClickOpen = (id) => {
    setOpen(true);
    setClickOpen(id)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = () => {
    setShowStatus(false)
  }

  return(
    <div className={classes.root}>
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
    <h2>Category Admin Page</h2>
    <Divider />
    <Paper className={classes.paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
          <TableCell align="center">Name</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        {showCategory.map((data, index) => {
          return(
          <TableBody key={index}>
              <TableRow>
                <TableCell align="center">{data.name}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={()=>handleClickOpen(data.id)} value={data.id} className={classes.button} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                  <Link to={"/dashboard/admincategory/" + data.id}>
                  <IconButton className={classes.button} aria-label="delete">
                    <EditIcon />
                  </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
          </TableBody>
          )
        })}

        {emptyRows > 0 && (
          <tbody>
            <TableRow style={{ height: 80 * emptyRows }}>
            <TableCell colSpan={6} />
            </TableRow>
          </tbody>
        )}
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            count={infoPage.totalAllCategories}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{'aria-label': 'previous page'}}
            nextIconButtonProps={{'aria-label': 'next page'}}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Category"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are You Sure to Delete This Category
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={deleteCategory} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Table>
    </Paper>
    </div>
  )
}

export default withRouter(AdminCategory)
