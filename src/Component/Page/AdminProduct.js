import clsx from 'clsx';
import axios from 'axios'
import EditIcon from '@material-ui/icons/Edit';
import React, {useEffect, useState} from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link, withRouter } from 'react-router-dom';
import { useStyles } from '../Style/StyleAdminPage';
import {  Table, Snackbar, SnackbarContent, TableBody, TableCell, TableHead, Divider, TableRow, IconButton, Paper, Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TablePagination} from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';


// {/* --- IMPORT REDUCE --- */}
import {connect} from 'react-redux';
import { getProduct } from '../../Redux/Actions/actProduct'


{/* --- SNACKBAR FUNCTION --- */}
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

{/* --- ADMIN PRODUCT FUNCTION --- */}
function AdminProduct(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [showProduct, setShowProduct] = useState([])
  const [clickOpen, setClickOpen] = React.useState('');
  const [showStatus, setShowStatus] = useState(false)
  const [validate, setValidate] = useState('')
  const [success, setSuccess] = useState('error')
  const [token] = useState(localStorage.getItem("jwt"))
  const apiShowProduct = 'http://localhost:3030/product/'


{/* --- PAGINATION --- */}
  const [page, setPage] = useState(0);
  const [infoPage, setInfoPage] = useState({maxPage: 0, totalAllProduct: 0});
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, infoPage.totalAllProduct - page * rowsPerPage);

{/* --- FETCH DATA --- */}
  const fetchDataProduct = async () => {
    const result = await props.dispatch(getProduct(rowsPerPage, page + 1))
    if (token === null){
      props.history.push('/')
    } else {
      setShowProduct(result.value.data.data.data);
      setInfoPage (result.value.data.data.infoPage);
    }
  }

  useEffect(() => {
    fetchDataProduct();
  }, [page, rowsPerPage]);

{/* --- DELETE DATA --- */}
  const deleteProduct = (e => {
    axios.delete(`http://localhost:3030/product/${clickOpen}`, {
      headers: {
        "x-access-token":token
      }
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
              props.history.push('/dashboard/adminproduct')
            }, 1000)
            handleClose()
            fetchDataProduct()
          } else {
            setValidate(result.data.data)
            setShowStatus(true)
          }
        }
      })
      .catch((error) => setShowStatus(false))
  })

{/* --- MODAL DELETE --- */}
  const handleClickOpen = (id) => {
    setOpen(true);
    setClickOpen(id)
  };
  const handleClose = () => {
    setOpen(false);
  };

{/* --- CLOSE SNACKBAR --- */}
  const handleCloseSnackbar = () => {
    setShowStatus(false)
  }

{/* --- START PROGRAM --- */}
  return(
    <div className={classes.root}>

    {/* --- SNACKBAR --- */}
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

    {/* --- START ADMIN PAGE --- */}
    <h2>Product Admin Page</h2>
    <Divider />
    <Paper className={classes.paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        {/* --- MAP DATA --- */}
        {showProduct.map((data, index) => {
          return(
          <TableBody key={index}>
              <TableRow>
                <TableCell align="center">{data.name}</TableCell>
                <TableCell align="center">{data.category_name}</TableCell>
                <TableCell align="center">{data.description}</TableCell>
                <TableCell align="center">{data.quantity}</TableCell>
                <TableCell align="center">
                  <Avatar alt="Remy Sharp" src={data.image} className={classes.bigAvatar} />
                </TableCell>
                <TableCell align="center">{data.price}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={()=>handleClickOpen(data.id)} className={classes.button} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                  <Link to={"/dashboard/adminproduct/" + data.id}>
                  <IconButton className={classes.button} aria-label="delete">
                    <EditIcon />
                  </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
          </TableBody>
          )
        })}

        {/* --- PAGINATION --- */}
        {emptyRows > 0 && (
          <tbody>
            <TableRow style={{ height: 80 * emptyRows }}>
            <TableCell colSpan={6} />
            </TableRow>
          </tbody>
        )}
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            count={infoPage.totalAllProduct}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{'aria-label': 'previous page'}}
            nextIconButtonProps={{'aria-label': 'next page'}}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Table>

        {/* --- MODAL DELETE --- */}
        <Dialog
          outline= 'none'
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Product"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are You Sure to Delete This Product
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={deleteProduct} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
    </Paper>
  </div>
  )
}


{/* --- RESPONSE --- */}
const mapStateToProps = state => {
    return {
      response: state.redProduct.viewProduct
    };
  };

export default withRouter(connect(mapStateToProps)(AdminProduct));
