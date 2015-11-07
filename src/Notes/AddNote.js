import React from 'react';
export default class AddNote extends React.Component{
  handleSubmit(e){
    e.preventDefault();

    var newNote =  this.refs.note.value;
    this.props.addNote(newNote);
    this.refs.note.value = '';
  }
  render(){
    return (
      <form onSubmit={ this.handleSubmit.bind(this) }>
        <div className="ui fluid action input">
          <input ref="note" placeholder="Message" type="search" placeholder="Add New Note..." />
          <button className="ui button" type="submit">Submit</button>
        </div>
    </form>
    )
  }
};
