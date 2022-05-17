import {Component} from 'react';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { withRouter } from "react-router-dom";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import TopBar from '../../components/TopBar/TopBar.js';
import Api from '../api.js';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import styles from './ResetPassword.module.scss';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const BlackTextTypography = withStyles({
  root: {
    color: "black",
  },
})(Typography);

const useStyles = ((theme) => ({
  drawing: {
    width: '256px',
    height: '256px',
    backgroundColor: 'white',
    '&:hover': {
      cursor:'none',
    },
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    height: '500px',
    width: '400px',
    margin: 'auto',
    marginTop: '12px',
    backgroundColor: '#f2ece9',
    padding: '30px',
    paddingBottom: '10px',
    justifyContent: 'space-around',
    borderRadius: '5px',
  },

  inputs: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '130px',
  },

  container: {
    margin: 'auto',
    width: '512px',
  },

  label: {
    '& .MuiInputLabel-root': {
      color: 'black',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'black',
    },
    '&:hover .MuiInput-underline:before': {
      borderBottomColor: '#65C5C7',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#65C5C7',
    },
  },
  input: {
    color: 'black',
  },
  button: {
    color: 'black',
    borderColor: 'black',
    '&:hover': {
      color: '#49abad',
      borderColor: '#65C5C7',
    },
  },
  middle: {
    display: 'flex',
    flexDirection: 'column',
  },
  bottom: {
    display: 'flex',
    height: '80px',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  divider: {
    background: 'gray',
  },
}));

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.resetPassword = this.resetPassword.bind(this);

    this.state = {
      username: '',
      email: '',
      password: '',
      message: '',
      alert: false,
    };
  }

  componentDidMount() {
    let user;
    (async () => {user = await Api.getUsername();
      if (user) {
        this.props.history.push("/main");
      };
    })();
  }

  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({alert: false});
  }

  resetPassword() {
    let res;
    (async () => {
      res = await Api.resetPassword(this.state.email);
      if (res.data) {
        if (res.data.message === 'Success') {
          this.setState({ message: res.data.message, alert: true });
        } else {
          this.setState({ message: res.data.message, alert: true });
        }
      } else {
        this.setState({ message: res.response.data.message, alert: true });
      }
    })();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={styles.resetPassword}>
        <TopBar />
        <Container maxWidth="md">
          <Box className={classes.form} component="form">
            <BlackTextTypography variant="h3" align="center" color='common.black'>Reset Password</BlackTextTypography>
            <div className={classes.inputs}>
              <TextField className={classes.label}
              id="email"
              label="Email"
              value={this.state.email}
              onChange={e => this.setState({email: e.target.value})}
              InputProps={{
                className: classes.input,
              }}
            
            />
            </div>
            <div className={classes.middle}>
              <Button className={classes.button} onClick={this.resetPassword} size="large" variant="outlined">reset password</Button>
            </div>
            
          </Box>
        </Container>
        <Snackbar open={this.state.alert} autoHideDuration={6000} onClose={this.handleClose} message="hi" action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }>
          <SnackbarContent style={{
              backgroundColor:'teal',
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

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(withRouter(ResetPassword));
