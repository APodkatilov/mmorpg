import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MessageIcon from '@material-ui/icons/Message';
import DvrIcon from '@material-ui/icons/Dvr';
import MapIcon from '@material-ui/icons/Map';
import TimelineIcon from '@material-ui/icons/Timeline';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import makeSelectBattlePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import TabPanel from '../../components/TabPanel';
import BattleState from './BattleState';
import styles from './styles';
import BattleMap from './BattleMap';

export function BattlePage() {
  useInjectReducer({ key: 'battlePage', reducer });
  useInjectSaga({ key: 'battlePage', saga });
  const classes = styles();
  const [tabsValue, setTabsValue] = React.useState(0);

  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };

  return (
    <>
      <Helmet>
        <title>BattlePage</title>
        <meta name="description" content="Description of BattlePage" />
      </Helmet>
      <Tabs value={tabsValue} onChange={handleTabsChange} aria-label="navigation">
        <Tab label="State" icon={<DvrIcon />} />
        <Tab label="Chat" icon={<MessageIcon />} />
        <Tab label="Map" icon={<MapIcon />} />
        <Tab label="Moves" icon={<TimelineIcon />} />
      </Tabs>
      <TabPanel value={tabsValue} index={0} isVertical>
        <BattleState />
      </TabPanel>
      <TabPanel value={tabsValue} index={1} isVertical>
        <div>123</div>
      </TabPanel>
      <TabPanel value={tabsValue} index={2} isVertical>
        { tabsValue === 2 && <BattleMap /> }
      </TabPanel>
      <TabPanel value={tabsValue} index={3} isVertical>
        <div>123</div>
      </TabPanel>
    </>
  );
}

BattlePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  battlePage: makeSelectBattlePage(),
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
)(BattlePage);
