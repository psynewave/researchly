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
              <div className="ui vertical stripe quote segment">
                <div className="ui equal width stackable internally celled grid">
                  <div className="center aligned row">
                    <div className="column">
                      <h3>"Can't believe this was built in a weekend!"</h3>
                      <p>That is what our competitors say about us</p>
                    </div>
                    <div className="column">
                      <h3>"Tax Data and Analytics combined?? The dreams of some people."</h3>
                      <p>
                        <img src="../Portal/images/alan.png" className="ui avatar image"/> <b>Alan</b> Chief Data Officer Old School Market Watch
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ui vertical stripe segment">
                <div className="ui text container">
                  <h3 className="ui header">Powered by Retsly, Built with React, Made Awesome with Business Analytics</h3>
                  <p>Instead of focusing on uberizing real estate and building listing portals, we have combined tax and mls data to create an system that reduce the massive, monolithic challenge of measuring market value and worth to a few clicks.</p>
                  <a className="ui large button" onClick={props.login}>Try it Now!</a>
                  <h4 className="ui horizontal header divider">
                    <a href="#">Case Studies</a>
                  </h4>
                  <h3 className="ui header">Did We Tell About The Real Time Chat?</h3>
                  <p>Yes I know you probably disregarded the earlier boasts as non-sequitor filler content, but its really true. We have combined tax and analytics data into a real time collaboration channel that means teams can be anywhere and still work together.</p>
                  <a className="ui large button" onClick={props.login}>Click To Load Your First Search</a>
                </div>
              </div>
            </div>
    );
  }
}
