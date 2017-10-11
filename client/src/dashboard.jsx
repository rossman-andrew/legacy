import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import { Row, Col, Button } from 'semantic-ui-react';

import { Menu } from 'semantic-ui-react';

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
<<<<<<< HEAD
import navData from './components/tripDashboard/dummyData.js';
import TripNavBar from './components/tripDashboard/tripNavBar.jsx';
=======
import Chatbox from './components/Chatbox/index.jsx';
>>>>>>> Chatbox changes before rebase

const SERVER_URL = HOSTNAME;

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		//Listen to changes in the redux store
		store.subscribe(() => {this.setState({reload:false})});
		this.state = {
			trips: [],
			otherTrips: []
		};
		this.fetchLists = this.fetchLists.bind(this);
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

	fetchOtherLists() {
		let options = { userId: store.getState().user.id };
		$.ajax({
			url: SERVER_URL + '/fetchother',
			data: options,
			success: (res) => {
				console.log('these are the other ones: ', res);
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
	};

	getViewComponent () {
		if (store.getState().view === 'TripManager') {
			return <TripManager trips={this.state.trips} otherTrips={this.state.otherTrips} fetchLists={this.fetchLists}/>;
		} else if (store.getState().view === 'ExpenseTracker') {
			return <ExpenseTracker />;
		} else if (store.getState().view === 'Landmarks') {
			return <Landmarks />;
		} else {
			return <TripDashboard user={store.getState().user}/>;
		}
	}

	showNavBar() {
		if (store.getState().view !== 'TripManager') {
			return <TripNavBar features={navData.features} dispatch={store.dispatch} />
		}
	}

	render() {
		return(
			<div>
<<<<<<< HEAD
				<h3>Hello {store.getState().user.name}, welcome back</h3>
				<Button onClick={this.handleLogout}>Logout</Button>
				{this.showNavBar()}
				{this.getViewComponent()}
=======
				<div className="navbar">
          <ul>
            <li id="title">The Travel App</li>
            <li className="link">Home</li>
            <li className="link">News</li>
            <li className="link">Contact</li>
          </ul>
        </div>

        <div className="dashbody">

        	<Row className="manager-main">
        		<Col md={7} mdOffset={2}>
							<h3>Hello {store.getState().user.name}, welcome back</h3>
						</Col>

						<Col md={2}>
							<Button id="logoutbutton" onClick={this.handleLogout}>Logout</Button>
						</Col>
					</Row>

					<button id="hide" onClick={() => store.dispatch(reducer.changeView('TripManager'))}>Trip Manager</button>
					{this.getViewComponent()}
				</div>
				<Chatbox/>
>>>>>>> Chatbox changes before rebase
			</div>
		)
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
