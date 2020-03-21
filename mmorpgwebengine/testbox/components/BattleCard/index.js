import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Badge from '@material-ui/core/Badge';

import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LinkIcon from '@material-ui/icons/Link';
import moment from 'moment';
import LinearProgress from '@material-ui/core/LinearProgress';

import styles from './styles';

function BattleCard(props) {
  const classes = styles(props);
  const { battle, onConnect } = props;

  const handleConnectBattle = (teamId) => {
    onConnect(teamId);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={(
          <Avatar aria-label="recipe" className={classes.avatar}>
            { battle.mapSize.substring(0, 1) }
          </Avatar>
        )}

        title={battle.teamPlayerCount}
        subheader={`from ${battle.maxPlayerCount}`}
      />

      <CardContent>
        <LinearProgress variant="determinate" value={(battle.teamPlayerCount * 100) / battle.maxPlayerCount} />
      </CardContent>
      <CardActions disableSpacing classes={{ root: classes.action }}>
        <IconButton onClick={handleConnectBattle(battle._id)}>
          <LinkIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
BattleCard.propTypes = {
  battle: PropTypes.object,
  onConnect: PropTypes.func,
};

export default BattleCard;
