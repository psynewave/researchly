import React, { Component } from 'react';

export default class Footer extends React.Component {

  render () {

    let props = this.props;

    return (
      <footer>
        <p>®{props.copyYear} MLSListings Inc. All rights reserved.</p>
      </footer>
    );
  }
}
