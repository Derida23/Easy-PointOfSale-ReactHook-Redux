import clsx from 'clsx';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {  MenuItem, FormControl, Button, TextField,
          Typography, Divider, Select } from '@material-ui/core';

import { useStyles, BootstrapInput } from '../Style/StyleAdminPage';

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

function ProductEdit(props) {
  const classes = useStyles();
  const [selectCategory, setSelectCategory] = useState([]);
  const [editProduct, setEditProduct] = useState({
    name:'',
    description:'',
    quantity:'',
    image:'',
    price:'',
    category_id:'',
    category_name:''
  })
  const [showStatus, setShowStatus] = useState(false)
  const [validate, setValidate] = useState('')
  const [success, setSuccess] = useState('error')
  const [token] = useState(localStorage.getItem("jwt"))
  const apiEditProduct = "http://localhost:3030/product/" + props.match.params.id

  useEffect(() => {
    fetchDataProduct()
    fetchDataCategory()
  }, [apiEditProduct])

  const fetchDataProduct = async () => {
    const result = await axios(apiEditProduct, {
      headers: {
        "x-access-token":token
      },
    });
    if (token === null){
      props.history.push('/')
    } else {
      setEditProduct(result.data.data[0])
    }
  }

  const fetchDataCategory = async () => {
    const result = await axios('http://localhost:3030/category/', {
      headers: {
        "x-access-token":token
      },
    });
    if (token === null){
      props.history.push('/')
    } else {
      setSelectCategory(result.data.data.data);
    }
  }

  const updateProduct = (e) => {
    e.preventDefault()
    const changeProduct = {
      name: editProduct.name,
      description:editProduct.description,
      quantity:editProduct.quantity,
      image:editProduct.image,
      price:editProduct.price,
      category_id:editProduct.category_id,
    }

    axios.put(apiEditProduct, changeProduct, {
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
            props.history.push('/dashboard/adminproduct/')
          }, 1000)
        } else {
          setValidate(result.data.data)
          setShowStatus(true)
        }
      }
    })
    .catch((error) => console.log(error))
  }

  const onChangeEditProduct = (e) => {
    e.persist()
    setEditProduct({...editProduct,[e.target.name]:e.target.value})
    console.log(editProduct);
  }

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
    <h2>Edit Product</h2>
    <Divider />
      <table>
      <tbody>
        <tr>
          <td><Typography variant="h6">
                Name
              </Typography>
          </td>
          <td>&emsp;</td>
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
              value={editProduct.name}
              onChange={onChangeEditProduct}
            />
          </td>
        </tr>
        <tr>
          <td><Typography variant="h6">
                Description
              </Typography>
          </td>
          <td>&emsp;</td>
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
              value={editProduct.description}
              onChange={onChangeEditProduct}
            />
          </td>
        </tr>
        <tr>
          <td><Typography variant="h6">
                Image
              </Typography>
          </td>
          <td>&emsp;</td>
          <td>
            <TextField
              id="outlined-dense"
              placeholder="Image"
              margin="dense"
              variant="outlined"
              className={classes.textField}
              name="image"
              type="text"
              value={editProduct.image}
              onChange={onChangeEditProduct}
            />
          </td>
        </tr>
        <tr>
          <td><Typography variant="h6">
                Price
              </Typography>
          </td>
          <td>&emsp;</td>
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
              value={editProduct.price}
              onChange={onChangeEditProduct}
            />
          </td>
        </tr>
        <tr>
          <td><Typography variant="h6">
                Quantity
              </Typography>
          </td>
          <td>&emsp;</td>
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
              value={editProduct.quantity}
              onChange={onChangeEditProduct}
            />
          </td>
        </tr>
        <tr>
          <td><Typography variant="h6">
                Category
              </Typography>
          </td>
          <td>&emsp;</td>
          <td>
          <FormControl
          variant="outlined"
          fullWidth
          className={classes.formControl}>
            <Select
              id="demo-customized-select"
              input={<BootstrapInput />}
              name="category_id"
              value={editProduct.category_id}
              onChange={onChangeEditProduct}
            >
            {selectCategory.map((data, index) => (
                <MenuItem key={index} value={data.id}>{data.name}</MenuItem>
            ))}
            </Select>
          </FormControl>
          </td>
        </tr>
        </tbody>
      </table><br />
      <Button onClick= {updateProduct} className={classes.buttonColor} variant="contained" color="primary">
        Submit
      </Button>
    </div>
  )
}

export default ProductEdit
