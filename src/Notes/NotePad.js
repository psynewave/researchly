import React from 'react';
import Rebase from 're-base';
var base = Rebase.createClass('https://researchly.firebaseio.com/');
import Store from '../stores/AppStore';
import Constants from '../constants/consts.js';
import Notes from './Notes';

export default class NotePad extends React.Component{
  constructor(props){
    super(props);
    this.ref=null;
    this.state = {
      notes: []
    };
    this._init = this.init.bind(this);
  }

  init(){
    if(this.ref){
       base.removeBinding(this.ref);
       this.ref=null;
    }
    if(this.props.profile){
      let noteBase = this.props.profile.clientID;
      let apn = Store.APN();
      if(apn){
        noteBase =  'history/' + apn + '/' + noteBase;
      }
      if(noteBase){
        this.ref = base.syncState(noteBase, {
          context: this,
          asArray: true,
          state: 'notes'
        });
      }
    }
  }

  componentDidMount(){
    Store.addChangeListener(Constants.APN_CHANGED, this._init);
  }
  componentWillUpdate(){
    if(!this.ref){
      this.init();
    }
  }
  componentWillUnmount(){
    Store.removeChangeListener(Constants.APN_CHANGED, this._init);
    if(this.ref){
      base.removeBinding(this.ref);
      this.ref=null;
    }
  }
  handleAddNote(newNote){
    this.setState({
      notes: this.state.notes.concat([newNote])
    })
  }
  render(){
    let props = this.props;
    return (
          <Notes
            notes={this.state.notes}
            addNote={this.handleAddNote.bind(this)} />
    )
  }
};
