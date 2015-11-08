import React from 'react';

export default class NotesList extends React.Component{
  render(){
    var notes = this.props.notes.map((note, index) => {
      return <li className="list-group-item" key={index}> {note} </li>
    });
    return (
      <div id="noteBody" className='ui segment'>
        <div id="noteHeader" className="ui">
          <div className="messageCount ui purple circular label">{ (notes.length || 0) }</div>
        </div>
        <div id="noteWindow" className="ui">
          {notes}
        </div>
      </div>
    )
  }
};
