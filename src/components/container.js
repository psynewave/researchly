import React, { Component } from 'react';

export default class Container extends React.Component {

  render () {

    let props = this.props;

    return (
      <div className="ui container">
        {props.children}
      </div>
    );
  }
}
