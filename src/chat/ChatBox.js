import React from 'react';
import Container from './chatcontainer';
import NotePad from '../notes/NotePad';
import Rebase from 're-base';
import Store from '../stores/AppStore';
import Constants from '../constants/consts.js';
export default class ChatBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fullsize: false,
      chatHidden: false,
    };
  }
  componentWillMount(){
  }
  componentWillUnmount(){
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

  render(){
    let state = this.state;
    let props = this.props;
    let _state = props.state;
    return (
      <div id="paperChat" className={ props.fullsize ? 'ui grid fullChat' : props.chatHidden ? 'chatoff' : 'ui grid'}>
        <div id="paperControls" className="row">
          <div id="grabHandles" className="sixteen wide column">
            <div id="grabBar" className="ui horizontal segments basic aligned center no-border-radius">
              <div className="ui segment basic">
                <p></p>
              </div>
              <div id="customResizableHandle" className="ui segment basic aligned center">
                <p><i className="ellipsis horizontal icon" onClick={props.fullChat}></i></p>
              </div>
              <div className="ui segment basic aligned right">
                <p><i className={ props.chatHidden ? "caret up icon" : "caret down icon"} onClick={props.toggleChat}></i></p>
              </div>
            </div>
          </div>
        </div>
        <div id="chatPortal" className="row">
          <div id="chatRow" className="eight wide column chat">
            <div id="chatContainer" className="ui segments">
              <div id="innerChatContainer" className="ui segment">
                <span id="paperLabel" className="ui blue ribbon label">
                  <i className="users icon"></i>
                  Community
                </span>
                <Container profile={props.profile} />
              </div>
            </div>
          </div>
          <div id="noteRow" className="eight wide column chat">
            <div id="noteContainer" className="ui segments">
              <div id="innerNoteContainer" className="">
                <NotePad profile={props.profile}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
