import React from 'react'
import { Container, Grid, Paper, Typography } from '@material-ui/core';

import { useStyles } from '../Style/StyleMessage';

function Introduction() {
  const classes = useStyles();
  return(
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={12}>
          <Paper className={classes.rootMessage}>
          <Typography variant="h5" className={classes.typoColor} component="h3">
            Welcome to Easy Point of Sale.
          </Typography><br/>
          <Typography component="p"className={classes.typoColor} >
            Point of Sale system that can handle retail inventory the easiest
          </Typography>
        </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Introduction
