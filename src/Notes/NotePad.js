import React from 'react';
import Notes from './Notes';
import Rebase from 're-base';
var base = Rebase.createClass('https://researchly.firebaseio.com/');
import Store from '../stores/AppStore';
import Constants from '../constants/consts.js';

export default class NotePad extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      notes: []
    };
    this._init = this.init.bind(this);
  }

  init(){
    if(this.ref){
       base.removeBinding(this.ref);
    }

    if(this.props.profile){
      let noteBase = this.props.profile.name;
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
    this.init();
    Store.addChangeListener(Constants.APN_CHANGED, this._init);
  }
  componentWillUpdate(){
  }
  componentWillUnmount(){
    Store.removeChangeListener(Constants.APN_CHANGED, this._init);
    if(this.ref){
      base.removeBinding(this.ref);
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
