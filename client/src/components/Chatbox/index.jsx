import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import reducer from '../../Reducers';
import axios from 'axios';

class Chatbox extends Component {

  constructor(props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      messages: [['Hi!', 'Jack']],
      term: '',
      replyNumber: 1
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.getReply = this.getReply.bind(this)
  }

  onInputChange(event){
    this.setState({term: event.target.value});
    //console.log(event.target.value);
  }

  onFormSubmit(event){
    event.preventDefault();
    console.log('called', event);
    //handle searching web data
    this.setState((prevState, props) => {
      return {messages: prevState.messages.concat([[prevState.term, 'props.user']])};
    })
    this.setState({term:''});
    this.getReply();

  }

  getReply() {
    axios({
      method: 'post',
      url: '/getGuideReplies',
      data: {
        replyNumber: this.state.replyNumber
      }
    })
    .then((reply) => {
      console.log(reply);
      this.setState((prevState, props) => {
        return {replyNumber: prevState.replyNumber + 1};
      })
      setTimeout(
        () => {this.setState((prevState, props) => {
          return {messages: prevState.messages.concat([[reply.data[0].question, 'Jack']])}
        })}, 2000
      )
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleToggle(toggled) {
    console.log('handle toggle', toggled);
    this.props.dispatch(reducer.toggleChatbox(toggled));
    this.getReply();
  }


  render() {
    console.log('this.props', this.props);
    if(this.props.toggled){
      return (
        <div className="ui card">
          <div className="ui feed">
            {
              this.state.messages.map((message) => {
                return (
                  <div className="event">
                    <div className="content">
                      <div className="summary">
                        <a className="user">{message[1]}</a>
                        <div className="extra text">{message[0]}</div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <form onSubmit={this.onFormSubmit}>
            <div className="ui action input focus" >
              <input type="text" placeholder="Chat.." onChange = {this.onInputChange}></input>
              <button className="ui button" type="submit">Send</button>
            </div>
          </form>
          <button className="ui secondary button" onClick={() => {this.handleToggle(false)} }> Chat Box! </button>
        </div>
      )
    } else {
      return(
        <button className="ui secondary button" onClick={() => {this.handleToggle(true)} }> Untoggled Box! </button>
      )
    }
  }
}

function mapStateToProps({toggled}) {
  return {toggled};
}

export default connect(mapStateToProps)(Chatbox);
