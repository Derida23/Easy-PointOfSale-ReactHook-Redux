import React from 'react'
import clsx from 'clsx'
import { Container, Grid, Paper } from '@material-ui/core';

import { useStyles } from '../Style/StyleAdmin';
import OrderPage from '../Page/OrderPage'
import NoActivity from '../Page/NoActivity'

function Order() {
  const classes = useStyles();
  return(
    <div>
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Product */}
        <Grid item xs={12} md={8} lg={8}>
          <Paper className={clsx(classes.paperLayout, classes.fixedHeight)}>
            <OrderPage />
          </Paper>
        </Grid>
        {/* Activity */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={clsx(classes.paper, classes.fixedHeight)}>
             <NoActivity />
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </div>
  )
}

export default Order
