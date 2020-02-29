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
import PeopleIcon from '@material-ui/icons/People';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import makeSelectLoungePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles';
import TabPanel from '../../components/TabPanel';


export function LoungePage() {
  useInjectReducer({ key: 'loungePage', reducer });
  useInjectSaga({ key: 'loungePage', saga });
  const classes = styles();
  const [tabsValue, setTabsValue] = React.useState(0);

  const handleTabsChange = (event, newValue) => {
    setTabsValue(newValue);
  };
  return (
    <div>
      <Helmet>
        <title>LoungePage</title>
        <meta name="description" content="Description of LoungePage" />
      </Helmet>
      <Tabs value={tabsValue} onChange={handleTabsChange} aria-label="navigation">
        <Tab label="Teams" icon={<PeopleIcon />} />
        <Tab label="Chat" icon={<MessageIcon />} />
      </Tabs>
      <TabPanel value={tabsValue} index={0} isVertical>
        <div>123</div>
      </TabPanel>
      <TabPanel value={tabsValue} index={1} isVertical>
        <div>123</div>
      </TabPanel>
      { ' ' }
    </div>
  );
}

LoungePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loungePage: makeSelectLoungePage(),
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
)(LoungePage);
