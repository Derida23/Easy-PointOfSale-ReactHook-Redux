import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SearchIcon from '@material-ui/icons/Search';

import {  Card, CardActionArea, CardContent, CardMedia,
  Typography, IconButton, Grid, InputBase  } from '@material-ui/core';

import { useStyles } from '../Style/StyleOrder';

function MainProduct() {
  const classes = useStyles();
  const [viewMainProduct, setViewMainProduct] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("jwt"))
  const apiMainProduct='http://localhost:3030/product/'

  const fetchMainProduct = async () => {
    const result = await axios(apiMainProduct, {
      headers: {
        "x-access-token":token
      },
    });
    if (token === null){
      props.history.push('/')
    } else {
      setViewMainProduct(result.data.data.data);
    }
  }

  useEffect(() => {
    fetchMainProduct();
  }, []);

  return(
    <div>
    <Grid container justify="center">
      <IconButton  fontSize="medium">
        <SearchIcon />
      </IconButton> &nbsp;

      <InputBase
         placeholder = " Search Name..."
         inputProps={{ 'aria-label': 'naked' }}
         name= "search"

       /> &emsp;

       <IconButton size="medium">
         <ArrowUpwardIcon />
       </IconButton>

       <IconButton size="medium">
         <ArrowDownwardIcon />
       </IconButton>
    </Grid><br />
    <Grid container className={classes.grid} spacing={0}>
      <Grid item xs={11}>
        <Grid container justify="center" spacing={4}>
        {viewMainProduct.map((data, index) => {
          return(
            <Grid key={index} item justify="center">
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={data.image}
                  title={data.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                    {data.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {data.description}
                  </Typography>
                  <Grid container direction="row" alignItems="center">
                    <Grid item>
                      <h3 className={classes.h3}><NumberFormat value={data.price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></h3>
                    </Grid>
                    <Grid item>
                      <CheckCircleIcon className={classes.circleIconColor}/>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        )
      })}
      </Grid>
      </Grid>
    </Grid>
    </div>
  )
}

export default MainProduct
