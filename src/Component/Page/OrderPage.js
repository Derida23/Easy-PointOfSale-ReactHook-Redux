import { withRouter } from "react-router-dom";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import SearchIcon from '@material-ui/icons/Search';

import {  Card, CardActionArea, CardContent, CardMedia,
  Typography, IconButton, Grid, InputBase, Avatar  } from '@material-ui/core';

import RestaurantIcon from '@material-ui/icons/Restaurant';
import AppsRoundedIcon from '@material-ui/icons/AppsRounded';
import FiberNewRoundedIcon from '@material-ui/icons/FiberNewRounded';

import {Fab} from '@material-ui/core';
import { useStyles } from '../Style/StyleOrder';

function OrderPage (props){
  const [viewMainProduct, setViewMainProduct] = useState([]);
  const [order, setOrder] = useState('')
  const [sorting, setSorting] = useState('')
  const [search, setSearch] = useState('')
  const [token] = useState(localStorage.getItem("jwt"))
  const apiMainProduct='http://localhost:3030/product/'

  const fetchMainProduct = async () => {
    const result = await axios(apiMainProduct, {
      headers: {
        "x-access-token":token
      },
        params: {
          order: order,
          sort: sorting,
          search: search
        }
      })
    .then((result) => {
      if (token === null) {
        props.history.push('/')
      } else {
        if (result.data.status === 200){
          setViewMainProduct(result.data.data.data)
        } else {
          setViewMainProduct([])
        }
      }
    })
  }

  const funSearch = (e) => {
    e.target.name = e.target.value
    setSearch(e.target.name, console.log(search))
  }

  const submitSearch = () => {
    setSearch(search)
      fetchMainProduct()
  }

  const changeSort = (checkSort) => {
    setSorting(checkSort)
      fetchMainProduct()
  }

  const changeOrder = (checkOrder) => {
    setOrder(checkOrder)
      fetchMainProduct()
  }

  useEffect(() => {
    fetchMainProduct();
  }, []);

  const classes = useStyles();
    return(
      <div>
        <div>
          <Grid container justify="center">
              <Fab className={classes.fabColor} onClick={() => changeOrder("name")} variant="extended" color="primary" aria-label="add">
                <RestaurantIcon />&nbsp;
                  Name
              </Fab> &emsp;&emsp;

              <Fab className={classes.fabColor} onClick={() => changeOrder("category")} variant="extended" color="primary" aria-label="add">
                <AppsRoundedIcon />&nbsp;
                Category
              </Fab> &emsp;&emsp;

              <Fab className={classes.fabColor} onClick={() => changeOrder("date_update")} variant="extended" color="primary" aria-label="add">
                <FiberNewRoundedIcon />&nbsp;
                New
              </Fab>
            </Grid>
        </div><br/>
        <div className="dashboard-panel-container">
          <Grid container justify="center">
            <IconButton onClick={submitSearch} fontSize="medium">
              <SearchIcon />
            </IconButton> &nbsp;

            <InputBase
               placeholder = " Search Name..."
               inputProps={{ 'aria-label': 'naked' }}
               name= "search"
               onChange={funSearch}
             /> &emsp;

             <IconButton onClick={() => changeSort("DESC")} size="medium">
               <ArrowUpwardIcon />
             </IconButton>

             <IconButton onClick={() => changeSort("ASC")} size="medium">
               <ArrowDownwardIcon />
             </IconButton>
          </Grid><br />
          <Grid container className={classes.grid} spacing={0}>
            <Grid item xs={11}>
              <Grid container justify="center" spacing={4}>
              {viewMainProduct.length !== 0 ?
              viewMainProduct.map((data, index) => {
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
            }) : <Avatar alt="Remy Sharp" src="https://cdn.dribbble.com/users/159377/screenshots/3846578/searchemptystate_2x.png" className={classes.bigAvatar} />}
            </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
export default withRouter(OrderPage)
