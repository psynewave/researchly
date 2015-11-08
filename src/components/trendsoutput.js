import React, { Component } from 'react';
import classNames from 'classnames';
import Grid from './grid';
import Column from './column';
import Container from './container';
import Segment from './segment';
import Listings from './listings';
import Trends from './trends';
import Comps from './comps';
export default class TrendsOutput extends React.Component {
  render () {

    let props = this.props;

    return (
      <Grid id="trends-output" styles="ui stackable">
        <Column id="trends" styles="padded-left ten">
          <Trends />
        </Column>
        <Column id="tax-listings" styles="padded-right six">
          <Comps />
          <Listings fullsize={props.fullsize} chatHidden={props.chatHidden} toggleChat={props.toggleChat} fullChat={props.fullChat}/>
        </Column>
      </Grid>
    );
  }
}
