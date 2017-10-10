import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class Chatbox extends Component {

  constructor(props) {
    super(props)

  }

  handleSend() {

  }


  render() {
    <button> Chat </button>
  }
}

function mapStateToProps() {
  return {test: 'test'};
}

export default connect(mapStateToProps)(Chatbox);
