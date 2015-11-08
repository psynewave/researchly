import React, { Component } from 'react';
import AppBody from './appBody';
import Footer from './footer';
import MarketCopy from './marketcopy';
import Header from './headerloggedout';
import ChatBox from '../chat/chatbox';

export default class LoggedOutContent extends React.Component {

  render () {

    let props = this.props;
    let _state = props.state;

    return (
      <AppBody>
        <Header login={props.login}/>
        <MarketCopy login={props.login}/>
        <Footer copyYear={_state.copyYear} />
      </AppBody>
    );
  }
}
