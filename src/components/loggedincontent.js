import React, { Component } from 'react';
import AppBody from './appBody';
import Footer from './footer';
import MarketCopy from './marketcopy';
import Header from './headerloggedin';
import ChatBox from '../chat/ChatBox';

export default class LoggedInContent extends React.Component {

  render () {

    let props = this.props;
    let _state = props.state;

    return (
      <AppBody>
        <Header profile={props.profile} login={props.login}/>
        <Footer copyYear={_state.copyYear} />
      </AppBody>
    );
  }
}
