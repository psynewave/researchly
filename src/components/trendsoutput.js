import React, { Component } from 'react';
import classNames from 'classnames';
import Grid from './grid';
import Column from './column';
import Container from './container';
import Segment from './segment';
import Listings from './listings';
export default class TrendsOutput extends React.Component {
  render () {

    let props = this.props;

    return (
      <Grid id="trends-output" styles="ui stackable">
        <Column id="trends" styles="padded-left ten">
          <p>Trends will go here</p>
        </Column>
        <Column id="tax-listings" styles="padded-right six">
          <p>comps will go in here</p>
          <Listings />
        </Column>
      </Grid>
    );
  }
}
