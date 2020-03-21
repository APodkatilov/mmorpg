import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import styles from './styles';
import PlayerCard from '../../components/PlayerCard';

function OnlinePlayer(props) {
  const classes = styles();
  const { activePlayers } = props;
  return (
    <>
      <Paper elevation={3} classes={{ root: classes.block }}>
        { activePlayers.map((activePlayer, index) => <PlayerCard player={activePlayer} key={index.toString()} />) }
      </Paper>
    </>
  );
}
OnlinePlayer.propTypes = {
  activePlayers: PropTypes.arrayOf(PropTypes.object),
};

export default OnlinePlayer;
