import React from 'react';
import { Card, Icon, Image, Grid, Segment } from 'semantic-ui-react';

const TripEntry = (props) => {

  let startDate = Date.parse(props.trip.startDate);
  let startNewDate = new Date(startDate);
  let startYear = startNewDate.getFullYear();
  let startMonth = startNewDate.getMonth() + 1;
  let startDay = startNewDate.getDate();
  let startDateFormat = startMonth + '/' + startDay + '/' + startYear;

  let endDate = Date.parse(props.trip.endDate);
  let endNewDate = new Date(endDate);
  let endYear = endNewDate.getFullYear();
  let endMonth = endNewDate.getMonth() + 1;
  let endDay = endNewDate.getDate();
  let endDateFormat = endMonth + '/' + endDay + '/' + endYear;
  console.log(props.trip);

  return (
    <Grid.Column mobile={12} tablet={6} computer={4}>
      <Card>
        <Image src='https://www.interrail.eu/sites/interrail.eu/files/styles/asset_image_responsive_common_list_block_380/public/assets/images/2013/11/santorini_greece.jpg' />
        <Card.Content>
          <Card.Header>
            <h4 onClick={props.onClick}><a href='#'>{props.trip.name}</a></h4>
          </Card.Header>
          <Card.Meta>
            <span>
              {props.trip.location}
            </span>
          </Card.Meta>
          <Card.Description>
            Start Date: {startDateFormat}<br></br>
            End Date: {endDateFormat}<br></br>
            Access Code: {props.trip.accessCode}<br></br>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            {props.trip.Users[0].name}

          </a>

          <Icon onClick={() => props.joinTrip(props.trip.accessCode)}style={{float: 'right'}} name='plus' />
        </Card.Content>
      </Card>
    </Grid.Column>
  );
};

export default TripEntry;
// {props.trip.Users.length} {props.trip.Users.length === 1 ? 'Person' : 'People'} Going
