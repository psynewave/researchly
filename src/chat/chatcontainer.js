import React from 'react';
import Rebase from 're-base';
import Message from './Message.js';
var base = Rebase.createClass('https://researchly.firebaseio.com/chat');
import Store from '../stores/AppStore';
import Constants from '../constants/consts.js';
import NewChat from './NewChat';

export default class Container extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    };
    this._init = this.init.bind(this);

  }

  chatBase(){
    let chatBase = 'ChatRoom';
    let apn = Store.APN();
    if(apn){
      chatBase = 'history/' + apn + '/comments';
    }
    return chatBase;
  }

  init(){
    if(this.ref){
       base.removeBinding(this.ref);
    }
    this.ref = base.bindToState(this.chatBase(), {
       context: this,
       state: 'messages',
       asArray: true
     });
  }

  componentWillMount(){
      this.init();
      Store.addChangeListener(Constants.APN_CHANGED, this._init);
  }

  componentWillUnmount(){
    Store.removeChangeListener(Constants.APN_CHANGED, this._init);
    if(this.ref){
      base.removeBinding(this.ref);
    }
  }


  _removeMessage(index, e){
    e.stopPropagation();
    this.state.messages.splice(index, 1);
    base.post(this.chatBase(), {
      data: this.state.messages,
      context: this,
      then: () => {
      }
    });
  }

  render(){
    var items = this.state.messages;
    let props = this.props;
    var messages = items.reverse().map( (item, index) => {
      return (
        <Message
          thread={ item }
          removeMessage={ this._removeMessage.bind(this, index) }
          key={ index } />
      );
    });

    return (
      <span id="chatRail">
      <div id="chatBody" className='ui segment'>
        <div id="chatHeader" className="ui">
          <div className="messageCount ui blue circular label hide">{ (this.state.messages.length || 0) }</div>
        </div>
        <div id="chatWindow" className="ui">
          { messages }
        </div>
      </div>
      <div id="chatInput" className="ui segment">
        <NewChat profile={props.profile} chats={ items} />
      </div>
    </span>
    );
  }
};
