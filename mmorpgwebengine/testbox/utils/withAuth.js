/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import Settings from '../settings';
import history from './history';


function withAuth(PublicWrappedComponent, PrivateWrappedComponent, publicRedirect = null, privateRedirect = null) {
  return class extends React.Component {
    static propTypes = {
      history: PropTypes.object,
    };

    render() {
      const token = Settings.authToken;

      if (token && privateRedirect) {
        history.replace(privateRedirect);
        return null;
      }

      if (!token && publicRedirect) {
        history.replace(publicRedirect);
        return null;
      }

      return token ? <PrivateWrappedComponent {...this.props} /> : <PublicWrappedComponent {...this.props} />;
    }
  };
}

export default withAuth;
