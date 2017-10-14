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
  return (
    <Grid.Column mobile={12} tablet={6} computer={5}>
      <Image src={props.tripPic} />
      <Card.Content>
        <br />
        <Card.Header>
          <h3 onClick={props.onClick}><a href='#'>{props.trip.name}</a></h3>
        </Card.Header>
        <Card.Meta>
          <span>
            <h3>{props.trip.location}</h3>
          </span>
        </Card.Meta>
        <Card.Description>
          <br />
          Dates: {startDateFormat} - {endDateFormat}<br></br>
          Access Code: {props.trip.accessCode}<br></br>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <br />
        <a>
          <Icon name='user' />
          {props.trip.Users[0].name}
        </a>
        <Icon onClick={() => props.joinTrip(props.trip.accessCode)}style={{float: 'right'}} name='plus' />
      </Card.Content>
    </Grid.Column>
  );
};

export default TripEntry;
