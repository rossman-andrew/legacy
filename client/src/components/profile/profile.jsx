import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

import UserFeed from './userFeed.jsx';
import ProfileCard from './profileCard.jsx';
import Comments from './comments.jsx';

const mapStateToProps = ({ user }) => {
  return { user };
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="main-content">
        <Grid centered>
          <Grid.Row columns={2} stretched>
            <Grid.Column width={5}>
              <ProfileCard user={this.props.user} />
            </Grid.Column>
            <Grid.Column width={8}>
              <UserFeed user={this.props.user} />
              <Comments />
            </Grid.Column> 
          </Grid.Row>   
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Profile);
