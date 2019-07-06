import React from 'react';
import { Message, Card, Image } from 'semantic-ui-react';

export default ({ selected, selectUser }) => {
  if (!selected) return null;

  return (
    <Card style={{ marginTop: '2em' }}>
      <Message
        attached
        header={selected.name}
        onDismiss={() => selectUser(null)}
      />
      <Image src={selected.avatar} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{selected.username}</Card.Header>
      </Card.Content>
    </Card>
  );
};
