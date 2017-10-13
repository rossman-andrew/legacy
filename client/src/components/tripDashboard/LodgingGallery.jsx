import React from 'react';
import { Image, Grid } from 'semantic-ui-react';

class LodgingGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lodgingPics: this.props.lodgingPics,
      featuredImage: ''
    };
  }

  componentDidMount() {
    this.setState({
      featuredImage: this.props.lodgingPics[0] 
    });
  }
  updateFeatImg(e) {
    this.setState({
      featuredImage: e.target.src
    });
  }

  render() {
    return (
      <div> 
        <h4>Lodging Options</h4>
        <hr/>
        <Grid.Column computer={3} tablet={6} mobile={12}>
          <div className='featImgContainer'>
            <Image src={this.state.featuredImage} size={'massive'} centered={true} shape={'rounded'} bordered={true} />
          </div>
          <hr/>
          <Image.Group size='medium'>
            {
              this.state.lodgingPics.map((imgLink, index) => {
                return <Image src={imgLink} key={index} onClick={(e) => this.updateFeatImg(e)} size={'medium'} shape={'rounded'} bordered={true} />;
              })
            }
          </Image.Group>
          
        </Grid.Column>
      </div>
    );
  }
}

export default LodgingGallery;