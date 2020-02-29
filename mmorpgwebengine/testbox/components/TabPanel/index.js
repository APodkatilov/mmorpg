import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import styles from './styles';

function TabPanel(props) {
  const {
    children, value, index, isVertical,
  } = props;
  const classes = styles();
  const visible = value === index;
  return (
    <Box m={1} className={clsx(classes.tab, { [classes.hiddenTab]: !visible, [classes.verticalTab]: isVertical })}>
      { children }
    </Box>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  isVertical: PropTypes.bool,
};

export default TabPanel;
