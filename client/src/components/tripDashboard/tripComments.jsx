import React from 'react';
import ReactDOM from 'react-dom';
import { Comment, Header, Form, Button, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import $ from 'jquery';

const socket = io();

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

    socket.on('chat message', (msg) => {
      this.setState({
        comments: this.state.comments.concat(msg)
      });
    });
  }
  
  componentDidMount() {
    this.getComments();
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
    console.log('this is message', this.state.message);
    socket.emit('chat message', {
      name: this.props.user.name, 
      message: this.state.message, 
      date: new Date().toLocaleString(), 
      TripId: this.props.trip.id
    });
  }
  
  renderComment(message) {
    console.log(message);
    if (message.TripId !== this.props.trip.id) {
      return (
        <div></div>
      );
    }
    return (
      <Comment key={message.id}>
        <Comment.Avatar src='https://semantic-ui.com/images/avatar/small/elliot.jpg' />
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
