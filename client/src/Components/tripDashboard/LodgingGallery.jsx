import React from 'react';
import { Image } from 'react-bootstrap';

const LodgingGallery = (props) => {
  return (
    <div>
      <hr/>
      <h4>Lodging Options</h4>
      <Image src="http://www.agalihouses.gr/sites/default/files/agali-houses-home-2.jpg" responsive thumbnail />
    </div>
  )
};

export default LodgingGallery;