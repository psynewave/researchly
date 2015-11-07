import React, { Component } from 'react';
import classNames from 'classnames';

export default class MarketCopy extends React.Component {

  constructor(props){
    super(props);
  }

  render () {

    let props = this.props;

    return (
        <div id="marketing-copy">
          <div className="ui vertical stripe segment">
          <div className="ui middle aligned stackable grid container">
            <div className="row">
              <div className="eight wide column">
                <h1 className="ui header">We Empower Investment Teams</h1>
                <p>We can give your investment team superpowers to do things that they never thought possible. Let us delight your customers and empower your needs...through pure data analytics.</p>
                <h2 className="ui header">Meet your new favorite app</h2>
                <p>Yes that's right, you thought it was the stuff of dreams, but analytics and tax comps can be painless.</p>
              </div>
              <div className="six wide right floated column">
                <img src="../Portal/images/Money-Graph.png" className="ui large rounded image" />
              </div>
            </div>
            <div className="row">
              <div className="center aligned column">
                <a className="ui huge button positive colored" onClick={props.login}>
                  <i className="dashboard icon"></i>
                  Take a Test Drive
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
    );
  }
}
