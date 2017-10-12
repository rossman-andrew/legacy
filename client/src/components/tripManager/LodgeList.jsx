import _ from 'lodash';
import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import LodgeItem from './LodgeItem.jsx';

class LodgeList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	return (
  	  <Grid computer={4} >
  	  	{
  	  	  this.props.data.map((lodge, i) => {
  	  	  	return <LodgeItem data={ lodge } key={i}/>;
  	  	  })
  	  	}
  	  </Grid>
  	)
  }
};

export default LodgeList;