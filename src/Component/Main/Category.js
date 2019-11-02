import clsx from 'clsx';
import React from 'react';
import { Route } from "react-router-dom";

import { Container, Grid, Paper } from '@material-ui/core';
import { useStyles } from '../Style/StyleAdmin';

import AdminCategory from '../Page/AdminCategory'
import NoActivity from '../Page/NoActivity';
import CategoryEdit from '../Content/CategoryEdit';

function Category() {
  const classes = useStyles();
  return(
    <div>
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={8}>
          <Paper className={clsx(classes.paper, classes.fixedHeight, classes.leftpaper)}>
            <AdminCategory />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={clsx(classes.paper, classes.fixedHeight)}>
          <div>
            <Route exact path="/dashboard/admincategory" component={NoActivity} />
            <Route path="/dashboard/admincategory/:id" component={CategoryEdit} />
          </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </div>
  )
}

export default Category
