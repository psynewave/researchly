import React, { Component } from 'react';
import Constants from '../constants/consts';
import 'imports?$=jquery,jQuery=jquery!../../css/slick/slick.min.js';

export default class ListingChatCard extends React.Component {

  componentWillMount(){

  }

  render () {

    let props = this.props;

    return (
      <div id={props.id}>
        hello world
      </div>
    );
  }
}
