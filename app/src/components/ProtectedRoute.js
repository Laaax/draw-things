import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useState } from 'react';

import Api from './api.js';

/// https://dev.to/olumidesamuel_/implementing-protected-route-and-authentication-in-react-js-3cl4

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const [isUser, setIsUser] = useState(false);
  const [sentReq, setSentReq] = useState(false);
  (async () => {let user = await Api.getUsername();
    if (user) {
      setIsUser(true);
    }
    setSentReq(true);
  })();

  if (!sentReq) {
    return (
      <div></div>
    );
  } else {
    return (
      <Route
        {...restOfProps}
        render={(props) =>
          isUser ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    );
  }
}

export default ProtectedRoute;