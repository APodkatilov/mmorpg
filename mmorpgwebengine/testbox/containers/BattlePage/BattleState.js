import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import Step from '@material-ui/core/Step';

import Button from '@material-ui/core/Button';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import SelectMapSate from './SelectMapStep';
import styles from './styles';
import SelectMapStep from './SelectMapStep';
import BuildTeamsStep from './BuildTeamsStep';
import StartStep from './StartStep';
// import TeamCard from '../../components/TeamCard';

function BattleState(props) {
  const classes = styles();
  const { battle } = props;
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleDiscard = () => {
  };

  const steps = ['Select map...', 'Team building...', 'Start...'];
  const renderStep = (step) => {
    switch (step) {
      case 0:
        return <SelectMapStep />;
      case 1:
        return <BuildTeamsStep />;
      case 2:
        return <StartStep />;
      default:
        throw new Error('No step');
    }
  };

  return (
    <>
      <Paper elevation={3} classes={{ root: classes.block }}>
        <Stepper activeStep={step} alternativeLabel>
          { steps.map((label) => <Step><StepLabel>{ label }</StepLabel></Step>) }
        </Stepper>

        { renderStep(step) }

        <div className={classes.stepperButtonBox}>
          <Button variant="contained" color="primary" onClick={handleDiscard}>
            Discard
          </Button>

          <Button variant="contained" color="primary" onClick={handleNext} classes={{ root: classes.stepperButton }}>
            { step === steps.length - 1 ? 'Finish' : 'Next' }
          </Button>

        </div>

        { /* { activeTeams.map((activeTeam, index) => <TeamCard team={activeTeam} key={index.toString()} onConnect={handleConnectTeam} />) } */ }
        { /* <Fab color="primary" aria-label="add" classes={{ root: classes.fab }} onClick={handleCreateTeam}>
          <DirectionsRunIcon />
        </Fab> */ }
      </Paper>
    </>
  );
}
BattleState.propTypes = {
  battle: PropTypes.object,
};

export default BattleState;
