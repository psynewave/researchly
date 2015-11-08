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
      messages: [],
      show: null
    };
    this._init = this.init.bind(this);

  }
  init(){
    if(this.ref){
       base.removeBinding(this.ref);
    }
    let chatBase = 'ChatRoom';
    let apn = Store.APN();
    if(apn){
      chatBase = 'history/' + apn + '/comments';
    }
    this.ref = base.bindToState(chatBase, {
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
    var arr = this.state.messages.concat([]);
    arr.splice(index, 1);
    this.setState({
      messages: arr,
      show: null
    });
  }

  _toggleView(index){
    this.setState({
      show: index
    });
  }

  render(){
    var items = this.state.messages;
    let props = this.props;
    var messages = items.reverse().map( (item, index) => {
      return (
        <Message
          thread={ item }
          show={ this.state.show === index }
          removeMessage={ this._removeMessage.bind(this, index) }
          handleClick={ this._toggleView.bind(this, index) }
          key={ index } />
      );
    });

    return (
      <span>
      <div id="chatBody" className='ui segment'>
        <div id="chatHeader" className="ui">
          <div className="messageCount ui blue circular label">{ (this.state.messages.length || 0) }</div>
        </div>
        <div id="chatWindow" className="ui">
          { messages }
        </div>
      </div>
      <div className="ui segment">
        <NewChat profile={props.profile} chats={ items} />
      </div>
    </span>
    );
  }
};
