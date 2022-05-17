
import { withStyles, createStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Api from '../api.js';

// this has withstyles instead of makestyle


const avatarStyles = ((theme) => createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#424853',
    marginBottom: '20px',
    
  },

  image: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: 'white',
  },
}));

function AvatarBar(props) {
  const { username } = useParams();

  const [avatar, setAvatar] = useState(null);

  // if sent request
  const [res, setRes] = useState(false);

  if (res === false) {
    (async () => setAvatar(await Api.getAvatar(username)))();
    (async () => {let user = await Api.checkUser(username);
      if (user.data) {
        if (user.data.message === 'User exists') {
          props.foundUser(true);
        } else {
          props.foundUser(false);
        }
      } else {
        props.foundUser(false);
      }
    })();
    setRes(true);
  }
 
  if (avatar) {
    return (
      <Box boxShadow={3} p={1} className={props.classes.root}>  
        <Avatar alt="Remy Sharp" src={avatar} className={props.classes.image} />
        <Typography variant="h4">
              {username}
        </Typography>
      </Box>
    );
  } else {
    return (
      <div></div>
    );
  }
}

export default withStyles(avatarStyles)(AvatarBar);