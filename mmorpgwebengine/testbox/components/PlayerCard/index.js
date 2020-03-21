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
import moment from 'moment';

import styles from './styles';

function PlayerCard(props) {
  const classes = styles();
  const { player } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const createAt = moment(player.createAt);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={(
          <Badge badgeContent={player.stat.level} color="primary">
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          </Badge>
        )}

        title="Real Jo"
        subheader={`from ${createAt.format('ll')}`}
      />

      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="body1" color="textSecondary" align="left">Win:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="textSecondary" align="right">{ player.stat.winBattles }</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="textSecondary" align="left">Lost:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary" align="right">{ player.stat.loseBattles }</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
PlayerCard.propTypes = {
  player: PropTypes.object,
};

export default PlayerCard;
