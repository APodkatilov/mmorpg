/**
 * Asynchronously loads the component for NotFoundPage
 */

import React from 'react';
import loadable from '../../utils/loadable';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

export default loadable(() => import('./index'), {
  fallback: <RotateLeftIcon />,
});
