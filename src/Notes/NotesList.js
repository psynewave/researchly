import React from 'react';

export default class NotesList extends React.Component{
  render(){
    var notes = this.props.notes.map((note, index) => {
      return <li className="list-group-item" key={index}> {note} </li>
    });
    return (
      <div className='ui comments'>
        <h3 className="ui dividing header">Notes ({ (notes.length || 0) })</h3>
        <ul className="list-group">
          {notes}
        </ul>
      </div>
    )
  }
};
