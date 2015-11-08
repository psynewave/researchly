import React from 'react';
import Notes from './Notes';
import Rebase from 're-base';
var base = Rebase.createClass('https://researchly.firebaseio.com/');

export default class NotePad extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      notes: []
    };
  }
  init(){
    if(this.props.profile){
      let noteBase = this.props.profile.name;
      if(this.props.apn){
        noteBase =  'history/' + this.props.apn + '/' + nodeBase;
      }
      console.log(noteBase);
      if(noteBase){
        this.ref = base.syncState(noteBase, {
          context: this,
          asArray: true,
          state: 'notes'
        });
      }
    }
  }

  componentWillMount(){
  }
  componentDidMount(){
    this.init();
  }
  componentWillUnmount(){
    if(this.ref){
      base.removeBinding(this.ref);
    }
  }
  componentWillReceiveProps(){
    if(this.ref){
      base.removeBinding(this.ref);
    }
    this.init();
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
