import React from 'react';
import $ from 'jquery';
import { Image, Grid } from 'semantic-ui-react';

class TripGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripPics: [],
      featuredImage: ''
    };
  }

  componentDidMount() {
    $.ajax({
      url: `https://www.googleapis.com/customsearch/v1?key=AIzaSyBEkRzfpS6T7dZcLaYA9lQdzMJNDSrgOgg&cx=012965794133406592343:m7o6dpksdcc&q=${'image of ' + this.props.trip.location}&searchType=image`, 
      success: (data) => { 
        console.log(data);
        for (let i = 0; i < 4; i++) {
          this.state.tripPics.push(data.items[i].link);
        } 
        this.setState({
          featuredImage: this.state.tripPics[0]
        });
      },
      error: (err) => { 
        console.log('error'); 
      }  
    });
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
      </Grid.Column>
>>>>>>> Code cleanup
      </div>
    );
  }
}

export default TripGallery;