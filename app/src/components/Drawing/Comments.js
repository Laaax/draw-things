
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useHistory } from "react-router-dom";

import Api from '../api.js';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '0px',
    backgroundColor: '#222325',
    minWidth: '512px',
  },
  comments: {
    backgroundColor: '#222325',
    paddingTop: '6px',
    padding: '12px',
  },
  innerComments: {
    backgroundColor: '#222325',
    padding: '12px',
  },
  innerComments2: {
    backgroundColor: '#141516',
    padding: '12px',
    marginTop: '8px',
    marginBottom: '8px',
    borderRadius: '10px',
  },
  commentForm: {
    color: 'ffffff',
  },
  commentButton: {
    color: 'ffffff',
    marginTop: '12px',
  },
  comment: {
    display: 'flex',
    direction: 'row',
    alignItems: 'center',
  },
  commentUser: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '60px',
  },
  user: {
    wordWrap: 'break-word',
    width: '100%',
  },
  divider: {
    background: '#73777e',
  },
  vertDivider: {
    marginLeft: '12px',
    marginRight: '12px',
    background: '#73777e',
  },
  pagination: {
    margin: 'auto',
  },
  avatar: {
    backgroundColor: 'white',
    '&:hover': {
      cursor: 'pointer',
    },
  }

}));

async function getUsername() {
  const res = await Api.getUsername();
  return res;
}

export default function Comments(props) {  
  
  const classes = useStyles();
  const { id } = useParams();
  const [sentRequest, setSentRequest] = useState(false);
  const [input, setInput] = useState('');
  const [comments, setComments] = useState(null);
  const [currPage, setCurrPage] = useState(1);
  const [pages, setPages] = useState(1);

  const history = useHistory();
  const ChangeRoute = (user) => { 
    let path = `../profile/${user}`; 
    history.push(path);
  }

  async function getComments(id, page) {
    let res = await Api.getComments(id, page);
    if (res) {
      return res;
    }
  }

  async function getPages(id) {
    let res = await Api.getCommentCount(id);
    if (res) {
      if (res.pages) {
        return res.pages;
      }
    }
    
    return 1;
  }

  if ((sentRequest === false)) {
    (async () => {setComments(await getComments(id, 1))
    })();
    (async () => setPages(await getPages(id)))();
    setSentRequest(true);
  }

  async function newPage(p) {
    setComments(await getComments(id, p));
    setPages(await getPages(id));
    setCurrPage(p);
  }

  async function postComment(id, input) {
    let drawing = id;
    let description = input;
    let author = await getUsername();
    if (!author) {
      return;
    }
    
    setInput('');
    await Api.createComment(drawing, description, author);
    setComments(await getComments(id, currPage))
    setPages(await getPages(id));
  }

  if (comments && props.drawing) {
  return (
    <Box className={classes.root}>
      <Box className={classes.comments}>
        <Divider className={classes.divider} variant="fullWidth" />
        <Box className={classes.innerComments}>
          
          <Typography variant="h5" color="textSecondary" component="p">
            Comments:
          </Typography>
          <form className={classes.commentForm} noValidate autoComplete="off">
            <TextField value={input} onInput={e => setInput(e.target.value)} inputProps={{ maxLength: 200 }} fullWidth id="standard-full-width" label="Comment" />
            { props.loggedIn ? 
            <Button onClick={() => postComment(id, input)} fullWidth className={classes.commentButton} variant="outlined" color="primary">
              Post Comment
            </Button>
            : <Button onClick={() => postComment(id, input)} fullWidth className={classes.commentButton} variant="outlined" color="primary" disabled>
              Post Comment
            </Button> }
            {/*  */}
          </form>
        </Box>
        
        {comments.map((comment, index) => (
          <div>
            <Box key={comment._id} className={classes.innerComments2}>
              <div className={classes.comment}>
                <div className={classes.commentUser}>
                  <Avatar className={classes.avatar} onClick={() => ChangeRoute(comment.author)} alt='avatar' src={comment.picture} />
                  <Typography align="center" className={classes.user} variant="body1" color="textSecondary" component="p">
                    {comment.author}
                  </Typography>
                </div>
                  <Divider className={classes.vertDivider} orientation="vertical" flexItem />
                  <Typography variant="body1" color="textSecondary" component="p">
                    {comment.description}
                  </Typography>                
              </div>
            </Box>
          </div>
        ))}
      </Box>
      <Pagination className={classes.pagination} count={pages} variant="outlined" shape="rounded" onChange={(event, val)=> newPage(val)} />
    </Box>
  );
  } else if (props.drawing) {
    return (
    <Box className={classes.root}>
      <Box className={classes.comments}>
        <Divider className={classes.divider} variant="fullWidth" />
        <Box className={classes.innerComments}>
          
          <Typography variant="h5" color="textSecondary" component="p">
            Comments:
          </Typography>
          <form className={classes.commentForm} noValidate autoComplete="off">
            <TextField value={input} onInput={e => setInput(e.target.value)} inputProps={{ maxLength: 200 }} fullWidth id="standard-full-width" label="Comment" />
            { props.loggedIn ? 
            <Button onClick={() => postComment(id, input)} fullWidth className={classes.commentButton} variant="outlined" color="primary">
              Post Comment
            </Button>
            : <Button onClick={() => postComment(id, input)} fullWidth className={classes.commentButton} variant="outlined" color="primary" disabled>
              Post Comment
            </Button> }
          </form>
        </Box>
        
      </Box>
      <Pagination className={classes.pagination} count={pages} variant="outlined" shape="rounded" onChange={(event, val)=> newPage(val)} />
    </Box>
    );
  } else {
    return(
      <div></div>
    );
  }
}