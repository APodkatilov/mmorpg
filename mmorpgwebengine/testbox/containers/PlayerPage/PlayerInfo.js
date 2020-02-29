import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styles from './styles';

function PlayerInfo(props) {
  const classes = styles();
  return (
    <>
      <Paper elevation={3} classes={{ root: classes.block }}>
        <Typography>12345</Typography>
      </Paper>
      <Paper elevation={3} classes={{ root: classes.block }}>
        <Box p={2}>
          <Typography>12345</Typography>
        </Box>
      </Paper>

    </>
  );
}
PlayerInfo.propTypes = {
};

export default PlayerInfo;
