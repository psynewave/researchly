import React from 'react';
import Container from './chatcontainer';
import NotePad from '../notes/NotePad';
import Rebase from 're-base';
import Store from '../stores/AppStore';
import Constants from '../constants/consts';
import AppBar from '../components/appbar';
export default class ChatBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fullsize: false,
      chatHidden: false
    };
    this._init = this.init.bind(this);
  }

  init(){
    this.setState({
      apn: Store.APN()
    });
  }

  componentWillUnmount(){
  }

  componentWillMount(){
      this.init();
      Store.addChangeListener(Constants.APN_CHANGED, this._init);
  }

  render(){

    let chatLabel;
    let state = this.state;
    let props = this.props;
    let _state = props.state;
    let apn = state.apn ? state.apn : null;

    if(apn){
      chatLabel = <span id="paperLabel" className="ui">
        <i className="home icon hide"></i>
        {apn} Hub
      </span>
    } else {
      chatLabel = <span id="paperLabel" className="ui">
        <i className="users icon hide"></i>
        Community Hub
      </span>
    }

    return (
      <div id="paperChat" className={ props.fullsize ? 'grid ui stackable fullChat' : props.chatHidden ? 'grid ui stackable chatoff' : 'ui grid'}>
        <div id="chatViewAppBar" className="one wide column">
          <AppBar toggleChat={props.toggleChat} fullChat={props.fullChat} active="chat"/>
        </div>
        <div id="chatColumn" className="fifteen wide column ui grid">
          <div id="paperControls" className="row hide">
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
                {chatLabel}
                <div id="innerChatContainer" className="ui segment">
                  <Container profile={props.profile} />
                </div>
              </div>
            </div>
            <div id="noteRow" className="eight wide column chat">
              <div id="noteContainer" className="ui segments">
                <span id="paperLabel" className="ui">
                  <i className="privacy icon hide"></i>
                  Private Notes
                </span>
                <div id="innerNoteContainer" className="">
                  <NotePad profile={props.profile}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
