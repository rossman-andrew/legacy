import React from 'react';
import { Image, Grid } from 'semantic-ui-react';

class LodgingGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featuredImage: ''
    };
  }

  componentDidMount() {
    this.setState({
      featuredImage: 'http://cdni.condenast.co.uk/646x430/o_r/Orpheus_cnt_24sep10_pr_b.jpg'
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
        <Grid.Column computer={4} tablet={6} mobile={12}>
          <div className='featImgContainer'>
            <Image src={this.state.featuredImage} size={'massive'} centered={true} />
          </div>
          <hr/>
          <Image.Group size='medium'>
            <Image src='http://cdni.condenast.co.uk/646x430/o_r/Orpheus_cnt_24sep10_pr_b.jpg' onClick={(e) => this.updateFeatImg(e)} />
            <Image src='https://s-ec.bstatic.com/images/hotel/max1024x768/899/89969890.jpg' onClick={(e) => this.updateFeatImg(e)} />
            <Image src='https://santorinidave.com/files/2014/03/best-santorini-villas-grace-private-pool-villa-santorini-imerovigli.jpg' onClick={(e) => this.updateFeatImg(e)} />
            <Image src='https://santorinidave.com/files/2014/03/best-santorini-villas-anemi-house-oia.jpg' onClick={(e) => this.updateFeatImg(e)} />
          </Image.Group>
        </Grid.Column>
      </div>
    );
  }
}

export default LodgingGallery;