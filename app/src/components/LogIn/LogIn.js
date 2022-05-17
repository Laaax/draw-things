import {Component} from 'react';
import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { withRouter, Link } from "react-router-dom";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import TopBar from '../../components/TopBar/TopBar.js';
import RedirectLog from './Redirect.js'

import Api from '../api.js';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import styles from './LogIn.module.scss';
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
  bar: {
    display: 'inline-block',
  }
}));

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.logIn = this.logIn.bind(this);
    this.handleClose = this.handleClose.bind(this);

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
    this.setState({alert: false});
  }

  async logIn() {
    let res;
    (async () => {
      res = await Api.logIn(this.state.username, this.state.password);
      if (res.data) {
        if (res.data.message === 'Success') {
          this.props.history.push("/main");
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
      <div className={styles.LogIn}>
        <TopBar />
        
        <Container maxWidth="md">
          
          <Box className={classes.form} component="form">
            <BlackTextTypography variant="h3" align="center" color='common.black'>Log In</BlackTextTypography>
            <div className={classes.inputs}>
              <TextField className={classes.label}
              id="username"
              label="Username"
              value={this.state.username}
              onChange={e => this.setState({username: e.target.value})}
              InputProps={{
                className: classes.input,
              }}
            
            />
              <TextField className={classes.label}
              id="password"
              label="Password"
              type="password"
              value={this.state.password}
              onChange={e => this.setState({password: e.target.value})}
              InputProps={{
                className: classes.input,
              }}
              />
            </div>
            <div className={classes.middle}>
              <Button className={classes.button} onClick={this.logIn} size="large" variant="outlined">log In</Button>
              <Link align='center' to="/login/reset-password">reset password</Link>
            </div>
            
            <div className={classes.bottom}>
              <Divider className={classes.divider} variant="fullWidth" />
              <BlackTextTypography align='center' variant='h6'>No account?</BlackTextTypography>
              <RedirectLog />              
            </div>
          </Box>
        </Container>
        <Snackbar open={this.state.alert} autoHideDuration={6000} onClose={this.handleClose} message="" action={
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

LogIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(withRouter(LogIn));
