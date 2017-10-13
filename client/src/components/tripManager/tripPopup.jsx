import React from 'react';
import Popup from 'react-popup';
import $ from 'jquery';
import { connect } from 'react-redux';
import reducer from '../../Reducers';
import TripDashboard from '../tripDashboard/tripDashboard.jsx';

import { Card, Grid, Button, Input } from 'semantic-ui-react';
import LodgeList from './LodgeList.jsx';
import LodgePicList from './LodgePicList.jsx';
import socket from '../../socket/socket.js';

const SERVER_URL = HOSTNAME;

class TripPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lodging: [],
      currentLodge: [],
      hotel: null,
      location: '',
      lodge: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.createTripDashboard = this.createTripDashboard.bind(this);
    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
    this.showLodges = this.showLodges.bind(this);
    this.showPics = this.showPics.bind(this);
    this.pics = this.pics.bind(this);
    this.handleLodgeChoice = this.handleLodgeChoice.bind(this);
  }

  createTripDashboard(trip) {
    this.props.dispatch(reducer.changeTrip(trip));
    this.props.dispatch(reducer.changeView('TripDashboard'));
  }

  handleSubmit(e) {
    let option = {
      name: e.target.name.value,
      location: e.target.location.value,
      lodging: e.target.lodging.value,
      startDate: e.target.start.value,
      endDate: e.target.end.value,
      userId: this.props.user.id,
      accessCode: e.target.name.value,
      isopen: true,
    };

    e.preventDefault();
    $.ajax({
      url: HOSTNAME + '/popup',
      method: 'POST',
      data: option,
      success: (body) => {
        socket.emit('notification', {
          name: this.props.user.name,
          message: `has created the trip ${option.name}.`,
          date: new Date().toLocaleString()
        });
        this.props.fetchLists();
        this.createTripDashboard(body);
        console.log('POST was a success ');
      },
      error: (err) => {
        console.log('error with GET', err);
      }
    });
  }

  handleChange(e) {
    this.setState({location: e.target.value});
  }

  handleLodgeChoice(lodge) {
    this.setState({
      lodge: lodge.id
    });
  }
 
  handleLocationSubmit(e) {
    e.preventDefault();
    const query = this.state.location;
    console.log('query', query);
    $.ajax({
      url: `${HOSTNAME}/location/lodging/:${query}`,
      method: 'GET',
      success: (body) => {
        console.log('Location GET Request was a success! ');
        console.log(body);
        var data = JSON.parse(body).businesses.splice(0, 4);
        this.setState({lodging: data});
      },
      error: (err) => {
        console.log('error with GET', err);
      }
    });
  }

  showPics(clicked, hotel) {
    if (clicked) {
      //the props below should be one hotel and we will need its id
      console.log('hotels', hotel);
      this.setState({hotel: hotel});
    } else {
      this.setState({hotel: null});
    }
  }

  pics() {
    // console.log('hotel', this.state.hotel);
    if (this.state.hotel !== null) {
      // console.log('piclist should be showing')
      return <LodgePicList data={ this.state.hotel }/>;
    } else {
      console.log('its going into null');
      return null;
    }
  }

  showLodges() {
    if (this.state.lodging.length) {
      return <LodgeList data={ this.state.lodging } showPics={ this.showPics } handleLodgeChoice={ this.handleLodgeChoice } lodgePics={ this.props.lodgePics }/>;
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="popup">
        <h3>Create a new trip:</h3>
        <br/>
        <form className="popupform" onSubmit={ this.handleSubmit }>
          <div className="form-entry">
            <label>Trip Name: </label>
            <Input className="popupfield" type="text" name="name" placeholder="add name..."/>
          </div>
          <br/>
          <div className="form-entry">
            <label>Trip Location: </label>
            <Input className="popupfield location" onChange={e => this.handleChange(e)} type="text" name="location" placeholder="add Location..."/>
          </div>
          <br/>
          <div className="form-entry">
            <label>Start Date: </label>
            <Input className="popupfield" type="date" name="start" placeholder="start date..."/>
          </div>
          <br/>
          <div className="form-entry">
            <label>End Date: </label>
            <Input className="popupfield" type="date" name="end" placeholder="end date..."/>
          </div>
          <br/>
          <div className="form-entry">
            <label>Trip Lodging: </label>
            <Input className="popupfield lodge" type="text" name="lodging" value={this.state.lodge} placeholder="add Lodging..."/>
            <Button onClick={ this.handleLocationSubmit }>See Lodging</Button>
          </div>
          <br/>

          <Button className="popupbutton" type="submit" value="create trip">Submit</Button>
        </form>
        <br/>
        {this.showLodges()}
        {this.pics()}
      </div>
    );
  }
}

let mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(TripPopup);
