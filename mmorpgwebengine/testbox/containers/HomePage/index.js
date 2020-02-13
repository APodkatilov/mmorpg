/* eslint-disable no-underscore-dangle */
/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';
import '../../styles/main.css';

import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from '../App/selectors';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function HomePage({
  username,
  onSubmitForm,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });


  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);


  let ws = null;
  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState('');
  const _websocketConnect = () => {
    ws = new WebSocket(`ws://localhost:3030?token=${token}`);
    ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      // eslint-disable-next-line no-console
      console.log('WS connected');
    };

    ws.onmessage = (evt) => {
      // on receiving a message, add it to the list of messages
      // eslint-disable-next-line no-console
      console.log('WS message');
      // const message = JSON.parse(evt.data)
      // /this.addMessage(message)
      setMessages([...messages, evt.data]);
    };

    onclose = () => {
      // eslint-disable-next-line no-console
      console.log('WS disconnected');
      // automatically try to reconnect on connection loss
      // this.setState({
      //   ws: new WebSocket(URL),
      // })
    };
  };

  const _sendMessage = () => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { name: 'name', message: 'messagem' };
    ws.send(JSON.stringify(message));
  };

  const _close = () => {
    ws.close();
  };

  const _clear = () => {
    setMessages([]);
  };

  const _handleInput = (event) => {
    const { value } = event.target;

    setToken(value);
  };

  const _login = async () => {
    const res = await axios.post('/api/auth/signon', {
      Nickname: 'r4',
      Email: 'r4@test.com',
      Password: '123',
    });
    // eslint-disable-next-line no-console
    console.log(res);
  };

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div>
        <div>
          <h1 className="app">HEY!</h1>
          <button type="button" onClick={() => _websocketConnect()}>Connect</button>
          <button type="button" onClick={() => _sendMessage()}>Send</button>
          <button type="button" onClick={() => _close()}>Close</button>
          <button type="button" onClick={() => _clear()}>Clear</button>
          <button type="button" onClick={() => _login()}>Singin</button>

          <div>
            <span>Message:</span>
            <div>{ messages.map((m, index) => <p key={index.toString()}>{ m }</p>) }</div>
          </div>
          <div>
            <span>Token:</span>
            <input type="text" onChange={_handleInput} vakue={token}></input>
          </div>
        </div>
        { /* <CenteredSection>
          <H2>
            <FormattedMessage {...messages.startProjectHeader} />
          </H2>
          <p>
            <FormattedMessage {...messages.startProjectMessage} />
          </p>
        </CenteredSection> */ }
        { /* <Section>
          <H2>
            <FormattedMessage {...messages.trymeHeader} />
          </H2>
          <Form onSubmit={onSubmitForm}>
            <label htmlFor="username">
              <FormattedMessage {...messages.trymeMessage} />
              <AtPrefix>
                <FormattedMessage {...messages.trymeAtPrefix} />
              </AtPrefix>
              <Input
                id="username"
                type="text"
                placeholder="mxstbr"
                value={username}
                onChange={onChangeUsername}
              />
            </label>
          </Form>
          <ReposList {...reposListProps} />
        </Section> */ }
      </div>
    </article>
  );
}

HomePage.propTypes = {
  // loading: PropTypes.bool,
  // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
//  onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
