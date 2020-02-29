import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import {
  IconButton,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import GamesIcon from '@material-ui/icons/Games';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


import styles from './styles';

function MainDrawer(props) {
  const classes = styles();
  const { isDrawerOpen, onDrawerClose, onNavigation } = props;


  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, { [classes.drawerOpen]: isDrawerOpen, [classes.drawerClose]: !isDrawerOpen })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isDrawerOpen,
          [classes.drawerClose]: !isDrawerOpen,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={onDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button onClick={() => onNavigation('player')}>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary="Player" />
        </ListItem>
        <ListItem button onClick={() => onNavigation('lounge')}>
          <ListItemIcon><LocalBarIcon /></ListItemIcon>
          <ListItemText primary="Lounge" />
        </ListItem>
        <ListItem button onClick={() => onNavigation('battle')}>
          <ListItemIcon><GamesIcon /></ListItemIcon>
          <ListItemText primary="Battle" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => onNavigation('exit')}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Exit" />
        </ListItem>
      </List>
    </Drawer>
  );
}

MainDrawer.propTypes = {
  isDrawerOpen: PropTypes.bool,
  onDrawerClose: PropTypes.func,
  onNavigation: PropTypes.func,
};

export default MainDrawer;
