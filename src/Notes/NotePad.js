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
    this.ref = base.syncState('ash', {
      context: this,
      asArray: true,
      state: 'notes'
    })
  }

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
      <div className="ui segment">
          <Notes
            username={username}
            notes={this.state.notes}
            addNote={this.handleAddNote.bind(this)} />
      </div>
    )
  }
}
