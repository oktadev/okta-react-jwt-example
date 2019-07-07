import * as React from 'react';
import { Container } from 'semantic-ui-react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';

import { fetchUsers } from './api';

import Header from './Header';
import Search from './Search';
import SelectedUser from './SelectedUser';
import { AuthHandler, AuthProvider, AuthContext } from './Auth';

const App = () => {
  const [users, setUsers] = React.useState(null);
  const [selectedUser, selectUser] = React.useState(null);
  const auth = React.useContext(AuthContext);

  React.useEffect(() => {
    fetchUsers(auth.user).then(nextUsers => {
      setUsers(nextUsers);
      selectUser(
        selected => selected && nextUsers.find(({ id }) => id === selected.id),
      );
    });
  }, [auth.user]);

  return (
    <div>
      <Header selectedUser={selectedUser} />
      <Container style={{ paddingTop: '7em' }}>
        <Search users={users} selectUser={selectUser} />
        <SelectedUser selected={selectedUser} selectUser={selectUser} />
      </Container>
      <AuthHandler />
    </div>
  );
};

export default () => (
  <AuthProvider>
    <Router>
      <Security
        issuer={`${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`}
        client_id={process.env.REACT_APP_OKTA_CLIENT_ID}
        redirect_uri={`${window.location.origin}/implicit/callback`}
      >
        <Switch>
          <Route path="/implicit/callback" component={ImplicitCallback} />
          <Route path="/" component={App} />
        </Switch>
      </Security>
    </Router>
  </AuthProvider>
);
