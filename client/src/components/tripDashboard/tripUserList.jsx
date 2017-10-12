import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';

import UserInfo from './userInfo.jsx';

const renderCard = (user, selectedUser) => {
  return (
    <Card>
      <Card.Content>
        <Image floated='right' size='mini' src='https://d1qb2nb5cznatu.cloudfront.net/users/5771195-large?1487914668' />
        <Card.Header>
          {user.name}
        </Card.Header>
        <Card.Meta>
          {user.email}
        </Card.Meta>
        <Card.Description>
          {user.name} is a HackReactor student.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {selectedUser.UserId === user.id ? <UserInfo user={selectedUser} /> : null}
      </Card.Content>
    </Card>
  );
};

const TripUserList = (props) => {
  return (
    <div>
      <h4>People coming:</h4><br />
      <Card.Group>
        {props.users.map((user, index) => {
          return (
            <div className="user-entry" key={index} onClick={() => { props.showUserInfo(user.id); }}>
              {renderCard(user, props.selectedUser)}
            </div>
          );
        })}
      </Card.Group>
    </div>
  );
};

export default TripUserList;
