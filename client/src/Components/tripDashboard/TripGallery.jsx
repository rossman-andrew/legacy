import React from 'react';
import { Image, Grid } from 'semantic-ui-react';

const TripGallery = (props) => {
  return (
    <div>
    <hr/>
    <h4>{props.trip.name}</h4>
    <hr/>
    <Grid.Column computer={4} tablet={6} mobile={12}>
      <Image.Group size='medium'>
        <Image src='http://www.telegraph.co.uk/content/dam/Travel/2017/July/fira-santorini-greece-sun-xlarge.jpg' />
        <Image src='https://fantasy-fantasytravel1.netdna-ssl.com/sites/default/files/santorini10_-_1.920px_x_1.200px-1600.jpg' />
        <Image src='https://newmedia.thomson.co.uk/live/vol/4/8aaf814a91edba9fb2eefcc8a1b69d22faf3efc1/1080x608/web/EUROPEMEDITERRANEANGREECESANTORINIDES_000939.jpg' />
        <Image src='http://www.planetware.com/photos-large/GR/greece-santorini-fira-view-out-to-sea.jpg' />
      </Image.Group>
    </Grid.Column>
    </div>
  )
}

export default TripGallery;