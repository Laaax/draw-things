import {Component} from 'react';

import { withRouter } from "react-router-dom";

import Api from '../api.js';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import TopBar from '../../components/TopBar/TopBar.js';

import styles from './Main.module.scss';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';


const useStyles = ((theme) => ({
  drawing: {
    width: '256px',
    height: '256px',
    backgroundColor: 'white',
    '&:hover': {
      cursor:'pointer',
    },
  },

  bor: {
    minWidth: '800px',
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
  },

  imageList: {
    width: '780px',
  },

  item: {
    '&:hover $itemBar': {
      opacity: '1',
    },
  },

  itemBar: {
    transition: '.5s ease',
    opacity: '0',
  },

  pagination: {
    marginTop: '12px',
  },

  title: {
    margin: '36px',
  },
}));

class Main extends Component {
  constructor(props) {
    super(props);
    this.retrieveDrawings = this.retrieveDrawings.bind(this);
    this.getPages = this.getPages.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
    this.goToDrawing = this.goToDrawing.bind(this);
    this.state = {
      page: 1,
      pages: 1,
      drawings: [],
    };
  }

  componentDidMount() {
    this.getPages();
  }

  async getPages() {
    let res = await Api.getDrawingCount();
    if (res.pages) {
      this.setState({ pages: res.pages});
    }
    this.retrieveDrawings();
  }

  async retrieveDrawings() {
    const res = await Api.getDrawings(this.state.page);
    if (res) {
      if (res.data) {
        this.setState({ drawings: res.data });
      }
    }
    
  }
  
  async newPage(p) {
    this.setState({ page: p })
    await this.getPages();
  }

  goToProfile(user) {
    this.props.history.push(`/profile/${user}`);
  }

  goToDrawing(id) {
    this.props.history.push(`/drawing/${id}`);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={styles.Main}>
        <TopBar />
        <Container className={classes.bor} fixed={true} maxWidth="md">
          
          <Typography align='center' className={classes.title} variant="h2">Drawings</Typography>
          
          <div className={classes.container}>
            <ImageList rowHeight={256} className={classes.imageList} cols={3}>
              {this.state.drawings.map((drawing, index) => (
                <ImageListItem className={classes.item} key={drawing._id} >
                  <img onClick={() => this.goToDrawing(drawing._id)} className={classes.drawing} src={drawing.description} alt={drawing.title} />
                  <ImageListItemBar className={classes.itemBar}
                    title={drawing.title}
                    subtitle={<span>by: {drawing.author}</span>}
                    actionIcon={
                      <IconButton aria-label={'profile'} onClick={() => this.goToProfile(drawing.author)}>
                        <AccountCircleIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
            <Pagination className={classes.pagination} count={this.state.pages} variant="outlined" shape="rounded" onChange={(event, val)=> this.newPage(val)} />
          </div>
        </Container>
      </div>
      
    );
  }

}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(withRouter(Main));
