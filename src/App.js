import * as React from 'react';
import { Container } from 'semantic-ui-react';

import { fetchUsers } from './api';

import Header from './Header';
import Search from './Search';
import SelectedUser from './SelectedUser';

const App = () => {
  const [users, setUsers] = React.useState(null);
  const [selectedUser, selectUser] = React.useState(null);

  React.useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return (
    <div>
      <Header selectedUser={selectedUser} />
      <Container style={{ paddingTop: '7em' }}>
        <Search users={users} selectUser={selectUser} />
        <SelectedUser selected={selectedUser} selectUser={selectUser} />
      </Container>
    </div>
  );
};

export default App;
