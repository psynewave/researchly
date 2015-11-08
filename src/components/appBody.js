import React, { Component } from 'react';

export default class AppBody extends React.Component {

  render () {

    let props = this.props;

    return (
      <div id={props.id} className="app body">
        {props.children}
      </div>
    );
  }
}
