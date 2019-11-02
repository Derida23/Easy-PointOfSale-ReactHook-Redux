import clsx from 'clsx';
import axios from 'axios';
import React, { useState } from 'react';
import { useStyles } from '../Style/StyleLogin';
import { Link, withRouter } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, Snackbar, SnackbarContent } from '@material-ui/core';

// {/* --- IMPORT REDUCE --- */}
import {connect} from 'react-redux';
import { postRegister } from '../../Redux/Actions/actAuth'

// {/* --- IMPORT SNACKBAR --- */}
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

// {/* --- SNACKBAR FUNCTION --- */}
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

{/* --- SIGN UP FUNCTION --- */}
function SignUp(props) {
  const classes = useStyles();
  const [showStatus, setShowStatus] = useState(false)
  const [validate, setValidate] = useState('')
  const [success, setSuccess] = useState('error')

{/* --- SIGNUP REDUX --- */}
  const initialFormState = { username: "", password: ""};
  const [saveSign, setSaveSign] = useState(initialFormState)

  const signUp = (e) => {
    e.preventDefault();
    props.dispatch(postRegister(saveSign))
    .then((result) => {
      console.log(result);
      if (result.value.data.status !== 400)  {
        {/* --- VALIDATE SNACKBAR --- */}
        setValidate(result.value.data.data)
        setSuccess("success")
        setShowStatus(true)
        {/* --- VALIDATE SNACKBAR --- */}
        setTimeout(() => {
          props.history.push('/')
        }, 1000)
      } else {
        setValidate(result.value.data.data)
        setShowStatus(true)
      }
    })
    .catch((error) => setShowStatus(false));
  }

{/* --- INPUT SIGN UP --- */}
  const onChangeSignup = (e) => {
    e.persist()
    setSaveSign({...saveSign, [e.target.name] : e.target.value})
  }

{/* --- CLOSE SNACKBAR --- */}
  const handleCloseSnackbar = () => {
    setShowStatus(false)
  }

  return (
    <div>
    {/* --- SNACKBAR STYLE --- */}
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

    {/* --- SIGN UP --- */}
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paperLogin}>
        <Avatar alt="Remy Sharp" src="https://i.pinimg.com/originals/2f/fa/c6/2ffac600bf44b92fb9a3dde19f603ada.jpg" className={classes.bigAvatar} />
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={signUp} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            autoFocus
            fullWidth
            label="Username"
            name="username"
            type="text"
            value={saveSign.name}
            onChange={onChangeSignup}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={saveSign.name}
            onChange={onChangeSignup}
          />

          {/* --- BUTTON SIGNUP --- */}

          <Button
            className = {classes.buttonColor}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
            <br />
              <Link className = {classes.linkUnderline} to = "#" variant="body2">
                Read term and policy
              </Link>
            </Grid>
            <Grid item xs>
            <br/>
                Already have account? <Link className = {classes.linkUnderline} to = '/'>Login</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
    </div>
  );
}

{/* --- RESPONSE --- */}
const mapStateToProps = state => {
    return {
      response: state.redAuth.registerResponse
    };
  };

export default withRouter(connect(mapStateToProps)(SignUp));
