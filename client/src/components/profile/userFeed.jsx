import React from 'react';
import { Feed, Icon, Header } from 'semantic-ui-react';
import socket from '../../socket/socket.js';

class UserFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    };
  }

  componentDidMount() {
    socket.on('notification', (msg) => {
      console.log(msg);
      this.setState({
        notifications: this.state.notifications.concat(msg)
      });
    });
  }

  renderFeed(message) {
    return (
      <Feed.Event>
        <Feed.Label>
          <img src='https://d1qb2nb5cznatu.cloudfront.net/users/5771195-large?1487914668' />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{message.name}</Feed.User> {message.message}
            <Feed.Date>{message.date}</Feed.Date>
          </Feed.Summary>
          <Feed.Meta>
            <Feed.Like>
              <Icon name='like' />
              4 Likes
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    );
  }

  render() {
    return (
      <Feed>
        <Header as='h3' dividing>News Feed</Header>
        {this.state.notifications.map(notification => {
          this.renderFeed(notification);
        })}
      </Feed>
    );
  }
}

export default UserFeed;
