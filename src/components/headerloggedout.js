import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Header extends React.Component {
  constructor(props){
    super(props);
  }

  render () {

    let props = this.props;
    let state = this.state;

    return (
      <header className="logged-out">
        <div className="ui container">
          <h2 id="bigLogo" className="ui center aligned icon header">
            <i className="circular line chart icon"></i>
            {props.appName}
          </h2>
          <div className="ui text grid container">
            <div className="row">
              <div className="center aligned column">
              <h1 className="ui center aligned header">
                Collaborative Real Estate Intelligence
              </h1>
            </div>
            </div>
            <div className="row">
            <div className="center aligned column">
              <div className="ui huge green button animated fade" onClick={props.login}>
                <div className="visible content">
                  Get Started
                  <i className="right arrow icon"></i>
                </div>
                <div className="hidden content">
                  Sign-up is Painless
                </div>
              </div>
            </div>
          </div>
          </div>


        </div>
      </header>
    );
  }
}
