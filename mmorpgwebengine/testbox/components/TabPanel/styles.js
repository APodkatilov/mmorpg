import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  tab: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    overflowY: 'auto',

  },
  verticalTab: {
    flexDirection: 'column',
  },
  hiddenTab: {
    display: 'none',
  },
}));
