import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Api from '../api.js';

import ImgMediaCard from './ImgMediaCard.js';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
  },

  pagination: {
    marginTop: '12px',
  },
  
  card: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

export default function Pictures(props) {
  const classes = useStyles();
  const { username } = useParams();
  const [currPage, setCurrPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [drawings, setDrawings] = useState(null);
  const [isUser, setIsUser] = useState(false);
  // sent request for drawings
  const [sentReq, setSentReq] = useState(false);

  let user;
  (async () => {user = await Api.getUsername();
    if (user === username) {
      setIsUser(true);
    };
  })();
  
  async function getDrawings(page) {
    let res = await Api.getDrawingsByUser(username, page);
    if (res) {
      return res;
    }
  }

  async function getPages(username) {
    let res = await Api.getUserDrawingCount(username);
    if (res.pages) {
      return res.pages;
    }
    return 1;
  }

  async function retrieveDrawings() {
    setDrawings(await getDrawings(1));
    setPages(await getPages(username));
  }

  if (drawings == null) {
    (async () => {setDrawings(await getDrawings(1));
      setSentReq(true);
    })();
    (async () => setPages(await getPages(username)))();
  }

  async function newPage(p) {
    setDrawings(await getDrawings(p));
    setPages(await getPages(username));
    setCurrPage(p);
  }

  function resetPage() {
    setCurrPage(1);
  }
  
  if (drawings && props.foundUser) {
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
          
        {drawings.map((drawing, index) => (
          
          <Grid key={drawing._id} item xs={12} sm={4}>
            <ImgMediaCard id={drawing._id} title={drawing.title} img={drawing.description} isUser={isUser} retrieveDrawings={retrieveDrawings} resetPage={resetPage} setMessage={props.setMessage} className={classes.card} />
          </Grid>
          
        ))}
        
      </Grid>
      <Pagination className={classes.pagination} page={currPage} count={pages} variant="outlined" shape="rounded" onChange={(event, val)=> newPage(val)} />
    </div>
  );
  } else if (!props.sentReq || !sentReq) {
    return (
      <div>

      </div>
    );
  } else if (!drawings) {
    return (
      <div>
        <Typography variant="body1" color="textSecondary" component="p">
          Could not find drawings
        </Typography>
      </div>
    );
  } else {
    return (
      <div>
        <Typography variant="body1" color="textSecondary" component="p">
          Could not find user
        </Typography>
      </div>
    );
  }
}