import React, { useEffect }  from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

export default function AlertMessage(props) {
  useEffect(() => {
    if (props.visible) {
      setTimeout(() => props.clearAlert(), 2000)
    }
  })
  const icon = props.contentMessage.type === 'error' 
    ? 'https://cdn.iconscout.com/icon/premium/png-256-thumb/alert-attention-danger-error-exclamation-problem-31201.png'
    : 'https://cdn1.iconfinder.com/data/icons/color-bold-style/21/34-512.png'

  return (
    <div className='snackbar-block'>
      <Snackbar 
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={props.visible}
        className='snackbar-root'
      >
        <SnackbarContent 
          aria-describedby="client-snackbar" 
          className={`snackbar-content ${props.contentMessage.type}`}
          message={
            <>
              <img
                onClick={props.clearAlert}
                src={icon}
                alt=''
              />
              <span id="client-snackbar">{props.contentMessage.text}</span>
              <img
                onClick={props.clearAlert}
                src='https://www.freeiconspng.com/uploads/white-close-button-png-16.png' 
                alt=''
              />
            </>
          }
        >
        </SnackbarContent>
      </Snackbar>
    </div>
  )
}