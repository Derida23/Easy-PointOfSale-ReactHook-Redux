import clsx from 'clsx';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import { useStyles, BootstrapInput } from '../Style/StyleAdd';
import { MenuItem, FormControl, Select, ListItem, ListItemIcon, ListItemText, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Divider, Snackbar, SnackbarContent } from '@material-ui/core';

import ErrorIcon from '@material-ui/icons/Error';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


// {/* --- IMPORT REDUCE --- */}
import {connect} from 'react-redux';
import { postProduct } from '../../Redux/Actions/actProduct'

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

{/* --- ADDPRODUCT FUNCTION --- */}
function AddProduct(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectCategory, setSelectCategory] = useState([]);
  const [showStatus, setShowStatus] = useState(false)
  const [validate, setValidate] = useState('')
  const [success, setSuccess] = useState('error')
  const [token] = useState(localStorage.getItem("jwt"))

  {/* --- SIGNUP REDUX --- */}
  const initialFormState = {
    name:'',
    description:'',
    quantity:'',
    image:'',
    price:'',
    category_id:'',
  };
  const [saveProduct, setSaveProduct] = useState(initialFormState)

  const addProduct = (e) => {
    e.preventDefault();
    {/* --- AXIOS POSTS --- */}
    props.dispatch(postProduct(saveProduct))
    .then((result) => {
      if (token === null){
        props.history.push('/')
      } else {
        if (result.value.data.status !== 400){
          {/* --- HANDLE ERROR --- */}
          setValidate(result.value.data.data)
          setSuccess("success")
          setShowStatus(true)
          handleClose()
          {/* --- HANDLE ERROR --- */}
          setTimeout(() => {
            props.history.push('/dashboard/adminproduct')
          }, 1000)
        } else {
          setValidate(result.value.data.data)
          setShowStatus(true)
        }
      }
    })
    .catch((error) => setShowStatus(false))
  }

  {/* --- GET CATEGORY ID --- */}
  const fetchDataCategory = async () => {
    const result = await axios('http://localhost:3030/category/',{
      headers: {
        "x-access-token":token
      }
    });
    if (token === null){
      props.history.push('/')
    } else {
      setSelectCategory(result.data.data.data);
    }
  }

  useEffect(() => {
    fetchDataCategory()
  }, [])

  {/* --- INPUT CHANGE --- */}
  const onChangeSaveProduct = (e) => {
    e.persist()
    setSaveProduct({...saveProduct, [e.target.name] : e.target.value})
  }

  {/* --- MODAL OPEN --- */}
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  {/* --- SNAKBAR ERROR --- */}
  const handleCloseSnackbar = () => {
    setShowStatus(false)
  }

  return(
    <div>
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

    {/* --- INPUT FORM --- */}
    <ListItem button onClick={handleClickOpen}>
      <ListItemIcon>
        <AddBoxIcon />
      </ListItemIcon>
      <ListItemText primary="Add Data Product" />
    </ListItem>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Data Product</DialogTitle>
        <Divider />
        <DialogContent>
          <table>
          <tbody>
            <tr>
              <td><Typography variant="h6">
                    Name
                  </Typography>
              </td>
              <td>&emsp;&emsp;</td>
              <td>
                <TextField
                  id="outlined-dense"
                  placeholder="Name"
                  margin="dense"
                  variant="outlined"
                  className={classes.textField}
                  inputProps={{maxLength: 13}}
                  name="name"
                  type="text"
                  value={saveProduct.name}
                  onChange={onChangeSaveProduct}
                />
              </td>
            </tr>
            <tr>
              <td><Typography variant="h6">
                    Description
                  </Typography>
              </td>
              <td>&emsp;&emsp;</td>
              <td>
                <TextField
                  id="outlined-dense"
                  placeholder="Description"
                  margin="dense"
                  variant="outlined"
                  multiline
                  rowsMax="4"
                  className={classes.textField}
                  inputProps={{maxLength: 44}}
                  name="description"
                  type="text"
                  value={saveProduct.description}
                  onChange={onChangeSaveProduct}
                />
              </td>
            </tr>
            <tr>
              <td><Typography variant="h6">
                    Image
                  </Typography>
              </td>
              <td>&emsp;&emsp;</td>
              <td>
                <TextField
                  id="outlined-dense"
                  placeholder="Image"
                  margin="dense"
                  variant="outlined"
                  className={classes.textField}
                  name="image"
                  type="text"
                  value={saveProduct.image}
                  onChange={onChangeSaveProduct}
                />
              </td>
            </tr>
            <tr>
              <td><Typography variant="h6">
                    Price
                  </Typography>
              </td>
              <td>&emsp;&emsp;</td>
              <td>
                <TextField
                  id="outlined-number"
                  placeholder="Price"
                  margin="dense"
                  className={classes.textField}
                  name="price"
                  type="number"
                  inputProps={{min: 0}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={saveProduct.price}
                  onChange={onChangeSaveProduct}
                />
              </td>
            </tr>
            <tr>
              <td><Typography variant="h6">
                    Quantity
                  </Typography>
              </td>
              <td>&emsp;&emsp;</td>
              <td>
                <TextField
                  id="outlined-number"
                  placeholder="Quantity"
                  className={classes.textField}
                  name="quantity"
                  type="number"
                  inputProps={{min: 0}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="dense"
                  variant="outlined"
                  value={saveProduct.quantity}
                  onChange={onChangeSaveProduct}
                />
              </td>
            </tr>
            <tr>
              <td><Typography variant="h6">
                    Category
                  </Typography>
              </td>
              <td>&emsp;&emsp;</td>
              <td>
              {/* --- SHOW CATEGORY ID --- */}
              <FormControl
              variant="outlined"
              fullWidth
              className={classes.formControl}>
                <Select
                  id="demo-customized-select"
                  input={<BootstrapInput />}
                  name="category_id"
                  value={saveProduct.category_id}
                  onChange={onChangeSaveProduct}
                >
                {selectCategory.map((data, index) => (
                    <MenuItem key={index} value={data.id}>{data.name}</MenuItem>
                ))}
                </Select>
              </FormControl>
              </td>
            </tr>
            </tbody>
          </table>
      </DialogContent>
      {/* --- BUTTON ACTION --- */}
      <DialogActions>
        <Button variant="outlined" onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button variant="contained" onClick={addProduct} className={classes.buttonModal} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  )
}

const mapStateToProps = state => {
    return {
      products: state.redProduct.viewProduct
    };
};

export default withRouter(connect(mapStateToProps)(AddProduct))
