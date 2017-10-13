import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import { Row, Col, Button, Menu } from 'semantic-ui-react';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './Reducers';
import { connect } from 'react-redux';


const store = createStore(reducer.travelReducer);
const { getState } = store;

import TripManager from './components/tripManager/tripManager.jsx';
import TripDashboard from './components/tripDashboard/tripDashboard.jsx';
import MapboxViewer from './components/mapboxViewer.jsx';
import ExpenseTracker from './components/expenseTracker/expenseTracker.jsx';
import Landmarks from './components/landmarks/landmarks.jsx';
import navData from './components/tripDashboard/dummyData.js';
import TripNavBar from './components/tripDashboard/tripNavBar.jsx';
import Profile from './components/profile/profile.jsx';



import Chatbox from './components/Chatbox/index.jsx';

const SERVER_URL = HOSTNAME;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    //Listen to changes in the redux store
    store.subscribe(() => { this.setState({reload: false}); });
    this.state = {
      trips: [],
      otherTrips: [],
      lodgePics: []
    };
    this.fetchLists = this.fetchLists.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.lodgePics = this.lodgePics.bind(this);
  }
  componentWillMount () {
    //Get login user
    $.get(SERVER_URL + '/loginuser').then((data) => {
      store.dispatch(reducer.changeUser(data[0]));
      this.fetchLists();
    }).catch((err) => {
      console.error('Error getting login user', err);
    });
  }

  fetchLists() {
    let options = { userId: store.getState().user.id };
    $.ajax({
      url: SERVER_URL + '/fetchtrips',
      data: options,
      success: (res) => {
        this.setState({ trips: res }, () => {
          this.fetchOtherLists();
        });
      }
    });
  }

  lodgePics(pics) {
    this.setState({lodgePics: pics.id});
  }

  fetchOtherLists() {
    let options = { userId: store.getState().user.id };
    $.ajax({
      url: SERVER_URL + '/fetchother',
      data: options,
      success: (res) => {
        this.setState({ otherTrips: res });
      },
      error: (err) => {
        console.error('Error getting other list', err);
      }
    });
  }

  handleLogout () {
    $.post(SERVER_URL + '/logout').then((reply) => {
      location.reload();
    }).catch((err) => {
      console.error('Error!', err);
    });
  }

  getViewComponent () {
    if (store.getState().view === 'TripManager') {
      return <TripManager trips={this.state.trips} otherTrips={this.state.otherTrips} fetchLists={this.fetchLists} lodgePics={ this.lodgePics }/>;
    } else if (store.getState().view === 'ExpenseTracker') {
      return <ExpenseTracker />;
    } else if (store.getState().view === 'Landmarks') {
      return <Landmarks />;
    } else if (store.getState().view === 'Profile') {
      return <Profile />;
    } else {
      return <TripDashboard user={store.getState().user} lodgePics={ this.state.lodgePics }/>;
    }
  }

  showNavBar() {
    if (store.getState().view !== 'TripManager') {
      return <TripNavBar logout={this.handleLogout} features={navData.features} dispatch={store.dispatch} />;
    }
  }

  render() {
    return (
      <div>
        <h3>Hello {store.getState().user.name}, welcome back</h3>
        {this.showNavBar()}
        <br />
        {this.getViewComponent()}
        <Chatbox/>
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Dashboard />
  </Provider>
  , document.getElementById('app'));

/*
				<div className="navbar">
          <ul>
            <li id="title">The Travel App</li>
            <li className="link">Home</li>
            <li className="link">News</li>
            <li className="link">Contact</li>
          </ul>
        </div>
        				<button id="hide" onClick={() => store.dispatch(reducer.changeView('TripManager'))}>Trip Manager</button>

        */
