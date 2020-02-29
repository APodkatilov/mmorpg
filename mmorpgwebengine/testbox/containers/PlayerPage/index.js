/**
 *
 * PlayerPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ListIcon from '@material-ui/icons/List';
import BuildIcon from '@material-ui/icons/Build';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import makeSelectPlayerPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import TabPanel from '../../components/TabPanel';

import PlayerInfo from './PlayerInfo';
import PlayerAmunition from './PlayerAmunition';

import PlayerShop from './PlayerShop';

import styles from './styles';


export function PlayerPage() {
  useInjectReducer({ key: 'playerPage', reducer });
  useInjectSaga({ key: 'playerPage', saga });
  const classes = styles();

  const [tabsValue, setTabsValue] = React.useState(0);

  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  return (
    <>
      <Helmet>
        <title>PlayerPage</title>
        <meta name="description" content="Description of PlayerPage" />
      </Helmet>
      <Tabs value={tabsValue} onChange={handleTabsChange} aria-label="navigation">
        <Tab label="Info" icon={<ListIcon />} />
        <Tab label="Ammunition" icon={<BuildIcon />} />
        <Tab label="Shop" icon={<ShoppingCartIcon />} />
      </Tabs>
      <TabPanel value={tabsValue} index={0} isVertical>
        <PlayerInfo />
      </TabPanel>
      <TabPanel value={tabsValue} index={1} isVertical>
        <PlayerAmunition />
      </TabPanel>
      <TabPanel value={tabsValue} index={2}>
        <PlayerShop />
        { /* { Array(20).fill(1).map(() => <BattleCard />) } */ }
      </TabPanel>
    </>
  );
}

PlayerPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  playerPage: makeSelectPlayerPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
)(PlayerPage);
