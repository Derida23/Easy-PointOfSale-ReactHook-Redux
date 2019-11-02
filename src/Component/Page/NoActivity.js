import React from 'react';
import {Avatar, Container, Grid, Typography } from '@material-ui/core';

import { useStyles } from '../Style/StyleMessage';

export default function Order() {
  const classes = useStyles();

  return(
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid container justify="center" alignItems="center" item xs={12} md={8} lg={12}>
          <Avatar alt="Remy Sharp" src="https://cdn.dribbble.com/users/44167/screenshots/4199208/empty-cart-rappi.png" className={classes.bigAvatar} />
          <Typography variant="h6" gutterBottom>
        No Activity to Show
      </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}
