import React from 'react';
import $ from 'jquery';
import { Image, Grid } from 'semantic-ui-react';

class TripGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripPics: this.props.tripPics,
      featuredImage: this.props.tripPics[0]
    };
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
        <Grid.Column computer={4} tablet={6} mobile={12}>
          <div className='featImgContainer'>
            <Image src={this.state.featuredImage} size={'massive'} centered={true} />
          </div>
          <Image.Group size='medium'>
            {
              this.state.tripPics.map((imgLink, index) => {
                return <Image src={imgLink} key={index} onClick={(e) => this.updateFeatImg(e)} />
              })
            }
          </Image.Group>
        </Grid.Column>
      </div>
    );
  }
}

export default TripGallery;