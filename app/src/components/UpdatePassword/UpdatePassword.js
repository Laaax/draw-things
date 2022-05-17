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
import styles from './UpdatePassword.module.scss';
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
  noLink: {
    marginTop: '12px',
  },
}));

class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.state = {
      username: '',
      password: '',
      message: '',
      alert: false,
      validToken: false,
    };
  }

  componentDidMount() {
    let user;
    (async () => {user = await Api.getUsername();
      if (user) {
        this.props.history.push("/main");
        return;
      };
    })();
    let res;
    (async () => {res = await Api.checkResetLink(this.props.match.params.token);
      if (res.data.message) {
        this.setState({validToken: true, username: res.data.username})
      }
    })();
  }

  updatePassword() {
    let res;
    (async () => {
      res = await Api.updatePassword(this.state.username, this.state.password);
      if (res.data) {
        if (res.data.message) {
          this.setState({ message: res.data.message, alert: true });
        } else {
          this.setState({ message: res.data.message, alert: true });
        }
      } else {
        this.setState({ message: res.response.data.message, alert: true });
      }
    })();
  }

  handleClick() {
    this.setState({alert: true});
  };

  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({alert: false});
  }

  render() {
    const { classes } = this.props;

    if (this.state.validToken) {
    return (
      <div className={styles.updatePassword}>
        <TopBar />
        <Container maxWidth="md">
          <Box className={classes.form} component="form">
            <BlackTextTypography variant="h3" align="center" color='common.black'>Update Password</BlackTextTypography>
            <div className={classes.inputs}>
              <TextField className={classes.label}
              id="password"
              label="New Password"
              type="password"
              value={this.state.password}
              onChange={e => this.setState({password: e.target.value})}
              InputProps={{
                className: classes.input,
              }}
            
            />

            </div>
            <div className={classes.middle}>
              <Button className={classes.button} onClick={this.updatePassword} size="large" variant="outlined">update password</Button>
            </div>
            
            <Button className={classes.button} onClick={this.handleClick} size="small" variant="outlined">alert</Button>
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
    } else {
      return(
        <div>
          <TopBar />
          <Container maxWidth="md">
            <Typography className={classes.noLink} variant="body1" color="textSecondary" component="p">
              Link is unavailable
            </Typography>
          </Container>
        </div>
      );
    }
  }

}

UpdatePassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(withRouter(UpdatePassword));
