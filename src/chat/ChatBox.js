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
      messages: [],
      fullsize: false
    };
    this.fullChat = this.fullChat.bind(this);
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

  componentDidMount(){
    // damn thing is reversed too much of PITA for the hackathon will rework later
    // $('#paperChat').resizable({
    //     handles: {
    //         "n s": $("#customResizableHandle"),
    //     },
    //     grid: [10000, 1]
    // });
  }

  fullChat(){
    let state = this.state;
    console.log('it');
    this.setState({
      fullsize: state.fullsize ? false : true
    });
  }

  render(){
    let state = this.state;
    let props = this.props;
    return (
      <div id="paperChat" className={ state.fullsize ? 'ui grid fullChat' : 'ui grid'}>
        <div className="row">
          <div id="grabHandles" className="sixteen wide column">
            <div id="grabBar" className="ui horizontal segments basic aligned center no-border-radius">
              <div className="ui segment basic">
                <p></p>
              </div>
              <div id="customResizableHandle" className="ui segment basic aligned center">
                <p><i className="ellipsis horizontal icon" onClick={this.fullChat}></i></p>
              </div>
              <div className="ui segment basic">
                <p></p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="eight wide column">
            <div className="ui segment">
              <NewChat profile={props.profile} chats={ this.state.messages } />
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
