import React, { Component } from 'react';
import AppBody from './appBody';
import Footer from './footer';
import MarketCopy from './marketcopy';
import Header from './headerloggedin';
import TrendsOutput from './trendsoutput.js';
import ChatBox from '../chat/chatbox';
import History from './history';

export default class LoggedInContent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      fullsize: false,
      chatHidden: true,
      historyOpen: false
    };
    this.fullChat = this.fullChat.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
  }


  fullChat(){
    let state = this.state;
    this.setState({
      //fullsize: state.chatHidden ? false : state.fullsize ? false : true,
      fullsize: state.fullsize ? false : true,
      chatHidden: state.fullsize ? true : false,
    });
  }

  toggleChat(){
    let state = this.state;
    this.setState({
      fullsize: false,
      chatHidden: state.chatHidden ? false : true
    });
  }

  componentDidUpdate() {
      $('.dropdown').dropdown({
        transition: 'pulse'
      });
  }

  render () {

    let props = this.props;
    let _state = props.state;
    let state = this.state;

    return (
      <AppBody id={ state.fullsize ? 'fullChat' : ''}>
        <Header appName={props.appName} default="true" profile={props.profile} login={props.login}/>
        <TrendsOutput fullsize={state.fullsize} chatHidden={state.chatHidden} toggleChat={this.toggleChat} fullChat={this.fullChat} />
        <ChatBox fullsize={state.fullsize} chatHidden={state.chatHidden} toggleChat={this.toggleChat} fullChat={this.fullChat} profile={props.profile}></ChatBox>

      </AppBody>
    );
  }
}
