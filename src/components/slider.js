import React, { Component } from 'react';
import Store from '../stores/AppStore';
import Actions from '../actions/appActions';
import Segment from './segment';
import Segments from './segments';

export default class Trends extends React.Component {
  constructor() {
    super();
    this.state = {
      level: Store.Level()
    }
    this.drillDown = this.drillDown.bind(this);
    this.drillButton = this.drillButton.bind(this);
  }

  drillDown(e){
    var level = this.refs.drillLevel.value;
    Actions.setLevel(level);
    this.setState({
      level: level
    });
  }

  drillButton(e){
    var level = $(e.target).data('level');
    Actions.setLevel(level);
    this.setState({
      level: level
    });
  }

  componentWillMount() {
  }

  render () {
    let props = this.props;
    let state = this.state;
    let labelCounty = null,
        labelCity = null,
        labelZip = null;

    labelCounty = <div className="ui primary label" data-level="3" onClick={this.drillButton}>
      county
    </div>;
    if(state.level>1){
       labelCity = <div className="ui secondary label" data-level="1" onClick={this.drillButton}>
         city
       </div>
    }
    if(state.level>2){
      labelZip = <div className="ui tertiary label" data-level="2" onClick={this.drillButton}>
        zip
      </div>
    }
    return (
        <div className="ui slider range">
          <Segments styles="clear basic">
            <Segment styles="hide basic left floated no-padding-left no-padding-bottom">
              <input id="drillLevel" ref="drillLevel" type="range" min="1" max="3" defaultValue={state.level} onChange={this.drillDown} />
            </Segment>
            <Segment styles="basic right floated no-padding-right no-margin-right no-padding-bottom">
              <h4 id="slider-header" className="ui left floated aligned header">
                Dimensions
              </h4>
              {labelCounty}
              {labelCity}
              {labelZip}
            </Segment>
          </Segments>

        </div>
    );
  }
}
