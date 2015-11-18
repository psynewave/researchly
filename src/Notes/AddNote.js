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
          <div className="ui fluid left icon right action input">
            <input className="no-border-radius" ref="note" type="search" placeholder="Write a private note..." />
            <i className="lock icon"></i>
            <button className="ui button light-orange no-border-radius chatbutton" type="submit">SUBMIT</button>
          </div>
      </form>
    )
  }
};
