import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  block: {
    flex: '1 1 auto',
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  battleMapBlock: {
    flex: '1 1 auto',
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  battleMapGrid: {
    width: '100%',
    height: '100%',
    margin: theme.spacing(2),
  },
  stepperButtonBox: {
    display: 'flex',
    flex: '0 0 auto',
    margin: theme.spacing(2),
    justifyContent: 'flex-end',
  },
  stepperButton: {
    marginLeft: theme.spacing(1),
  },

  selectMapStep: {
    display: 'flex',
    flexDirection: 'row',
    flex: '1 1 auto',
  },
  startStep: {
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectMapStepLeftPanel: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto',
  },
  selectMapStepRightPanel: {
    display: 'flex',
    flex: '1 1 0',
    backgroundColor: 'red',
  },
  buildTeamsStep: {
    display: 'flex',
    flex: '1 1 auto',
    alignItems: 'flex-start',
  },
  mapList: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    padding: theme.spacing(2),
  },
  formControl: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),

  },
  rightBox: {
    padding: theme.spacing(2),
    width: '100%',
    height: '100%',
  },

  mapBox: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),

  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },

}));
