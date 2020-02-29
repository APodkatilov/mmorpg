import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import NotFoundPage from '../NotFoundPage/Loadable';
import SignInPage from '../SignInPage';
import Dashboard from '../Dashboard';

import GlobalStyle from '../../global-styles';
import theme from './theme';
import withAuth from '../../utils/withAuth';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from './saga';

export default function App() {
  useInjectSaga({ key: 'app', saga });
  return (
    <ThemeProvider theme={theme}>
      <Helmet
        titleTemplate="%s - MMORPG Testbox"
        defaultTitle="Testbox"
      >
        <meta name="description" content="MMORGP Testbox" />
      </Helmet>
      <Switch>
        <Route exact path="/" component={withAuth(null, null, '/signin', '/dashboard')} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/dashboard" component={withAuth(null, Dashboard, '/signin')} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </ThemeProvider>
  );
}
