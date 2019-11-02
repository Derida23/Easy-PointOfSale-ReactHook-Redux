import clsx from 'clsx';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { TextField, Button, Divider, } from '@material-ui/core/';

import { useStyles } from '../Style/StyleAdminPage';

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

function CategoryEdit(props) {
  const classes = useStyles();
  const [editCategory, setEditCategory] = useState({name:''})
  const [showStatus, setShowStatus] = useState(false)
  const [validate, setValidate] = useState('')
  const [success, setSuccess] = useState('error')
  const [token] = useState(localStorage.getItem("jwt"))
  const apiEditCategory = "http://localhost:3030/category/" + props.match.params.id

  useEffect(() => {
    const fetchDataCategory = async () => {
      const result = await axios(apiEditCategory,{
        headers: {
          "x-access-token":token
        },
      });
      if (token === null){
        props.history.push('/')
      } else {
        setEditCategory(result.data.data[0])
      }
    }
    fetchDataCategory()
  }, [])

  const updateCategory = (e) => {
    e.preventDefault()
    const changeCategory = {name: editCategory.name}

    axios.put(apiEditCategory, changeCategory, {
      headers: {
        "x-access-token":token
      },
    })
    .then((result) => {
      console.log(result.data.data);
      if (token === null){
        props.history.push('/')
      } else {
        if (result.data.status !== 400){
          setValidate(result.data.data)
          setSuccess("success")
          setShowStatus(true)
          setTimeout(() => {
            props.history.push('/dashboard/admincategory/')
          }, 1000)
        } else {
          setValidate(result.data.data)
          setShowStatus(true)
        }
      }
    })
    .catch((eror) => setShowStatus(false))
  }

  const onChange = (e) => {
    e.persist()
    setEditCategory({...editCategory,[e.target.name]:e.target.value})
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
      <h2>Edit Category</h2>
      <Divider /><br/>
      <table> <tbody>
      <tr>
      <td>
          <TextField
            id="outlined-dense"
            margin="dense"
            variant="outlined"
            name="name"
            type="text"
            value={editCategory.name}
            onChange={onChange}
          />
      </td>
      <td>
      <Button onClick={updateCategory} className={classes.buttonColor} variant="contained" color="primary">
        Submit
      </Button>
      </td>
      </tr>
      </tbody> </table>
    </div>
  )
}

export default CategoryEdit
