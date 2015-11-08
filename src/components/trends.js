import React, { Component } from 'react';
import Store from '../stores/AppStore';
import Actions from '../actions/appActions';
import Grid from './grid';
import Column from './column';
import Container from './container';
import Segment from './segment';
import Chart from './chart';
import Slider from './slider';

export default class Trends extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
  }

  render () {

    let props = this.props;
    let state = this.state;

    return (
      <div>
        <Slider></Slider>
        <Grid id="trends-charts" styles="stackable no-margin-right">
            <Column styles="eight" utilityStyles="no-padding-left">
              <Segment styles="attached chart no-margin-bottom">
                <h5 className="ui top attached label">
                  Sold Avg DOM
                  <img className="avatar right" src="./Portal/images/mlslistings-logo.png" width="80px"/>

                </h5>
                <Chart group="search" label="Period" column="SoldAvgDOM"></Chart>
              </Segment>
            </Column>
            <Column styles="eight" utilityStyles="no-padding-right">
            <Segment styles="attached chart no-margin-bottom">
              <h5 className="ui top attached label">
                Median Sale Price Per Sqft
                <img className="avatar right" src="./Portal/images/mlslistings-logo.png" width="80px"/>

              </h5>
              <Chart group="search" label="Period" column="MedSalePricePerSqft"></Chart>
            </Segment>
          </Column>
          <Column styles="eight" utilityStyles="no-padding-left">
            <Segment styles="attached chart no-margin-bottom">
              <h5 className="ui top attached label">
                Sold Median List Price
                <img className="avatar right" src="./Portal/images/mlslistings-logo.png" width="80px"/>

              </h5>
              <Chart group="search" label="Period" column="SoldMedListPrice"></Chart>
            </Segment>
          </Column>
          <Column styles="eight" utilityStyles="no-padding-right">
            <Segment styles="attached chart no-margin-bottom">
              <h5 className="ui top attached label">
                Sale Volume
                <img className="avatar right" src="./Portal/images/mlslistings-logo.png" width="80px"/>

              </h5>
              <Chart group="search" label="Period" column="SaleVolume"></Chart>
            </Segment>
          </Column>
        </Grid>
      </div>
    );
  }
}
