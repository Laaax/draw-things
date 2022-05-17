import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    color: 'black',
    borderColor: 'black',
    '&:hover': {
      color: '#49abad',
      borderColor: '#65C5C7',
    },
  },
}));

export default function Redirect() {
  const classes = useStyles();

  const history = useHistory();

  const LogInRoute = () =>{ 
    let path = `login`; 
    history.push(path);
  }

  return (
    <Button className={classes.button} onClick={LogInRoute} size="small" variant="outlined">log In</Button>
  );
}