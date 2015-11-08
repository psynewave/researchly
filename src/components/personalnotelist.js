import React, { Component } from 'react';
import Grid from './grid';
import Column from './column';

export default class PersonalNoteList extends React.Component{
  render(){

    console.log('hello items', this.props.items);

    let listItems = this.props.items.map((item, index) => {
      let uniqueKey = _.uniqueId('note');
      return (
        <div className="ui message" key={uniqueKey}>
          <i className="play icon message-point"></i>
          <i className="play icon message-point secondary"></i>
          <i className="delete icon floated right" onClick={this.props.remove.bind(null, index)}></i>
          <div>
            {item}
          </div>
        </div>
      );
    });
    return (
      <Grid styles="ui">
        <Column id="notelist" styles="sixteen">
          {listItems}
        </Column>
      </Grid>
    );
  }
}
