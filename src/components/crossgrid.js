import React, { Component } from 'react';
import classNames from 'classnames';

export default class CrossGrid extends React.Component {

  render () {

    let props = this.props;

    return (
      <div id={props.id} className={classNames(props.styles, 'ui', 'cross-grid')}>
        {props.children}
      </div>
    );
  }
}
