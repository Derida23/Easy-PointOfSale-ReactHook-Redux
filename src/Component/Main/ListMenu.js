import React from 'react';
import { Link } from 'react-router-dom';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import SettingsIcon from '@material-ui/icons/Settings';

import { ListItem, ListItemIcon,
         ListItemText, Divider } from '@material-ui/core';

import AddProduct from '../Page/AddProduct';
import AddCategory from '../Page/AddCategory';
import Logout from './Logout';
export const mainListItems = (
  <div>
    <ListItem button component={ Link } to="/dashboard/product">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>

    <ListItem button component={ Link } to="/dashboard/report">
      <ListItemIcon>
        <InsertChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>

    <AddProduct />
    <AddCategory />

    <Divider /> <br />

    <ListItem button component={ Link } to="/dashboard/adminproduct">
      <ListItemIcon>
        <DataUsageIcon />
      </ListItemIcon>
      <ListItemText primary="Product Data" />
    </ListItem>

    <ListItem button component={ Link } to="/dashboard/admincategory">
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Category Data" />
    </ListItem>
    <Logout />
  </div>
);
