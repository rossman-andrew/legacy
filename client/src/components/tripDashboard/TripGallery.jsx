import React from 'react';
import $ from 'jquery';
import { Image, Grid } from 'semantic-ui-react';

class TripGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripPics: this.props.tripPics,
      featuredImage: this.props.tripPics[0]
    }
  }

  updateFeatImg(e) {
    this.setState({
      'featuredImage': e.target.src
    });
  }

  render() {
    return (
      <div>
        <h4>{this.props.trip.name}</h4>
        <hr/>
        <Image.Group size='medium'>
          {
            this.state.tripPics.map((imgLink, index) => {
              return <Image src={imgLink} key={index} onClick={(e) => this.updateFeatImg(e)} />
            })
          }
        </Image.Group>
      </div>
    );
  }
}

export default TripGallery;