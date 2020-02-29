import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import Alert from '@material-ui/lab/Alert';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import { makeSelectSignInError } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { signIn } from './actions';


const useStyles = makeStyles((theme) => ({

  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    marginTop: theme.spacing(2),
  },
}));

SignInForm.propTypes = {
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  touched: PropTypes.shape({
    email: PropTypes.bool,
    password: PropTypes.bool,
  }),
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleBlur: PropTypes.func,
  labelEmail: PropTypes.string,
  labelPassword: PropTypes.string,
  isSubmitting: PropTypes.bool,
};

function SignInForm({
  errors,
  touched,
  handleChange,
  handleSubmit,
  handleBlur,
  labelEmail,
  labelPassword,
  isSubmitting,
}) {
  const classes = useStyles();
  return (

    <form className={classes.form} noValidate onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label={labelEmail}
        name="email"
        error={touched.email && Boolean(errors.email)}
        helperText={touched.email ? errors.email : ''}
        onChange={handleChange}
        autoComplete="email"
        autoFocus
        onBlur={handleBlur}
      ></TextField>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        error={touched.password && Boolean(errors.password)}
        helperText={touched.password ? errors.password : ''}
        onChange={handleChange}
        onBlur={handleBlur}
        label={labelPassword}
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button type="submit" disabled={isSubmitting} fullWidth variant="contained" color="primary" className={classes.submit}><FormattedMessage {...messages.signIn} /></Button>
      <Grid container justify="flex-end">
        <Link href="/signup" variant="body2"><FormattedMessage {...messages.signUp} /></Link>
      </Grid>
    </form>
  );
}
export function SignInPage({ intl, error, onAuth }) {
  useInjectReducer({ key: 'signIn', reducer });
  useInjectSaga({ key: 'signIn', saga });
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <Helmet>
        <title>Sign In</title>
        <meta name="signin" content="sign in form" />
      </Helmet>


      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          <FormattedMessage {...messages.signIn} />
        </Typography>
      </div>
      { error && <Alert className={classes.alert} severity="error">{ error }</Alert> }
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().required(intl.formatMessage(messages.validationFieldRequired)).email(intl.formatMessage(messages.validationEmailFormat)),
          password: Yup.string().required(intl.formatMessage(messages.validationFieldRequired)),
        })}
        onSubmit={(values, { setSubmitting }) => {
          onAuth(values.email, values.password);
          setSubmitting(false);
        }}
      >
        { (props) => <SignInForm {...props} labelEmail={intl.formatMessage(messages.email)} labelPassword={intl.formatMessage(messages.password)} /> }
      </Formik>
    </Container>
  );
}

SignInPage.propTypes = {
  intl: intlShape.isRequired,
  onAuth: PropTypes.func.isRequired,
  error: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectSignInError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onAuth: (email, password) => dispatch(signIn(email, password)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
  withConnect,
  injectIntl,
)(SignInPage);
