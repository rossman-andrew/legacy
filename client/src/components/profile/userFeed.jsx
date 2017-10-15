import React from 'react';
import { Feed, Icon, Header } from 'semantic-ui-react';
import socket from '../../socket/socket.js';

class UserFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      oldNotifications: {}
    }; 
  }

  componentDidMount() {
    socket.on('notification', (msg) => {
      this.setState((prevState) => {
        return {notifications: prevState.notifications.concat(msg)};
      });
    });

    socket.emit('getall', (replies) => {
      this.setState({
        oldNotifications: replies
      });
    });
  }

  generateImage(name) { 
    if (['a', 'b', 'c', 'd'].indexOf(name[0].toLowerCase()) >= 0) {
      return 'https://semantic-ui.com/images/avatar2/large/matthew.png';
    } else if (['e', 'f', 'g', 'h', 'i'].indexOf(name[0].toLowerCase()) >= 0) {
      return 'https://semantic-ui.com/images/avatar2/large/kristy.png';
    } else if (['j', 'k', 'l', 'm', 'n'].indexOf(name[0].toLowerCase()) >= 0) {
      return 'https://semantic-ui.com/images/avatar2/large/elyse.png';
    } else if (['o', 'p', 'q', 'r', 's'].indexOf(name[0].toLowerCase()) >= 0) {
      return 'https://semantic-ui.com/images/avatar2/large/molly.png';
    } else {
      return 'https://semantic-ui.com/images/avatar/large/steve.jpg';
    }
  }

  renderFeed(message) {
    if (message.name === this.props.user.name) {
      return <div key={message.date}></div>;
    }

    return (
      <Feed.Event key={message.date}>
        <Feed.Label>
          <img src={this.generateImage(message.name)} />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{message.name}</Feed.User> {message.message}
            <Feed.Date>{message.date}</Feed.Date>
          </Feed.Summary>
          <Feed.Meta>
            <Feed.Like>
              <Icon name='like' />
              {Math.floor(Math.random() * 20)} Likes
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
        {this.state.notifications.slice().reverse().map(notification => {
          return this.renderFeed(notification);
        })}
        {Object.keys(this.state.oldNotifications).reverse().map(key => {
          let message = {};
          message.date = key;
          message.name = JSON.parse(this.state.oldNotifications[key])[0];
          message.message = JSON.parse(this.state.oldNotifications[key])[1];
          return this.renderFeed(message);
        })}
      </Feed>
    );
  }
}

export default UserFeed;
