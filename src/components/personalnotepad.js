//var Rebase = require('re-base');
//var base = Rebase.createClass('https://rebase-demo.firebaseio.com/todo-example');

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
import PersonalList from './personalnotelist';
import PersonalItem from './personalnoteitem';
import PersonalFields from './personalnotefields';

export default class PersonalNotepad extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list: [],
      loading: true
    }
  }
  componentDidMount(){
    /*this.ref = base.syncState('todoList', {
      context: this,
      state: 'list',
      asArray: true,
      then(){
        this.setState({loading: false})
      }
    });
    */
    this.setState({
      loading: false
    });
  }
  componentWillMount() {
    this.setState({
      list: Store.Notes()
    })
  }
  componentWillUnmount(){
    //base.removeBinding(this.ref);
  }
  handleAddItem(newItem){
    this.setState({
      list: this.state.list.concat([newItem])
    });
  }
  handleRemoveItem(index){
    var newList = this.state.list;
    newList.splice(index, 1);
    this.setState({
      list: newList
    });
  }
  render(){

    return (
      <Grid styles="ui">
        <Column styles="sixteen">
          <Segments>
            <h5 className="ui top attached header light-grey">
              Notepad
            </h5>
            <Segment>
              <PersonalItem add={this.handleAddItem.bind(this)}/>

            </Segment>

            <Segment styles="basic">
              {this.state.loading === true ? <h3> add a note... </h3> : <PersonalList items={this.state.list} remove={this.handleRemoveItem.bind(this)}/>}
            </Segment>

          </Segments>
        </Column>
        <Column styles="sixteen">
            <Segments>
              <h5 className="ui top attached header light-grey">
                Comp Fields
              </h5>
              <PersonalFields state={this.props.state}></PersonalFields>
            </Segments>
        </Column>
      </Grid>
    );
  }
}
