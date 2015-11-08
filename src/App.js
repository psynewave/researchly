import $ from 'jquery';
import _ from 'underscore';
import 'imports?$=jquery,jQuery=jquery!../css/semantic/semantic.min.js';
import '../css/style.css';
import React, { Component } from 'react';
import Actions from './actions/appActions';
import Constants from './constants/consts';
import Store from './stores/AppStore';
import AppBody from './components/appBody';
import MarketCopy from './components/marketcopy';
import ChatBox from './chat/ChatBox';
import NotePad from './notes/NotePad';
import LoggedOutContent from './components/loggedoutcontent';
import LoggedInContent from './components/loggedincontent';

window.React = React;
window.$ = $;
window.jQuery = $;
window._ = _;

//prevent caching of api data
$.ajaxSetup({ cache: false });

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      copyYear: new Date().getFullYear(),
      location : Store.GeoData(),
      appName: 'Research.ly'
    };
    this._found = this.found.bind(this);
    this.getLock = this.getLock.bind(this);
    this.showLock = this.showLock.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  found(){
    window.setTimeout(function () {
      Actions.fetchTrends(Store.GeoData(),'search');
      Actions.fetchResults();
    }, 10);
    this.setState({
      location : Store.GeoData()
    });
  }

  showLock(){
    this.lock.show();
    console.log('ola');
  }

  getLock() {
    this.lock = new Auth0Lock('GVLRAhDhK14MFwrjwzb9zSCAVzUC4xY7', 'waverunner.auth0.com');
  }

  getIdToken() {
    let idToken = localStorage.getItem('userToken');
    let authHash = this.lock.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('userToken', authHash.id_token);
      }
      if (authHash.error) {
        console.log("Error signing in", authHash);
        return null;
      }
    }
    return idToken;
  }

  getProfile(){
    let token = this.getIdToken();
    if(token){
      this.lock.getProfile(token, function (err, profile) {
        if (err) {
          console.log("Error loading the Profile", err);
        }
        this.setState({
          profile: profile
        });
      }.bind(this));
    }
  }

  componentWillMount () {
    Store.addChangeListener(Constants.NEW_LOC, this._found);
    this.getLock();
    this.setState({
      idToken: this.getIdToken()
    });
    this.getProfile();
  }

  componentWillUnmount(){
    Store.removeChangeListener(Constants.NEW_LOC, this._found);
  }

  render() {
    let contentView;
    let state = this.state;

    if (state.idToken) {
      contentView = <div>
        <LoggedInContent state={this.state} profile={state.profile} login={this.showLock}/>
        </div>
    } else {
      contentView = <div>
        <LoggedOutContent state={this.state} login={this.showLock}/>
          <div className="ui menu inverted fixed">
            <div className="item">
              loggedout
            </div>
          </div>
        </div>
    }

    return (
      <div id="app" className="pusher">
      {contentView}
      </div>
    );
  }
}
