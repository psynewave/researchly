import React from 'react';
import Rebase from 're-base';
var base = Rebase.createClass('https://researchly.firebaseio.com/');
import Store from '../stores/AppStore';

export default class NewChat extends React.Component {
  _newChat(e){
    e.preventDefault();
    let name = this.props.profile ? this.props.profile.name : 'anonymous';
    let avatar = this.props.profile ? this.props.profile.picture : '../Portal/images/alan.png';

    let chatBase = 'ChatRoom';
    let apn = Store.APN();
    if(apn){
      chatBase = 'history/' + apn + '/comments';
    }

    base.post(chatBase, {
      data: this.props.chats.concat([{
        name : name,
        avatar: avatar,
        title: this.refs.title.value
      }]),
      context: this,
      then: () => {
      }
    });
    this.refs.title.value = '';
  }
  render(){
    return (
        <form onSubmit={ this._newChat.bind(this) }>
          <div className="ui fluid action input">
            <input ref="title" placeholder="Message" type="search" placeholder="Send" />
            <button className="ui button primary" type="submit">Submit</button>
          </div>
        </form>
    )
  }
};
