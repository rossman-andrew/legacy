import React from 'react';

const TripDetails = (props) => {
  return (
    <div>
      <hr/>
      <h4>{props.trip.name}</h4>
      <hr/>
      <ul>
        <li className="tripdata">Where:&nbsp;&nbsp;{props.trip.location}</li>
        <li className="tripdata">Dates:&nbsp;&nbsp;{props.trip.startDate}&nbsp;&nbsp;|&nbsp;&nbsp;{props.trip.endDate}</li>
        <li className="tripdata">Lodging:&nbsp;&nbsp;{props.trip.lodging}</li>
      </ul>
    </div>
  )
};

export default TripDetails;
