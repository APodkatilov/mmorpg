import React from 'react';
import PropTypes from 'prop-types';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import PersonIcon from '@material-ui/icons/Person';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import GamesIcon from '@material-ui/icons/Games';

import styles from './styles';


function FooterBar(props) {
  const { onNavigation } = props;
  const classes = styles();
  const [part, setPart] = React.useState(0);


  return (
    <>
      <BottomNavigation
        value={part}
        onChange={
          (event, newValue) => { setPart(newValue); }
        }
        showLables
        className={classes.bottomNavigation}
      >
        <BottomNavigationAction label="Player" icon={<PersonIcon />} onClick={() => onNavigation('player')} />
        <BottomNavigationAction label="Lounge" icon={<LocalBarIcon />} onClick={() => onNavigation('lounge')} />
        <BottomNavigationAction label="Battle" icon={<GamesIcon />} onClick={() => onNavigation('battle')} />
      </BottomNavigation>

    </>
  );
}

FooterBar.propTypes = {
  onNavigation: PropTypes.func,
};

export default FooterBar;
