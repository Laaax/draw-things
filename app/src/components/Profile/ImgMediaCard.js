
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import Api from '../api.js';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  root: {
    '&:hover $image': {
      opacity: '0.3',
    },
    '&:hover $header': {
      opacity: '1',
    },
    '&:hover $actions': {
      opacity: '1',
    },
  },
  image: {
    transition: '.5s ease',
    opacity: '1',
    backgroundColor: 'white',
  },
  header: {
    transition: '.5s ease',
    opacity: '0',
    marginBottom: '-60px',
    textAlign: 'center',
  },
  actions: {
    transition: '.5s ease',
    opacity: '0',
    marginTop: '-40px',
  },
  button: {
    margin: 'auto',
    marginTop: '-20px',
  },

});



export default function ImgMediaCard(props) {
  const classes = useStyles();

  const history = useHistory();
  const ChangeRoute = (id) =>{ 
    let path = `../drawing/${id}`; 
    history.push(path);
  }

  function deleteDrawing(id) {
    let res;
    (async () => {res = await Api.deleteDrawingById(id);
      if (res.data) {
        if (res.data.message === 'Drawing deleted') {
          props.setMessage('Drawing deleted');
        }
      } else {
        props.setMessage('Some error occured')
      }
      props.retrieveDrawings();
      props.resetPage()
    })();
  }

  return (
    <Card className={classes.root}>

      <CardHeader className={classes.header}
        title={<Typography variant="h6" align="center">{props.title}</Typography>}
      />

      <CardActionArea>
        <CardMedia className={classes.image}
          component="img"
          alt="Contemplative Reptile"
          image={props.img}
          title="Contemplative Reptile"
          onClick={() => ChangeRoute(props.id)}
        />
      </CardActionArea>
      
      { props.isUser ? 
      <CardActions className={classes.actions}>
        <IconButton onClick={() => deleteDrawing(props.id)} className={classes.button} size="medium" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </CardActions>
      : null }
    </Card>
  );
}