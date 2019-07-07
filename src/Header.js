import React from 'react';
import { Container, Menu, Image, Dropdown, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import logo from './logo.svg';
import { AuthContext } from './Auth';

export default ({ selectedUser }) => {
  const pageName = selectedUser ? selectedUser.name : '';
  const auth = React.useContext(AuthContext);

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <Image size="mini" src={logo} />
          User Search
        </Menu.Item>
        <Menu.Item style={{ flex: 1 }}>{pageName}</Menu.Item>
      </Container>

      {auth.loading || !auth.user ? (
        <Menu.Item>
          {auth.loading ? (
            <Loader active inline />
          ) : (
            <Link to="/login">Sign In</Link>
          )}
        </Menu.Item>
      ) : (
        <Dropdown
          item
          simple
          text={
            auth.user.groups.includes('Admins')
              ? `${auth.user.name} (Admin)`
              : auth.user.name
          }
        >
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/logout">
              Sign out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </Menu>
  );
};
