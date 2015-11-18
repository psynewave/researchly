import React, { Component } from 'react';
import classNames from 'classnames';
import Column from './column';

export default class AppBar extends React.Component {

  render () {

    let props = this.props;
    let state = this.state;

    return (
      <Column styles="padded-left one appBar">
        <div className="ui row">
          <Column styles="sixteen">
            <i className={ props.active === "search" ? "search icon active" : "search icon" } onClick={props.toggleChat}></i>
          </Column>
        </div>
        <div className="ui row">
          <Column styles="sixteen">
            <i className={ props.active === "chat" ? "wechat icon active" : "wechat icon" } onClick={props.fullChat}></i>
          </Column>
        </div>
        <div className="ui row">
          <Column styles="sixteen">
            <i className="setting icon"></i>
          </Column>
        </div>
      </Column>
    );
  }
}
