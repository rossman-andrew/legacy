import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import reducer from '../../Reducers';
import axios from 'axios';

class Chatbox extends Component {

  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      messages: [['Hi! Please answer some questions to help me better find the perfect trip for you.', 'Jack', 0]],
      answers: [],
      term: '',
      replyNumber: 1,
      answerNumber: 0,
      ChatboxInitialized: false,
      LastMessageUser: 'Jack',
      FetchInProgress: false
    };
    console.log('curr User', this.props.user.name);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.getReply = this.getReply.bind(this);
  }

  onInputChange(event) {
    this.setState({term: event.target.value});
    //console.log(event.target.value);
  }

  onFormSubmit(event) {
    event.preventDefault();
    //handle searching web data
    var counter;
    if (this.state.LastMessageUser !== this.props.user.name) {
      counter = 0;
    } else {
      counter = 1;
    }
    this.setState((prevState, props) => {
      return {
        messages: prevState.messages.concat([[prevState.term, props.user.name, counter]]),
        LastMessageUser: props.user.name
      };
    });
    this.setState({term:''});
    if (!this.state.FetchInProgress) {
      this.getReply();
    }

  }

  getReply() {
    this.setState((prevState, props) => {
      return {
        FetchInProgress: true
      };
    });
    setTimeout(
      () => {
        this.setState((prevState, props) => {
          return {
            LastMessageUser: 'Jack',
            messages: prevState.messages.concat([prevState.answers[prevState.answerNumber]]),
            answerNumber: prevState.answerNumber + 1,
            FetchInProgress: false
          };
        });
        this.getQuestion();
      }, 2000
    );
  }

  getQuestion() {
    this.setState((prevState, props) => { //makes it so only on first Chatbox Toggle do you get new question
      return {
        ChatboxInitialized: true
      };
    });
    axios({
      method: 'post',
      url: '/getGuideReplies',
      data: {
        replyNumber: this.state.replyNumber
      }
    })
      .then((reply) => {

        var counter;
        if (this.state.LastMessageUser === this.props.user) {
          counter = 0;
          this.setState((prevState, props) => {
            return {LastMessageUser: 'Jack'};
          });
        } else {
          counter = 1;
        }
        setTimeout(
          () => {
            this.setState(
              (prevState, props) => {
                return {
                  messages: prevState.messages.concat([[reply.data[0].question, 'Jack', counter]]),
                  answers: prevState.answers.concat([[reply.data[0].reply, 'Jack', 0]])
                };
              }
            );
          }, 3000
        );
        this.setState((prevState, props) => {
          return {replyNumber: prevState.replyNumber + 1};
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleToggle(toggled) {

    this.props.dispatch(reducer.toggleChatbox(toggled));
    if (!this.state.ChatboxInitialized) {
      this.getQuestion();
    }
  }


  render() {

    if (this.props.toggled) {
      return (
        <div className="ui bottom fixed card">
          <div className="ui feed">
            {
              this.state.messages.map((message) => {
                return (
                  <div className="event">
                    <div className="content">
                      <div className="summary">
                        {
                          (() => {
                            if (message[2] < 1) {
                              return (
                                <a className="user">{message[1]}</a>
                              );
                            }
                          })()
                        }
                        <div className="extra text">{message[0]}</div>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
          <form onSubmit={this.onFormSubmit}>
            <div className="ui action input focus" >
              <input type="text" placeholder="Chat.." value={this.state.term} onChange = {this.onInputChange}></input>
              <button className="ui button" type="submit">Send</button>
            </div>
          </form>
          <button className="ui secondary button" onClick={() => { this.handleToggle(false); } }> Chat Box! </button>
        </div>
      );
    } else {
      return(
        <button className="ui bottom fixed secondary button" onClick={ () => {this.handleToggle(true); } }> Untoggled Box! </button>
      );
    }
  }
}

function mapStateToProps({toggled, user}) {
  return {toggled, user};
}

export default connect(mapStateToProps)(Chatbox);
