import './App.css';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Draw from './components/Draw/Draw';
import Drawing from './components/Drawing/Drawing';
import Profile from './components/Profile/Profile';
import Main from './components/Main/Main';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/SignUp/SignUp';
import ResetPassword from './components/ResetPassword/ResetPassword';
import UpdatePassword from './components/UpdatePassword/UpdatePassword';
import ProtectedRoute from './components/ProtectedRoute.js';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import CssBaseline from "@material-ui/core/CssBaseline";

import "bootstrap/dist/css/bootstrap.min.css";

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#f2ece9',
    },
    secondary: {
      main: '#65C5C7',
    },
  },
  
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <BrowserRouter>
        
        <Switch>
          
          <Route exact path="/">
            <Redirect to="/main" />
          </Route>
          <Route path="/api">
            <Redirect to="/main" />
          </Route>
          <ProtectedRoute path="/draw" component={Draw}/>
          <Route path="/drawing/:id" component={Drawing}>
          </Route>
          <Route path="/profile/:username" component={Profile}>
          </Route>
          <Route path="/main" component={Main}>
          </Route>
          <Route exact path="/login" component={LogIn}>
          </Route>
          <Route path="/signup" component={SignUp}>
          </Route>
          <Route exact path="/login/reset-password" component={ResetPassword}>
          </Route>
          <Route path="/reset/:token" component={UpdatePassword}>
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
