import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

const mapStateToProps = ({ user }) => {
  return { user };
}

class TripComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }

  render() {
    return (
      <div>
      Trip Comments is awesome!
      </div>
    );
  }
}

export default connect(mapStateToProps)(TripComments);
