import clsx from 'clsx';
import React from 'react';
import { Container, Grid,Typography, Paper } from '@material-ui/core';

import { useStyles } from '../Style/StyleAdmin';

function Report() {
  const classes = useStyles();
  return(
    <div>
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={12}>
          <Paper className={clsx(classes.paperLayout, classes.fixedHeight)}>
            <div>
            <Grid item justify="center" className={classes.gridText}>
            <Typography className={classes.typoColor} variant="h5">
            </Typography>
              <img src="http://www.agoradebate.ro/img/build.png" className={classes.sizeImage}/>
            </Grid>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </div>
  )
}

export default Report
