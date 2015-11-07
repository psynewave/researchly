import React from 'react';
import NotesList from './NotesList';
import AddNote from './AddNote';

export default class Notes extends React.Component{
  render(){
    return (
      <div>
        <AddNote username={this.props.username} addNote={this.props.addNote} />
        <NotesList notes={this.props.notes} />
      </div>
    )
  }
};
