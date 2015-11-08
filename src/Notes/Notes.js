import React from 'react';
import NotesList from './NotesList';
import AddNote from './AddNote';

export default class Notes extends React.Component{
  render(){
    let props = this.props;
    return (
      <div id="noteWindow">
        <NotesList notes={this.props.notes} />
        <div id="noteInput" className="ui segment">
          <AddNote addNote={this.props.addNote} />
        </div>
      </div>
    )
  }
};
