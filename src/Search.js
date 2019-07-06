import React from 'react';
import { Container, Search } from 'semantic-ui-react';
import Fuse from 'fuse.js';

export default ({ users, selectUser }) => {
  const [term, setTerm] = React.useState('');
  const filteredUsers = React.useMemo(() => {
    if (!term || !users) return users || [];
    const fuse = new Fuse(users, {
      shouldSort: true,
      keys: ['name', 'username'],
    });

    return fuse.search(term);
  }, [users, term]);

  return (
    <Container>
      <Search
        loading={!users}
        onResultSelect={(e, { result }) => {
          setTerm('');
          selectUser(result.user);
        }}
        onSearchChange={e => setTerm(e.currentTarget.value)}
        results={filteredUsers.slice(0, 5).map(user => ({
          childKey: user.id,
          title: user.name,
          description: user.username,
          image: user.avatar,
          user,
        }))}
        value={term}
      />
    </Container>
  );
};
