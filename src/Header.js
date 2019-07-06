import React from 'react';
import { Container, Menu, Image } from 'semantic-ui-react';

import logo from './logo.svg';

export default ({ selectedUser }) => {
  const pageName = selectedUser ? selectedUser.name : '';

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <Image size="mini" src={logo} />
          User Search
        </Menu.Item>
        <Menu.Item style={{ flex: 1 }}>{pageName}</Menu.Item>
      </Container>
    </Menu>
  );
};
