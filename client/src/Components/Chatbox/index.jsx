import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import reducer from '../../Reducers';


class Chatbox extends Component {

  constructor(props) {
    super(props)
    this.handleToggle = this.handleToggle.bind(this);
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
