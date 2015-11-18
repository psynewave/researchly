import React, { Component } from 'react';
import Constants from '../constants/consts';
import 'imports?$=jquery,jQuery=jquery!../../css/slick/slick.min.js';
import ListingChatCard from './listingchatcard';
import ComingSoonChatCard from './cschatcard';
import ApnChatCard from './apnchatcard';
import TrendChatCard from './trendchatcard';

export default class Message extends React.Component {
  render(){
    let props = this.props;

    let message =  props.thread.title;

    if( message.match(/#ml(\d{8,})/ig) ){
      message = <ListingChatCard />
    } else if( message.match(/\#apn[\S]+/ig) ){
      message = <ApnChatCard />
    } else if( message.match(/\#trends[\S]+/ig) ){
      let zipcode = message.match(/\#trends[\S]+/ig)[0].split('#trends')[1];
      let uniqueKey = _.uniqueId('tr');
      let id = `${zipcode}-${uniqueKey}`;
      message = <TrendChatCard id={id} zipcode={zipcode} />
    }

    return (
      <div className='comment'>
              <img className="ui avatar image" src={props.thread.avatar} alt={props.thread.name} />
              <div className="ui segment left pointing label">
                <i onClick={ props.removeMessage.bind(null) } className="close icon hide"></i>
                {message}
             </div>
      </div>
    );
  }
}
