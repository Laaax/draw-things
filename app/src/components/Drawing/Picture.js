
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Api from '../api.js';

import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '24px',
    backgroundColor: '#222325',
    minWidth: '512px',
  },
  image: {
    marginTop: '12px',
    height: '512px',
    width: '512px',
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 'auto',
    backgroundColor: 'white',
  },
  desc: {
    backgroundColor: '#222325',
    padding: '12px',
  },
  innerDesc: {
    backgroundColor: '#222325',
    padding: '12px',
    paddingTop: '12px',
    paddingBottom: '0px',
  },
  divider: {
    background: '#73777e',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '20px',
    '&:hover': {
      color:'#fff',
    },
  }

});

export default function Picture(props) {
  const classes = useStyles();
  const { id } = useParams();
  const [sentRequest, setSentRequest] = useState(false);
  const [drawing, setDrawing] = useState(null);
  const [value, setValue] = useState(null);
  const [rating, setRating] = useState('n/a ');
  if (!sentRequest) {
    let res;
    (async () => {res = await Api.getDrawingById(id);
      if (res) {
        if (res.data) {
          setDrawing(res.data);
          props.foundDrawing(true);
        }
      }
      setSentRequest(true);
    })();
    (async () => await getRatings())();
  }

  async function getRatings() {
    let res = await Api.getRatings(id);
    if (res) {
      if (res.data){
        setValue(res.data.rated);
        if (res.data.rating) {
          setRating(res.data.rating);
        }
      }
    }
  }
  
  async function rate(e) {
    setValue(e);
    let res = await Api.rate(id, e);
    await getRatings();
  }

  if (drawing) {
    return (
      <Box className={classes.root}>
        <img src={drawing.description} alt="drawing" className={classes.image}/>
         
        <Box className={classes.desc}>
        
          <Divider className={classes.divider} variant="fullWidth" />
          <Box className={classes.innerDesc}>
            <Grid item xs container>
              <Grid item xs container direction="column" spacing={1}>
                <Grid item xs>
                  <Typography variant="h4" color="textSecondary" component="p">
                  {drawing.title}
                  </Typography>
                  <Link className={classes.username} to={`../profile/${drawing.author}`}>by: {drawing.author}</Link>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container direction="row" spacing={1} className={classes.rating}>
                  <Grid item>
                    <Typography variant="h6" color="textSecondary" component="p">
                      Rate:
                    </Typography>
                  </Grid>
                  <Grid item>
                    { props.loggedIn ? 
                    <Rating value={value} onChange={(event, val)=> rate(val)} />
                    : <Rating value={value} onChange={(event, val)=> rate(val)} readOnly/> }
                  </Grid>
                </Grid>
                <Grid item container direction="row" spacing={1}>
                  <Grid item>
                    <Typography variant="body1" color="textSecondary" component="p">
                      Average:
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body1" color="textSecondary" component="p">
                      {rating + '/5'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>        
      </Box>
    );
  } else if (!sentRequest) {
    return (<div>
    </div>);
  } else {
    return(
      <Typography variant="body1" color="textSecondary" component="p">
        Could not find drawing
      </Typography>
    );
  }
}