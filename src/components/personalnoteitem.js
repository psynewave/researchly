import React, { Component } from 'react';
export default class PesronalNoteItem extends React.Component{
  handleSubmit(e){
    if(e.keyCode === 13){
      this.props.add(this.refs.newItem.value);
      this.refs.newItem.value = '';
    }
  }
  render(){
    return (
      <div className="ui fluid icon input">
        <input ref="newItem" type="text" placeholder="new note..."  onKeyDown={this.handleSubmit.bind(this)} />
        <i className="users icon"></i>
      </div>
    )
  }
}
