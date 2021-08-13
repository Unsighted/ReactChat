import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import  { Google }  from '../google/google';

const useStyles = makeStyles((theme) => ({
    root: {
      height: 300,
      flexGrow: 1,
      minWidth: 300,
      transform: 'translateZ(1)',
      '@media all and (-ms-high-contrast: none)': {
        display: 'none',
      },
    },
    modal: {
      display: 'flex',
      padding: theme.spacing(1),
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      width: 250,
      backgroundColor: '#2e2e2e',
      borderRadius: '10px',
      outline:'0',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
  export const ModalInstagram = () => {
    const classes = useStyles();
    const rootRef = React.useRef(null);
  
    return (
      <div className={classes.root} ref={rootRef}>
        <Modal id="firstModal"
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          open
          aria-labelledby="server-modal-title"
          aria-describedby="server-modal-description"
          className={classes.modal}
          container={() => rootRef.current}
        >
          <div className={classes.paper}>
            {/* <Modal  className="md"/> */}
            <div id="server-modal-description"><div className="google-btn" style={{ cursor: 'pointer' }}>
              <div className="google-icon-wrapper">
                <img className="google-icon" alt="" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
              </div>
            <p className="btn-text" onClick={Google}><b>Sign in with google</b></p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }