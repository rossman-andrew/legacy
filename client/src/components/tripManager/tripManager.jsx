import React from 'react';
import Popup from 'react-popup';
import TripPopup from './tripPopup.jsx';
import TripEntry from './tripEntry.jsx';
import reducer from '../../Reducers';
import socket from '../../socket/socket.js';

import { connect } from 'react-redux';
import $ from 'jquery';

import { Card, Grid, Button, Input } from 'semantic-ui-react';

const SERVER_URL = HOSTNAME;

let mapStateToProps = ({ user }) => {
  return { user };
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      trips: [],
      joinTrip: ''
    };

    this.togglePopup = this.togglePopup.bind(this);
    this.joinTrip = this.joinTrip.bind(this);
    this.selectTrip = this.selectTrip.bind(this);
  }

  componentDidMount() {
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  selectTrip(trip) {
    this.props.dispatch(reducer.changeTrip(trip));
    this.props.dispatch(reducer.changeView('TripDashboard'));
  }

  handleChange(e) {
    this.setState({joinTrip: e.target.value});
  }

  joinTrip(code) {
    let obj = {
      accessCode: code || this.state.joinTrip,
      userId: this.props.user.id
    };
    $.ajax({
      url: SERVER_URL + '/jointrip',
      method: 'POST',
      data: obj,
      success: (body) => {
        this.props.fetchLists();
        socket.emit('notification', {
          name: this.props.user.name,
          message: `has joined the trip ${code || this.state.joinTrip}.`,
          date: new Date().toLocaleString()
        });
      },
      error: function(err) {
        console.error(err);
      }
    });
  }

  render() {
    return (
      <div>
        <div className="header-div">
          <img className="header-image" src="http://blog.routeperfect.com/wp-content/uploads/2016/06/shutterstock_419504191.jpg" alt="" />
          <h2 className="header-word">Dare to explore.  <br /> Find new friends.</h2>
        </div>
        <div className="main-content">
          <br />
          

          {this.state.showPopup ?
            <TripPopup
              closePopup={this.togglePopup}
              fetchLists={this.props.fetchLists}
              selectTrip={this.selectTrip}
              lodgePics={ this.props.lodgePics }
            />
            : null
          }

          <h3>Join Trip</h3>
          <div>
            <Input value={this.state.joinTrip} onChange={e => this.handleChange(e)} type="text" name="code" placeholder="add code here"/>
            <Button onClick={() => this.joinTrip()}>Submit</Button> &nbsp; <Button onClick={this.togglePopup} className='newTripButton'>+</Button>
          </div>

          <h3>Trip Suggestions</h3>
          <Grid centered>
            {(this.props.otherTrips.map((ele) => {
              return <TripEntry joinTrip={this.joinTrip} trip={ele} key={ele.id} onClick={() => this.selectTrip(ele)}/>;
            }))}
          </Grid>

          <h3>Trip History</h3>
          <Grid centered>
            {(this.props.trips.map((ele) => {
              return <TripEntry trip={ele} key={ele.id} onClick={() => this.selectTrip(ele)}/>;
            }))}
          </Grid> 
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Dashboard);
