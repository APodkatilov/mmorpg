/* eslint-disable no-underscore-dangle */
import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { createStructuredSelector } from 'reselect';
import styles from './styles';
import BattleCard from '../../components/BattleCard';
import { getBattles, createBattle, connectBattle } from './actions';
import { makeSelectActiveBattles } from './selectors';

function ActiveBattles(props) {
  const classes = styles();
  const {
    history, onGetBattles, onCreateBattle, onConnectBattle, activeBattles,
  } = props;

  useEffect(() => {
    onGetBattles();
  }, []);

  const handleCreateBattle = () => {
    history.push('/dashboard/battle');
  };

  const handleConnectBattle = (battleId) => {
    onConnectBattle(battleId);
  };

  return (
    <>
      <Paper elevation={3} classes={{ root: classes.block }}>
        { activeBattles.data && activeBattles.data.map((battle) => <BattleCard battle={battle} key={battle._id} onConnect={() => handleConnectBattle(battle._id)} />) }
        <Fab color="primary" aria-label="add" classes={{ root: classes.fab }} onClick={handleCreateBattle}>
          <AddIcon />
        </Fab>

      </Paper>
    </>
  );
}

ActiveBattles.propTypes = {
  history: PropTypes.object,
  onGetBattles: PropTypes.func.isRequired,
  activeBattles: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    data: PropTypes.object,
  }),
};

const mapStateToProps = createStructuredSelector({
  activeBattles: makeSelectActiveBattles(),
});

function mapDispatchToProps(dispatch) {
  return {
    onGetBattles: () => dispatch(getBattles()),
    onCreateBattle: () => dispatch(createBattle()),
    onConnectBattle: (battleId) => dispatch(connectBattle(battleId)),

  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  withRouter,
)(ActiveBattles);
