import React from 'react';
import Container from './Container';
import NewChat from './NewChat';
import NotePad from '../notes/NotePad';
import Rebase from 're-base';
var base = Rebase.createClass('https://researchly.firebaseio.com/');

export default class ChatBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      messages: []
    };
  }
  componentWillMount(){
  /*
   * Here we call 'bindToState', which will update
   * our local 'messages' state whenever our 'chats'
   * Firebase endpoint changes.
   */
    base.bindToState('chats', {
      context: this,
      state: 'messages',
      asArray: true
    });
  }
  render(){
    return (
      <div id="paperChat" className="ui grid">
        <div className="row">
          <div id="grabHandles" className="sixteen wide column">
          </div>
        </div>
        <div className="row">
          <div className="eight wide column">
            <div className="ui segment">
              <NewChat chats={ this.state.messages } />
              <Container />
            </div>
          </div>
          <div className="eight wide column">
            <div className="ui segment">
              <NotePad />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
