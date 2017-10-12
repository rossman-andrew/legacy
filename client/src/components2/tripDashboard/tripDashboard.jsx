import React from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react'
import $ from 'jquery';

import Mapbox from '../mapboxViewer.jsx';
import Landmarks from '../landmarks/landmarks.jsx';
import TripNavBar from './tripNavBar.jsx';
import UserInfo from './userInfo.jsx';
import ProfileEditor from '../profileEditor/ProfileEditor.jsx'; // remove after testing
import reducer from '../../Reducers';
import navData from './dummyData.js';
import TripUserList from './tripUserList.jsx';
import TripDetails from './tripDetails.jsx';
import LodgingGallery from './LodgingGallery.jsx';
import TripGallery from './TripGallery.jsx';

let mapStateToProps = ({ trip }) => {
  return { trip };
}

class TripDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      map: true,
      users: [],
      selectedUserInfo: ''
    }

    this.toggleMap = this.toggleMap.bind(this);
    this.showUserInfo = this.showUserInfo.bind(this);
  }

  // retrieves array of users on trip
  getUsers() {
    let options = {
      url: HOSTNAME + '/tripusers/' + this.props.trip.id,
      success: (data) => {
        this.setState({
          users: data
        });
      },
      error: (data) => {
        console.error('FAILED GET - Userlist', data);
      }
    }
    $.ajax(options);
  }

  toggleMap() {
    this.setState({
      map: !this.state.map
    });
  }

  // select user to display info
  // on click, set selectedUser to clicked
  showUserInfo(userId) {
    let options = {
      url: `${HOSTNAME}/userinfo/${userId}/${this.props.trip.id}`,
      success: (data) => {
        this.setState({
          selectedUserInfo: data
        });
      },
      error: (data) => {
        console.log('FAILED GET - User Info', data);
      }
    }

    $.ajax(options);
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const panes = [
      { menuItem: 'Summary', render: () => <Tab.Pane><TripDetails trip={this.props.trip}/><TripUserList users={this.state.users} selectedUser={this.state.selectedUserInfo} showUserInfo={this.showUserInfo}/><ProfileEditor user={this.props.user} trip={this.props.trip.id}/></Tab.Pane> },
      { menuItem: 'Map', render: () => <Tab.Pane><Mapbox className=".map" location={this.props.trip.location} /></Tab.Pane> },
      { menuItem: 'Lodging', render: () => <Tab.Pane><LodgingGallery /></Tab.Pane> },
      { menuItem: 'Gallery', render: () => <Tab.Pane><TripGallery trip={this.props.trip} /></Tab.Pane> }
    ]; 
    return(
      <div>
        <Tab panes={panes} style={{height: '100%'}} />
      </div>
    )
  }
}

      //   <Tab.Container id="tripProfile" defaultActiveKey="summary">
      //     <Row className="clearfix">
      //       <Col sm={12}>
      //         <Nav bsStyle="tabs">
      //           <NavItem eventKey="summary">
      //             Trip Summary
      //           </NavItem>
      //           <NavItem eventKey="map">
      //             Trip Map
      //           </NavItem>
      //           <NavItem eventKey="lodging">
      //             Lodging Options
      //           </NavItem>
      //           <NavItem eventKey="gallery">
      //             Trip Gallery
      //           </NavItem>
      //         </Nav>
      //       </Col>
      //       <Col sm={12}>
      //         <Tab.Content animation>
      //           <Tab.Pane eventKey="summary">
      //             <TripDetails trip={this.props.trip}/>
      //           </Tab.Pane>
      //           <Tab.Pane eventKey="map">
      //             {this.state.map ? <Mapbox location={this.props.trip.location} /> : <Landmarks />} 
      //           </Tab.Pane>
      //           <Tab.Pane eventKey="lodging">
      //             <LodgingGallery />
      //           </Tab.Pane>
      //           <Tab.Pane eventKey="gallery">
      //             <TripGallery />
      //           </Tab.Pane>
      //         </Tab.Content>
      //       </Col>
      //     </Row>
      //   </Tab.Container>
      // </Col>
      // </Row>

//        <TripDetails trip={this.props.trip}/>
//        {this.state.map ? <Mapbox location={this.props.trip.location} /> : <Landmarks />} 

//        {/*<Button className="button" onClick={this.toggleMap}>Toggle center panel (not currently used)</Button>*/}
//        <LodgingGallery />
//        <TripUserList users={this.state.users} selectedUser={this.state.selectedUserInfo} showUserInfo={this.showUserInfo}/>
//        <ProfileEditor user={this.props.user} trip={this.props.trip.id}/>

export default connect(mapStateToProps)(TripDashboard);
