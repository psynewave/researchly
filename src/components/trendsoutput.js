import React, { Component } from 'react';
import classNames from 'classnames';
import Grid from './grid';
import Column from './column';
import Container from './container';
import Segment from './segment';
import Listings from './listings';
import Trends from './trends';
import AppBar from './appbar.js';

export default class TrendsOutput extends React.Component {
  render () {

    let props = this.props;

    return (
      <Grid id="trends-output" styles="ui stackable">
        <Column id="trendsViewAppBar" styles="one">
          <AppBar fullChat={props.fullChat} active="search"/>
        </Column>

        <Column id="trends" styles="padded-left eleven">
          <Trends />
        </Column>
        <Column id="tax-listings" styles="padded-right four">
          <Listings fullsize={props.fullsize} chatHidden={props.chatHidden} toggleChat={props.toggleChat} fullChat={props.fullChat}/>
        </Column>
      </Grid>
    );
  }
}
