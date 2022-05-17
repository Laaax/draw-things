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

export default function RedirectLog() {
  const classes = useStyles();

  const history = useHistory();

  const SignUpRoute = () =>{ 
    let path = `signup`; 
    history.push(path);
  }

  return (
    <Button className={classes.button} onClick={SignUpRoute} size="small" variant="outlined">sign up</Button>
  );
}