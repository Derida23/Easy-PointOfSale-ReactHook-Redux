import clsx from 'clsx';
import React from 'react';

import { Route } from "react-router-dom";
import { Container, Grid, Paper } from '@material-ui/core';
import { useStyles } from '../Style/StyleAdmin';

import NoActivity from '../Page/NoActivity';
import AdminProduct from '../Page/AdminProduct';
import ProductEdit from '../Content/ProductEdit';

function Product() {
  const classes = useStyles();
  return(
    <div>
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={8}>
          <Paper className={clsx(classes.paper, classes.fixedHeight, classes.leftpaper)}>
            <AdminProduct />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={clsx(classes.paper, classes.fixedHeight)}>
            <Route exact path="/dashboard/adminproduct" component={NoActivity} />
            <Route path="/dashboard/adminproduct/:id" component={ProductEdit} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </div>
  )
}

export default Product
