import React, { Component } from 'react';
import classNames from 'classnames';

export default class Row extends React.Component {

  render () {

    let props = this.props;

    return (
      <div id={props.id} className={classNames(props.styles, 'row', props.utilityStyles)}>
        {props.children}
      </div>
    );
  }
}
