import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import reducer from '../../Reducers';


class Chatbox extends Component {

  constructor(props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      messages: [['Where do you want to go?', 'Jack'], ['Venice', 'Barko']],
      term: ''
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onInputChange(event){
    this.setState({term: event.target.value});
    //console.log(event.target.value);
  }

  onFormSubmit(event){
    event.preventDefault();

    //handle searching web data
    this.props.fetchFactories(this.state.term);
    this.setState({term:''});
    browserHistory.push({
      pathname: `/factories/`,
    });
  }

  handleSend() {

  }

  handleToggle(toggled) {
    console.log('handle toggle', toggled);
    this.props.dispatch(reducer.toggleChatbox(toggled));
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
          <div className="ui action input focus">
            <input type="text" placeholder="Chat.."></input>
            <button class="ui button">Send</button>
          </div>
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
