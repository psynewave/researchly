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

export default class PersonalNotefields extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      notes: []
    }
    this._addNote = this.addNote.bind(this);
    this._removeNote = this.removeNote.bind(this);
  }

  init() {
    let apn = this.props.state.apn;
    console.log(apn);
    let notes = Store.Notes().slice();
    let noteIndex = _.findLastIndex(notes, {'apn':apn});
    if( noteIndex >= 0 ){
      this.setState({
        notes:notes[noteIndex].items
      });
    }
  }

  componentWillMount(){
      this.init();
  }

  addNote(e) {
    let apn = this.props.state.apn;
    let label = $(e.target).text();
    let note = {
      label: label,
      text:this.props.state[label]
    };

    let notes = Store.Notes().slice();
    let noteIndex = _.findLastIndex(notes, {'apn':apn});
    if( noteIndex < 0 ){
       notes.push({
         apn:apn,
         items:[]
       });
       noteIndex = notes.length-1;
    }
    let apnNotes = notes[noteIndex];
    let labelIndex = _.findLastIndex(apnNotes.items,{'label':note.label});

    if(labelIndex < 0){
      apnNotes.items.push(note);
    }else{
      apnNotes.items[labelIndex] = note;
    }

    Actions.setNotes(notes);
    this.setState({
      notes:apnNotes.items
    });
  }

  removeNote(e){
    let apn = this.props.state.apn;
    let notes = Store.Notes().slice();
    let noteIndex = _.findLastIndex(notes, {'apn':apn});
    let note = notes[noteIndex];
    let items = note.items;
    let _noteKey = $(e.target).data('noteid');
    let itemlist = _.reject(items, function(item){
          return item.label == _noteKey;
        });

    notes[noteIndex].items = itemlist;

    Actions.setNotes(notes);

    if(itemlist < 1){
      itemlist = null;
    }
    this.setState({
      notes:itemlist
    });
  }

  render () {
    let noteItemList;
    let click = this._addNote;
    let fields = this.props.state;
    let comp_fields = this.state.notes;
    let notes =[];
    if(comp_fields.length > 0 ){
      notes = comp_fields.map((k) => {
        let uniqueKey = _.uniqueId('comp_fields');
        return (
          <div className="ui segment secondary" key={uniqueKey}>
            <i className="delete icon something floated right" data-noteid={k.label} onClick={this._removeNote}></i>
            <h5 className="no-margin-top">{k.label}</h5>{k.text}
          </div>
        )
      });

      noteItemList = <Segments id="noteItemList">
        {notes}
      </Segments>
    } else {
      noteItemList = null;
    }
    let empty_fields = _.where(fields, {text: null});

    let record = Object.keys(fields).map((k) => {
      let _class = "label tag ui orange";

      if( _.where(comp_fields, {label: k}).length > 0 ||
          fields[k]==null){
        _class += " hide";
      }

      return (
        <div key={k} onClick={click} className={_class}>
          <div className="content">
            {k}
          </div>
        </div>
      )
    });
    return (
        <Grid styles="ui">
          <Column styles="sixteen">
            <Segments>
              <Segment>
                <div className="ui relaxed divided list">
                  {record}
                </div>
              </Segment>
              {noteItemList}
            </Segments>
          </Column>
        </Grid>
    );
  }
}
