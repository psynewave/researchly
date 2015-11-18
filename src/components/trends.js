import React, { Component } from 'react';
import Store from '../stores/AppStore';
import Actions from '../actions/appActions';
import Constants from '../constants/consts';
import Grid from './grid';
import Column from './column';
import Container from './container';
import Segment from './segment';
import Chart from './chart';
import Slider from './slider';

export default class Trends extends React.Component {
  constructor() {
    super();
    this.state = {
      location : Store.GeoData()
    };
    this._search = this.search.bind(this);
    this._found = this.found.bind(this);
  }

  search(e){
    e.preventDefault();
    let address = ReactDOM.findDOMNode(this.refs.search).value;
    Actions.geoCode(address);
  }

  found(){
    window.setTimeout(function () {
      Actions.fetchTrends(Store.GeoData(),'search');
      Actions.fetchResults();
    }, 10);
    this.setState({
      location : Store.GeoData()
    });
  }

  componentWillMount () {
    Store.addChangeListener(Constants.NEW_LOC, this._found);
    if( this.props.default ){
      Actions.geoCode('94086');
    }
  }

  componentWillUnmount(){
    Store.removeChangeListener(Constants.NEW_LOC, this._found);
  }

  render () {

    let props = this.props;
    let state = this.state;

    let zip = state.location.Zip ? state.location.Zip : '';
    let city = state.location.City ? state.location.City : '';
    let county = state.location.County ? state.location.County : '';
    let profile = props.profile ? props.profile : null;

    let searchHeading =  `${zip} ${city} ${county}`;

    return (
      <div>
        <Grid id="trends-charts" styles="stackable no-margin-right">
          <div className="ui row">
            <Column styles="eight" utilityStyles="no-padding-left">
              <h3 id="searchHeading">{searchHeading}</h3>
            </Column>
            <Column styles="eight" utilityStyles="no-padding-right">
              <Slider></Slider>
            </Column>
          </div>
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
