import React, { Component } from 'react';
import classNames from 'classnames';

export default class Grid extends React.Component {

  render () {

    let props = this.props;

    return (
      <div id={props.id} className={classNames('grid', 'ui', props.styles)}>
        {props.children}
      </div>
    );
  }
}
