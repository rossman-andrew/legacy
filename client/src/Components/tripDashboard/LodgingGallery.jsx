import React from 'react';
import { Image, Grid } from 'semantic-ui-react';

const LodgingGallery = (props) => {
  return (
    <div>
      <hr/>
      <h4>Lodging Options</h4>
      <hr/>
      <Grid.Column computer={4} tablet={6} mobile={12}>
      <Image.Group size='medium'>
        <Image src='https://santorinidave.com/files/2014/03/best-santorini-villas-grace-private-pool-villa-santorini-imerovigli.jpg' />
        <Image src='https://s-ec.bstatic.com/images/hotel/max1024x768/899/89969890.jpg' />
        <Image src='http://cdni.condenast.co.uk/646x430/o_r/Orpheus_cnt_24sep10_pr_b.jpg' />
        <Image src='https://santorinidave.com/files/2014/03/best-santorini-villas-anemi-house-oia.jpg' />
      </Image.Group>
    </Grid.Column>
    </div>
  )
}

export default LodgingGallery;