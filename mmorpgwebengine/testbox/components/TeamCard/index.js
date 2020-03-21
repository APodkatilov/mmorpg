import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ListItemText from '@material-ui/core/ListItemText';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import moment from 'moment';
import { range } from 'lodash';

import styles from './styles';

function TeamCard(props) {
  const classes = styles(props);
  const { team, teamPlayerCount, onLeave } = props;

  const handleLeave = (teamId) => {
    onLeave(teamId);
  };
  const createAt = moment(team.createAt);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={(
          <Avatar aria-label="recipe" className={classes.avatar}>
            { team.name.substring(0, 1) }
          </Avatar>
        )}

        title={team.name}
        subheader={`from ${createAt.format('ll')}`}
      />

      <CardContent>
        <List component="nav" aria-label="main mailbox folders">
          { range(teamPlayerCount).map((_, index) => (
            <ListItem key={index.toString()}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={index < team.players.length ? team.players[index].nickname : '<empty>'} />
            </ListItem>
          )) }

        </List>
      </CardContent>
      <CardActions disableSpacing classes={{ root: classes.action }}>
        <IconButton onClick={handleLeave(team._id)}>
          <ExitToAppIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
TeamCard.propTypes = {
  team: PropTypes.object,
  teamPlayerCount: PropTypes.number,
  onLeave: PropTypes.func,
};

export default TeamCard;
