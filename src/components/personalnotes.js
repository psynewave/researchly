import React, { Component } from 'react';
import classNames from 'classnames';
import Grid from './grid';
import Column from './column';
import Segment from './segment';
import Segments from './segments';
import CrossGrid from './crossgrid';
import 'imports?$=jquery,jQuery=jquery!../../css/semantic/semantic.min.js';
import Store from '../stores/AppStore';
import Actions from '../actions/appActions';

export default class PersonalNotes extends React.Component {
  constructor() {
    super();
    this.state={
      notes:[]
    }
  }

  getNotes() {
    let apn = this.props.apn;
    let notes = Store.Notes().slice();
    let noteIndex = _.findLastIndex(notes, {'apn':apn});
    if( noteIndex >= 0 ){
         this.state.notes = notes[noteIndex].items;
    }
  }

  componentWillMount(){
      this.getNotes();
  }
  render () {
    let notes = this.state.notes.map((k) => {
      return (
        <Segment key={k.label}>
          <h5>{k.label}</h5>{k.text}
        </Segment>
      )
    });
    return (
        <Grid styles="ui">
          <Column styles="sixteen">
            <Segments>
              <h5 className="ui top attached header light-grey">
                Notes:
              </h5>
              {notes}
            </Segments>
          </Column>
        </Grid>
    );
  }
}
