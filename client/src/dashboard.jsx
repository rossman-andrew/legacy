import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

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
import socket from './socket/socket.js';
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
      lodgePics: [],
      historyPics: [],
      suggestionPics: []
    };
    this.fetchLists = this.fetchLists.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.lodgePics = this.lodgePics.bind(this);
    this.getTripImages = this.getTripImages.bind(this);
    this.googleApi = 'AIzaSyCbYElCaZFgB0cVjo51y6CobZnte_TZl9A';
  }

  componentWillMount () {
    //Get login user
    $.get(SERVER_URL + '/loginuser').then((data) => {
      store.dispatch(reducer.changeUser(data[0]));
      this.fetchLists();
      socket.emit('notification', {
        name: data[0].name,
        message: 'has logged on.',
        date: new Date().toLocaleString(),
        userId: data[0].id
      });
    }).catch((err) => {
      console.error('Error getting login user', err);
    });
  }

  componentDidMount () {
    //Get login user
    console.log(store.getState().user.name);
  }

  getTripImages(picLibrary) {
    const tripCollection = picLibrary === 'historyTrips' ? this.state.trips : this.state.otherTrips;
    tripCollection.forEach((trip) => {
      axios.get('https://www.googleapis.com/customsearch/v1', {
        params: {
          key: this.googleApi,
          cx: '012965794133406592343:as9mecf3btc',
          q: 'beautiful ' + trip.location,
          searchType: 'image'
        }
      })
        .then((response) => {
          let locationPics = [];
          for (let i = 0; i < 4; i++) {
            locationPics.push(response.data.items[i].link);
          }
          let locationObj = {};
          locationObj[trip.location] = locationPics;
          this.setState((prevState) => {
            if (picLibrary === 'historyPics') {
              return {historyPics: prevState.historyPics.concat(locationObj)};
            } else {
              return {suggestionPics: prevState.suggestionPics.concat(locationObj)};
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  fetchLists() {
    let options = { userId: store.getState().user.id };
    $.ajax({
      url: SERVER_URL + '/fetchtrips',
      data: options,
      success: (res) => {
        this.setState({ trips: res }, () => {
          this.getTripImages('historyPics');
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
        this.setState({ otherTrips: res }, () => {
          this.getTripImages('suggestionPics');
        });
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
      return <TripManager trips={this.state.trips} otherTrips={this.state.otherTrips} fetchLists={this.fetchLists} lodgePics={ this.lodgePics } historyPics={this.state.historyPics} suggestionPics={this.state.suggestionPics} />;
    } else if (store.getState().view === 'ExpenseTracker') {
      return <ExpenseTracker />;
    } else if (store.getState().view === 'Landmarks') {
      return <Landmarks />;
    } else if (store.getState().view === 'Profile') {
      return <Profile />;
    } else {
      return <TripDashboard user={store.getState().user} lodgePics={ this.state.lodgePics } />;
    }
  }

  showNavBar() {
    return (
      <div>
        <TripNavBar logout={this.handleLogout} other={store.getState().view !== 'TripManager' && store.getState().view !== 'Profile'} features={navData.features} dispatch={store.dispatch} />;
      </div>
    );
  }

  showSpace() {
    if (store.getState().view === 'Profile') {
      return <div><br /> <br /></div>;
    }
  }

  render() {
    return (
      <div>
        {this.showNavBar()}
        {this.showSpace()}
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
          showWelcome() {
    if (store.getState().view === 'TripManager') {
      return <div><br /><h3>Hello {store.getState().user.name}, welcome back</h3></div>;
    } else {
      return <div><br /> <br /> <br /></div>;
    }
  }
        */
