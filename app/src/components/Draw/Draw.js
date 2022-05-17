import React, {Component, useRef} from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Api from '../api.js'

import TopBar from '../../components/TopBar/TopBar.js';

import Button from '@material-ui/core/Button';
import styles from './Draw.module.scss';
import CanvasDraw from "react-canvas-draw";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import SketchPick from '../SketchPick/SketchPick';

const useStyles = ((theme) => ({
  drawing: {
    '&:hover': {
      cursor:'none',
    },
    margin: 'auto',
    marginTop: '24px',
    marginBottom: '12px',
  },

  container: {
    margin: 'auto',
  },

  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '6px',
  },

  colorPick: {
    display: 'flex',
    marginLeft: '2px',
    marginRight: '2px',
    marginTop: '4px',
    alignSelf: 'center',
  },

  backButton: {
    width: '100px',
    margin: theme.spacing(1),
  },

  titleButton: {
    width: '100px',
    margin: 'auto',
    marginTop: '12px',
  },

  button: {
    margin: theme.spacing(1),
  },

  input: {
    width: '40px',
  },

  title: {
    display: 'flex',
    alignSelf: 'center',
    width: '210px',
  },

  titleGroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '6px',
  },

  radiusGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-around',
    marginLeft: '4px',
    marginRight: '4px',
  },

  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '6px',
    marginBottom: '12px',
  },

  avatarButton: {
    display: 'flex',
    alignSelf: 'center',
    width: '250px',
  },

  radius: {
  },

}));

class Draw extends Component {
  constructor(props) {
    super(props);
    this.saveDrawing = this.saveDrawing.bind(this);
    this.getUsername = this.getUsername.bind(this);
    this.setColor = this.setColor.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this.setPicture = this.setPicture.bind(this);

    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleBrushRadiusInputChange = this.handleBrushRadiusInputChange.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      title: '',
      color: "#ffc600",
      width: "512px",
      height: "512px",
      brushRadius: 10,
      lazyRadius: 12,
      value: 11,
      message: '',
      alert: false,
    };
  }

  handleSliderChange = (event, newValue) => {
    this.setState({value: newValue});
  }

  handleBrushRadiusInputChange = (event) => {
    if (event < 1) {
      this.setState({ brushRadius: 1 });
    } else if (event > 100) {
      this.setState({ brushRadius: 100 });
    } else {
      this.setState({ brushRadius: event });
    }
  }

  handleLazyRadiusInputChange = (event) => {
    if (event < 0) {
      this.setState({ lazyRadius: 0 });
    } else if (event > 50) {
      this.setState({ lazyRadius: 50 });
    } else {
      this.setState({ lazyRadius: event });
    }
  }

  setTitle(e) {
    if (e.length <= 20) {
      this.setState({ title: e })
    }
  }

  handleClose(event, reason) {
    this.setState({alert: false});
  }

  async setPicture() {
    let avatar = this.saveableCanvas.canvasContainer.children[1].toDataURL();
    let res;
    res = await Api.setPicture(avatar);
    if (res.data) {
      this.setState({ message: res.data.message, alert: true });
    } else {
      this.setState({ message: res.response.data.message, alert: true });
    }
  }

  async saveDrawing() {
    let title = this.state.title;
    let description = this.saveableCanvas.canvasContainer.children[1].toDataURL();
    let author = await this.getUsername();

    if (!author) {
      this.setState({ message: 'Not logged in', alert: true });
      return;
    }
    let res;
    res = await Api.createDrawing(title, description, author);
    if (res.data) {
      this.setState({ message: res.data.message, alert: true });
    } else {
      this.setState({ message: res.response.data.message, alert: true });
    }
  }

  async getUsername() {
    let res = await Api.getUsername();
    if (res) {
      return res;
    }
  }

  setColor(color) {
    this.setState({ color: color });
  }

  render() {
    
    const { classes } = this.props;
    return (
      <div className={styles.Draw}>
        <TopBar />
        
        <div className={classes.container}>
          
          <CanvasDraw ref={canvasDraw => (this.saveableCanvas = canvasDraw)} className={classes.drawing} brushColor={this.state.color} canvasWidth={this.state.width} canvasHeight={this.state.height} brushRadius={this.state.brushRadius} lazyRadius={this.state.lazyRadius}/>
          <div className={classes.buttonGroup}>

           <Button size="medium" variant="outlined" className={classes.button}
              onClick={() => {
                this.saveableCanvas.undo();
              }}
            >
              Undo
            </Button>
            
            <div className={classes.colorPick}>
              <SketchPick setColor={this.setColor} />
            </div>
            <div className={classes.colorPick}>
              <SketchPick setColor={this.setColor} />
            </div>
            <div className={classes.colorPick}>
              <SketchPick setColor={this.setColor} />
            </div>
            <div className={classes.colorPick}>
              <SketchPick setColor={this.setColor} />
            </div>
            <div className={classes.colorPick}>
              <SketchPick setColor={this.setColor} />
            </div>
            <div className={classes.colorPick}>
              <SketchPick setColor={this.setColor} />
            </div>
            <div className={classes.colorPick}>
              <SketchPick setColor={this.setColor} />
            </div>
            <div className={classes.colorPick}>
              <SketchPick setColor={this.setColor} />
            </div>

            <Button className={classes.button} size="small" variant="outlined"
              onClick={() => {
                this.saveableCanvas.clear();
              }}
            >
              Clear
            </Button>
          </div>

          

          <div className={classes.buttonGroup}>
            <div className={classes.radiusGroup}>
              <Typography gutterBottom>
                Brush Radius
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <Slider
                    value={this.state.brushRadius}
                    onChange={(e, val) => this.setState({ brushRadius: val })}
                    
                    aria-labelledby="input-slider"
                  />
                </Grid>
                <Grid item>
                  <Input
                    className={classes.input}
                    value={this.state.brushRadius}
                    margin="dense"
                    onChange={(e) => this.handleBrushRadiusInputChange(e.target.value)}
                    inputProps={{
                      step: 1,
                      min: 1,
                      max: 100,
                      type: 'number',
                      'aria-labelledby': 'input-slider',
                    }}
                  />
                </Grid>
              </Grid>
            </div>

            <div className={classes.radiusGroup}>
              <Typography gutterBottom>
                Lazy Radius
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <Slider
                    value={this.state.lazyRadius}
                    onChange={(e, val) => this.setState({ lazyRadius: val })}
                    max={50}
                    aria-labelledby="input-slider"
                  />
                </Grid>
                <Grid item>
                  <Input
                    className={classes.input}
                    value={this.state.lazyRadius}
                    margin="dense"
                    onChange={(e) => this.handleLazyRadiusInputChange(e.target.value)}
                    inputProps={{
                      step: 1,
                      min: 0,
                      max: 50,
                      type: 'number',
                      'aria-labelledby': 'input-slider',
                    }}
                  />
                </Grid>
              </Grid>
            </div>

          </div>

          <div className={classes.titleGroup}>
            <form className={classes.title} autoComplete='off'>
              <TextField className={classes.title}
                id="title"
                label="Title"
                value={this.state.title}
                onChange={e => this.setTitle(e.target.value)}              
              />
            </form>
            <Button className={classes.titleButton} onClick={this.saveDrawing} size="large" variant="outlined">UPLOAD</Button>
          </div>
          <Typography align="center" >or</Typography>
          <div className={classes.center}>
            <Button className={classes.avatarButton} onClick={this.setPicture} size="large" variant="outlined">set profile picture</Button>
          </div>
        </div>
        <Snackbar open={this.state.alert} autoHideDuration={6000} onClose={this.handleClose} message="" action={
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

Draw.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(useStyles)(Draw);
