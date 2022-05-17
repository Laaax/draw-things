import React from 'react';
import {Component} from 'react';
import styles from './Profile.module.scss';

import TopBar from '../../components/TopBar/TopBar.js';
import AvatarBar from './AvatarBar.js';
import Pictures from './Pictures.js';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Container from '@material-ui/core/Container';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.foundUser = this.foundUser.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      foundUser: false,
      sentReq: false,
      message: '',
      alert: false,
    };
  }

  foundUser = (e) => {
    // e is true or false
    this.setState({ foundUser: e, sentReq: true });
  };

  handleClose(event, reason) {
    this.setState({alert: false});
  }

  setMessage(msg) {
    this.setState({ message: msg, alert: true });
  }

  render() {
    return (
      <div className={styles.Profile}>
        
        <TopBar />
        <AvatarBar foundUser={this.foundUser} />
        <Container maxWidth="md">
          <Pictures foundUser={this.state.foundUser} sentReq={this.state.sentReq} setMessage={this.setMessage} />
        </Container>
        <Snackbar open={this.state.alert} autoHideDuration={6000} onClose={this.handleClose} message="hi" action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }>
          <SnackbarContent style={{
              backgroundColor:'gray',
              color: 'white',
            }}
            message={this.state.message}
            action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
        }
          />
        </Snackbar>
      </div>
    );
  }
}

export default Profile;
