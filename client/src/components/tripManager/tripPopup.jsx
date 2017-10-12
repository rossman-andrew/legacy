import React from 'react';
import Popup from 'react-popup';
import $ from 'jquery';
import { connect } from 'react-redux';
import reducer from '../../Reducers';
import TripDashboard from '../tripDashboard/tripDashboard.jsx';

import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import LodgeList from './LodgeList.jsx';

const SERVER_URL = HOSTNAME;

class TripPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lodging: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.createTripDashboard = this.createTripDashboard.bind(this);
    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
    this.showLodges = this.showLodges.bind(this);
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
      isopen: true
    };


    e.preventDefault();
    let context = this;
    $.ajax({
      url: HOSTNAME + '/popup',
      method: 'POST',
      data: option,
      success: (body) => {
        context.props.fetchLists();
        this.createTripDashboard(body);
        console.log('POST was a success ');
      },
      error: (err) => {
        console.log('error with GET', err);
      }
    });
  }
 
  handleLocationSubmit(e) {
    e.preventDefault();
    const context = this;
    const query = $('.location').val();
    console.log('query', query);
    $.ajax({
      url: `${HOSTNAME}/location/lodging/:${query}`,
      method: 'GET',
      success: (body) => {
        console.log('Location GET Request was a success! ');
        var data = JSON.parse(body).businesses.splice(0,4);
        context.setState({lodging: data});
      },
      error: (err) => {
        console.log('error with GET', err);
      }
    })
  }

  showLodges() {
    if (this.state.lodging.length) {
      return <LodgeList data={ this.state.lodging }/>
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="popup">
          <h3>Create a new trip:</h3>
          <form className="popupform" >
            <div className="form-entry">
              <label>Trip Name:</label>
              <input className="popupfield" type="text" name="name" placeholder="add name..."/>
            </div>

            <div className="form-entry">
              <label>Trip Location:</label>
              <input className="popupfield location" type="text" name="location" placeholder="add Location..."/>
              <button onClick={ this.handleLocationSubmit }>submit</button>
            </div>

            <div className="form-entry">
              <label>Start Date:</label>
              <input className="popupfield" type="date" name="start" placeholder="start date..."/>
            </div>

            <div className="form-entry">
              <label>End Date:</label>
              <input className="popupfield" type="date" name="end" placeholder="end date..."/>
            </div>

            <div className="form-entry">
              <label>Trip Lodging:</label>
              <input className="popupfield" type="text" name="lodging" placeholder="add Lodging..."/>

            </div>

            <Button className="popupbutton" type="submit" value="create trip" onClick={ this.handleSubmit }>Submit</Button>
          </form>
          <br/>
          {this.showLodges()}
          
      </div>
    );
  }
}

let mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps)(TripPopup);
