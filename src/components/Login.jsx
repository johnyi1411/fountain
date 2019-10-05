import React from 'react';

const Login = (props) => (
  <form>
    <label htmlFor="username">
      Username:
      <input type="text" />
    </label>
    <label htmlFor="password">
      Password:
      <input type="password" />
    </label>
  </form>
);

export default Login;
