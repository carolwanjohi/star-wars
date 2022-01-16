import * as React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


function ErrorSnackbar({error, isErrorOpen, handleErrorSnackbarClose}) {
  if (!error.status) {
    return null;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    handleErrorSnackbarClose(false);
  };

  const message = () => {
    const { status } = error;

    switch(status){
      case 404:
        return 'Please contact the administrator'

      default:
        return 'Something went wrong, please try again'}
  }

  return (
      <Snackbar
        open={isErrorOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: '100%' }}
          elevation={6}
        >
          {message()}
        </Alert>
      </Snackbar>
  );
}

ErrorSnackbar.propTypes = {
  isErrorOpen: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    status: PropTypes.number
  }).isRequired,
  handleErrorSnackbarClose: PropTypes.func.isRequired,
}

export default ErrorSnackbar;
