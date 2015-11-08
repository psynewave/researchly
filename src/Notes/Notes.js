import React from 'react';
import NotesList from './NotesList';
import AddNote from './AddNote';

export default class Notes extends React.Component{
  render(){
    let props = this.props;
    return (
      <div>
        <AddNote addNote={this.props.addNote} />
        <NotesList notes={this.props.notes} />
      </div>
    )
  }
};
