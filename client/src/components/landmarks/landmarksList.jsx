import React from 'react';

import LandmarkEntry from './landmarkEntry.jsx';

const LandmarksList = (props) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th> Description </th>
            <th> URL </th>
            <th> Address </th>
            <th> Suggested by </th>
            <th> Votes </th>
          </tr>
          { props.landmarks.map(landmark => <LandmarkEntry user={props.user} fetch={props.fetch} landmark={landmark} key={landmark.id}/>) }
        </tbody>
      </table>
    </div>
  );
};

export default LandmarksList;
