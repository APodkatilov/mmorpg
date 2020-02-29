import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { Switch, Route } from 'react-router-dom';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';

import MainDrawer from '../../components/MainDrawer';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';
import makeSelectDashboard from './selectors';
import PlayerPage from '../PlayerPage';
import HeaderBar from '../../components/HeaderBar';
import FooterBar from '../../components/FooterBar';
import LoungePage from '../LoungePage';
import BattlePage from '../BattlePage';
import withAuth from '../../utils/withAuth';
import { logout } from '../App/actions';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  contentBody: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    padding: theme.spacing(3),
    height: '100%',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },

}));


export function Dashboard(props) {
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });
  const classes = useStyles();
  // const theme = useTheme();

  const { history, onLogout } = props;

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleNavigation = (page) => {
    if (page === 'exit') {
      console.log('logout1');
      onLogout();
    } else {
      history.push(`/dashboard/${page}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      { /* <FormattedMessage {...messages.header} /> */ }
      <div className={classes.root}>
        <HeaderBar isDrawerOpen={isDrawerOpen} onDrawerOpen={handleDrawerOpen} />
        <MainDrawer isDrawerOpen={isDrawerOpen} onDrawerClose={handleDrawerClose} onNavigation={handleNavigation} />
        <Container maxWidth="false" classes={{ root: classes.contentBody }}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/dashboard" component={withAuth(null, null, '/signin', 'dashboard/player')} />
            <Route path="/dashboard/player" component={PlayerPage} />
            <Route path="/dashboard/lounge" component={LoungePage} />
            <Route path="/dashboard/battle" component={BattlePage} />
          </Switch>
          <FooterBar onNavigation={handleNavigation} />
        </Container>
      </div>
    </>
  );
}

Dashboard.propTypes = {
  history: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch(logout()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
)(Dashboard);
