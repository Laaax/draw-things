import React from 'react';
import {Component} from 'react';
import styles from './Drawing.module.scss';

import Comments from './Comments.js';
import TopBar from '../../components/TopBar/TopBar.js';
import Picture from './Picture.js';

import Api from '../api.js'

import Container from '@material-ui/core/Container';

class Drawing extends Component {
  constructor(props) {
    super(props);
    this.foundDrawing = this.foundDrawing.bind(this);
    this.state = {
      loggedIn: false,
      drawing: false,
    };
  }
  
  componentDidMount() {
    let user;
    (async () => {user = await Api.getUsername();
      if (user) {
        this.setState({ loggedIn: true });
      };
    })();
  }

  foundDrawing = (e) => {
    // e is true or false
    this.setState({ drawing: e });
  };

  render() {
    return (
      <div className={styles.Drawing}>
        
        <Container maxWidth="md">
          <TopBar />
        
          <Picture loggedIn={this.state.loggedIn} foundDrawing={this.foundDrawing} />
          <Comments loggedIn={this.state.loggedIn} drawing={this.state.drawing} />
        </Container>
      </div>
    );
  }
}

export default Drawing;
