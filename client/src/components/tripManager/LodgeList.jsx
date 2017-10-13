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
            return <LodgeItem data={ lodge } showPics={ this.props.showPics } key={i} handleLodgeChoice={ this.props.handleLodgeChoice } lodgePics={ this.props.lodgePics }/>;
          })
        }
      </Grid>
    );
  }
}

export default LodgeList;