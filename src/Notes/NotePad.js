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
    let props = this.props;
    console.log(this.props);

    return (
          <Notes
            profile={props.profile}
            notes={this.state.notes}
            addNote={this.handleAddNote.bind(this)} />
    )
  }
};
