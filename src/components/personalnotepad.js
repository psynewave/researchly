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
import PersonalFields from './personalnotefields';

export default class PersonalNotepad extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <Grid styles="ui">
        <Column styles="sixteen">
            <Segments>
              <h5 className="ui top attached header light-grey">
                Comparable Fields
              </h5>
              <PersonalFields state={this.props.state}></PersonalFields>
            </Segments>
        </Column>
      </Grid>
    );
  }
}
