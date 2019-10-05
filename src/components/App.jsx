import React from 'react';
import Login from './Login';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      jobs: [],
      user: null,
    };
  }

  render() {
    const { user } = this.state;
    const login = user ? <button type="submit">Logout</button> : <Login />;
    return (
      <div>
        {login}
      </div>
    );
  }
}

export default App;
