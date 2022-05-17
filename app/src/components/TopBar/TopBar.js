import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

import Api from '../api.js';

import styles from './TopBar.module.scss';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

// app bar
const useStyles = (theme) => ({
  root: {

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  left: {
    fontSize: 'large',
    textTransform: 'none',
  },
  vertDivider: {
    margin: '5px',
    marginTop: '8px',
    marginBottom: '8px',
    background: 'lightgray',
  },
});

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.goToDrawings = this.goToDrawings.bind(this);
    this.goHome = this.goHome.bind(this);
    this.goDraw = this.goDraw.bind(this);
    this.state = {
      username: null,
      sentReq: false,
    };
  }

  componentDidMount() {
    let user;
    (async () => {user = await Api.getUsername();
      if (user) {
        this.setState({ username: user });
      };
      this.setState({ sentReq: true });
    })();
  }

  logOut() {
    let res;
    (async () => {
      res = await Api.logOut();
      if (res.data) {
        if (res.data.message === "Logged out") {
          window.location.reload();
        }
      }
    })();
  }

  logIn() {
    this.props.history.push("/login");
  }

  goToDrawings() {
    this.props.history.push("/main");
  }

  goHome() {
    this.props.history.push(`/profile/${this.state.username}`);
  }

  goDraw() {
    this.props.history.push("/draw");
  }

  render() {
    const { classes } = this.props;
    if (!this.state.sentReq) {
      return (
        <div className={styles.TopBar}>
          <div className={classes.root}>
            <AppBar position="fixed">
              <Toolbar variant='dense'>
                
              </Toolbar>
            </AppBar>
            <Toolbar variant='dense'/>
          </div>
        </div>
      );
    } else if (this.state.username) {
      return (
        <div className={styles.TopBar}>
          <div className={classes.root}>
            <AppBar position="fixed">
              <Toolbar variant='dense'>
                <Button onClick={this.goHome} className={classes.left} color="inherit">{this.state.username}</Button>
                <Divider className={classes.vertDivider} orientation="vertical" flexItem />
                <Button onClick={this.goToDrawings} className={classes.left} color="inherit">Drawings</Button>
                <Divider className={classes.vertDivider} orientation="vertical" flexItem />
                <Button onClick={this.goDraw} className={classes.left} color="inherit">Draw Something</Button>
                <Typography variant="h6" className={classes.title}>
                
                </Typography>
                <Button onClick={this.logOut} color="inherit">Logout</Button>
              </Toolbar>
            </AppBar>
            <Toolbar variant='dense'/>
          </div>
        </div>
      );
    } else {
      return(
        <div className={styles.TopBar}>
          <div className={classes.root}>
            <AppBar position="fixed">
              <Toolbar variant='dense'>
                <Button onClick={this.goToDrawings} className={classes.left} color="inherit">Drawings</Button>
                <Typography variant="h6" className={classes.title}>
                  
                </Typography>

                <Button onClick={this.logIn} color="inherit">Login or Sign up</Button>
              </Toolbar>
            </AppBar>
            <Toolbar variant='dense'/>
          </div>
        </div>
      );
    }
  }

}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(withRouter(TopBar));
