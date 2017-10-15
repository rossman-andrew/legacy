import React from 'react';
import { Button, Icon, Image as ImageComponent, Item, Label } from 'semantic-ui-react';

const TripDetails = (props) => {
  // 'https://www.interrail.eu/sites/interrail.eu/files/styles/asset_image_responsive_common_list_block_380/public/assets/images/2013/11/santorini_greece.jpg'
  return (
    <Item.Group divided>
      <Item>
        <Item.Image src={props.tripPic} />

        <Item.Content>
          <Item.Header as='a'>{props.trip.location}</Item.Header>
          <Item.Meta>
            <span className='cinema'>{props.trip.startDate}&nbsp;&nbsp;|&nbsp;&nbsp;{props.trip.endDate}</span>
          </Item.Meta>
          <Item.Description>{props.trip.lodging}</Item.Description>
          <Item.Extra>
            <Button primary floated='right'>
              Join Trip
              <Icon name='right chevron' />
            </Button>
            <Label>Recommended</Label>
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};


export default TripDetails;
