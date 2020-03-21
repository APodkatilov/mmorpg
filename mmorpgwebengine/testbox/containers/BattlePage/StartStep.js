import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import * as PIXI from 'pixi.js';
import { range } from 'lodash';

import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

import styles from './styles';
import TeamCard from '../../components/TeamCard';

function StartStep(props) {
  const classes = styles();

  const handleLeave = (teamId, playerId) => {
    console.log(`leave ${playerId} from ${teamId}`);
  };


  const teams = [
    {
      name: 'team 1',
      _id: '1',
      createAt: new Date(),
      players: [{
        _id: '1',
        nickname: 'player1',
      }, {
        _id: '2',
        nickname: 'player2',
      }],

    },
    {
      name: 'team 2',
      _id: '2',
      createAt: new Date(),
      players: [{
        _id: '3',
        nickname: 'player3',
      }, {
        _id: '4',
        nickname: 'player4',
      }],

    },

  ];
  return (
    <Paper elevation={3} classes={{ root: classes.startStep }}>
      <Typography>Start...</Typography>
    </Paper>
  );
}
StartStep.propTypes = {
  teams: PropTypes.array,
};

export default StartStep;
