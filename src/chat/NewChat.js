import React from 'react';
import Rebase from 're-base';
var base = Rebase.createClass('https://researchly.firebaseio.com/');

export default class NewChat extends React.Component {
  _newChat(e){
    e.preventDefault();

    /*
     * Here, we call .post on the '/chats' ref
     * of our Firebase.  This will do a one-time 'set' on
     * that ref, replacing it with the data prop in the
     * options object.
     *
     * Keeping with the immutable data paradigm in React,
     * you should never mutate, but only replace,
     * the data in your Firebase (ie, use concat
     * to return a mutated copy of your state)
    */
    let name = this.props.profile ? this.props.profile.name : 'anonymous';
    let avatar = this.props.profile ? this.props.profile.picture : '../Portal/images/alan.png';

    base.post('chats', {
      data: this.props.chats.concat([{
        name : name,
        avatar: avatar,
        title: this.refs.title.value
      }]),
      context: this,
      /*
       * This 'then' method will run after the
       * post has finished.
       */
      then: () => {
        console.log('POSTED');
      }
    });

    this.refs.title.value = '';

  }
  render(){
    return (
        <form onSubmit={ this._newChat.bind(this) }>
          <div className="ui fluid action input">
            <input ref="title" placeholder="Message" type="search" placeholder="Send" />
            <button className="ui button" type="submit">Submit</button>
          </div>
        </form>
    )
  }
};
