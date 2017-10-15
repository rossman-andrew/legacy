import React from 'react';
import ReactDOM from 'react-dom';
import { Comment, Header, Form, Button, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import socket from '../../socket/socket.js';
import $ from 'jquery';

const mapStateToProps = ({ user, trip }) => {
  return { user, trip };
};

class TripComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      message: '',
    };
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

  }
  
  componentDidMount() {
    this.getComments();
    socket.on('chat message', (msg) => {
      this.setState((prevState) => {
        return {comments: prevState.comments.concat(msg)};
      });
    });
    socket.emit('join room', {
      TripId: this.props.trip.id
    });
  }

  getComments() {
    $.ajax({
      url: `${HOSTNAME}/comments/${this.props.trip.id}`,
      method: 'GET',
      success: (body) => {
        this.setState({
          comments: this.state.comments.concat(body)
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onInputChange(event) {
    this.setState({ message: event.target.value });
  }
  
  onSubmitClick() {
    event.preventDefault();
    socket.emit('chat message', {
      name: this.props.user.name, 
      message: this.state.message, 
      date: new Date().toLocaleString(), 
      TripId: this.props.trip.id
    });
    socket.emit('notification', {
      name: this.props.user.name,
      message: `posted "${this.state.message}" in ${this.props.trip.name}.`,
      date: new Date().toLocaleString(),
      TripId: this.props.trip.id
    });
    this.setState({ message: '' });
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
  
  renderComment(message) {
    return (
      <Comment key={message.date}>
        <Comment.Avatar src={this.generateImage(message.name)} />
        <Comment.Content>
          <Comment.Author as='a'>{message.name}</Comment.Author>
          <Comment.Metadata>
            <div>{message.date}</div>
          </Comment.Metadata>
          <Comment.Text>{message.message}</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    );
  }

  render() {
    return (
      <Comment.Group>
        <Header as='h3' dividing>Comments</Header>
        {this.state.comments.map(comment => this.renderComment(comment))}
        <Form onSubmit={this.onSubmitClick} reply>
          <Input value={this.state.message} onChange={this.onInputChange} />
          <Button content='Add Reply' labelPosition='left' icon='edit' type="submit" primary />
        </Form>
      </Comment.Group>
    );
  }
}

export default connect(mapStateToProps)(TripComments);
