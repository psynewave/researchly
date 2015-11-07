import React from 'react';
import Notes from './Notes';
import Rebase from 're-base';
var base = Rebase.createClass('https://github-note-taker.firebaseio.com/');

export default class NotePad extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      notes: [],
      bio: {},
      repos: []
    };
  }
  init(){
    this.ref = base.syncState(this.router.getCurrentParams().username, {
      context: this,
      asArray: true,
      state: 'notes'
    });

  componentWillMount(){
  }
  componentDidMount(){
    this.init();
  }
  componentWillUnmount(){
    base.removeBinding(this.ref);
  }
  componentWillReceiveProps(){
    base.removeBinding(this.ref);
    this.init();
  }
  handleAddNote(newNote){
    this.setState({
      notes: this.state.notes.concat([newNote])
    })
  }
  render(){
    var username = 'ash';
    return (
          <Notes
            username={username}
            notes={this.state.notes}
            addNote={this.handleAddNote.bind(this)} />
    )
  }
}
