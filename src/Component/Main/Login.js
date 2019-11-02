import clsx from 'clsx';
import axios from 'axios';
import React, {useState} from 'react';
import { useStyles } from '../Style/StyleLogin';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container } from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

// {/* --- IMPORT REDUCE --- */}
import {connect} from 'react-redux';
import { postLogin } from '../../Redux/Actions/actAuth'

const variantIcon = {
  success : CheckCircleIcon,
  error : ErrorIcon
}

function SnackbarAlert (props){
  const classes = useStyles();
  const { className, message, variant } = props;
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

function Login (props) {
  const classes = useStyles();
  const [loginKey, setLoginKey] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [validate, setValidate] = useState('');
  const [success, setSuccess] = useState('error');

  {/* --- SIGNUP REDUX --- */}
  const initialFormState = { username: "", password: ""};
  const [saveLogin, setSaveLogin] = useState(initialFormState)

  const login = (e) => {
    e.preventDefault();
    props.dispatch(postLogin(saveLogin))
    .then((result) => {
      console.log(result);
      if (result.value.data.status !== 400){
        setValidate(result.value.data.status.login)
        setSuccess("success")
        setShowStatus(true)
        localStorage.setItem("jwt", result.value.data.status.token)
        setLoginKey(true)
      } else {
        setValidate(result.value.data.data)
        setShowStatus(true)
      }
    })
    .catch((error) => setShowStatus(false))
  }

  const onChangeLogin = (e) => {
    e.persist()
    setSaveLogin({...saveLogin, [e.target.name] : e.target.value})
  }

  const handleCloseSnackbar = () => {
    setShowStatus(false)
  }

  return (
    <div>
    {loginKey && <Redirect to='/dashboard'/> }
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={showStatus}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarAlert
          variant={success}
          message={validate}
        />
      </Snackbar>

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paperLogin}>
        <Avatar alt="Remy Sharp" className={classes.bigAvatar} src="https://i.pinimg.com/originals/2f/fa/c6/2ffac600bf44b92fb9a3dde19f603ada.jpg"  />
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={login} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            autoFocus
            fullWidth
            label="Username"
            name="username"
            type="text"
            value={saveLogin.name}
            onChange={onChangeLogin}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={saveLogin.name}
            onChange={onChangeLogin}
          />
          <Button
            className = {classes.buttonColor}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
            <br />
              <Link className = {classes.linkUnderline} to = "#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item xs>
            <br/>
                Don't have account? <Link className = {classes.linkUnderline} to = '/signup'>Sign up</Link>
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

export default withRouter(connect(mapStateToProps)(Login));
