import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar, Toolbar, IconButton, Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import MessageIcon from '@material-ui/icons/Message';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './styles';


function HeaderBar(props) {
  const { isDrawerOpen, onDrawerOpen } = props;
  const classes = styles();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isAccountMenuOpen = Boolean(anchorEl);
  const handleAccountMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };
  const accountMenuId = 'accountMenuId';
  const mobileMenuId = 'mobileMenuId';

  const renderAccountMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={accountMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isAccountMenuOpen}
      onClose={handleAccountMenuClose}
    >
      <MenuItem onClick={handleAccountMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleAccountMenuClose}>Exit</MenuItem>
    </Menu>
  );
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MessageIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleAccountMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Account</p>
      </MenuItem>
    </Menu>
  );
  return (
    <>
      { renderMobileMenu }
      { renderAccountMenu }

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isDrawerOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            arial-label="menu"
            className={clsx(classes.menuButton, { [classes.hide]: isDrawerOpen })}
            onClick={onDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variat="h6" color="inherit" noWrap className={classes.appBartitle}>
            Dashboard
          </Typography>
          <div className={classes.grow} />
          <div className={classes.statusMenuDesktop}>
            <IconButton aria-label="" color="inherit">
              <Badge badgeContent={9} color="secondary">
                <MessageIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account"
              aria-controls={accountMenuId}
              aria-haspopup="true"
              onClick={handleAccountMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.statusMenuMobile}>
            <IconButton
              aria-label="more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>

        </Toolbar>
      </AppBar>
    </>
  );
}

HeaderBar.propTypes = {
  isDrawerOpen: PropTypes.bool,
  onDrawerOpen: PropTypes.func,
};

export default HeaderBar;
