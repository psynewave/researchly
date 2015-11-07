import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'imports?$=jquery,jQuery=jquery!../../css/semantic/semantic.min.js';

export default class Header extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
      $('.search-popup').popup({
        position: 'bottom left',
        variation: 'very wide',
        preserve: true,
        inline: true
      });
  }

  render () {
    let avatar;
    let props = this.props;
    let state = this.state;
    let profile = props.profile ? props.profile : null;

    console.log(props);

    if(profile){
      avatar = <div className="ui medium list avatar">
        <div className="item">
          <img className="ui avatar image" src={profile.picture} />
          <div className="content">
            <div className="header no-padding">{profile.name}</div>
          </div>
        </div>
       </div>
    }

    let heading =  `blah`;

    let popup = "<div className='header'>Search Examples</div><div className='content'> <div className='ui list'> <div className='item'> <div className='ui horizontal segments'> <div className='ui first basic segment'> <p>City, State</p></div><div className='ui next basic segment'> <p>sunnyvale, ca</p></div></div></div><div className='item'> <div className='ui horizontal segments'> <div className='ui first basic segment'> <p>Zip Code</p></div><div className='ui next basic segment'> <p>94086</p></div></div></div><div className='item'> <div className='ui horizontal segments'> <div className='ui first basic segment'> <p>Address</p></div><div className='ui next basic segment'> <p>350 Oakmead Pky Sunnyvale CA</p></div></div></div><div className='item'> <div className='ui horizontal segments'> <div className='ui first basic segment'> <p>Street</p></div><div className='ui next basic segment'> <p>Oakmead Pky Sunnyvale CA</p></div></div></div></div></div></div></div>";

    return (
      <header className="collapsed">
        <div>
          <div className="ui grid inverted menu no-margin-top no-border-radius">
            <div id="smallLogo" className="three wide column">
              <h2 className="ui icon header floated left no-margin-top no-margin-left no-padding-top no-padding-bottom">
                <i id="smallLogoIcon" className="circular line chart icon float left no-padding-top no-padding-bottom"></i>
                <div id="smallLogoHeader" className="ui sub header no-margin-top no-margin-left">{props.appName}</div>
              </h2>
            </div>
            <div id="search-form" className="ten wide column">
              <form id="search-bar" className="ui fluid action large input" onSubmit={this._search} autoComplete="off">
                <input autoComplete="off" ref="search" id="search" type="search" placeholder="Search" className="search-popup" data-html={popup}/>
                <button className="ui primary button" type="Submit">
                  <i className="search icon"></i>
                  Search
                </button>
              </form>
            </div>
            <div className="three wide column">
                  {avatar}
            </div>
          </div>
          <h2 className="ui header search-header">
             {heading}
          </h2>
        </div>
      </header>
    );
  }
}
