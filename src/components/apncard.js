import React, { Component } from 'react';
import classNames from 'classnames';
import Store from '../stores/AppStore';
import Constants from '../constants/consts';

export default class TaxItem extends React.Component {
  constructor() {
    super();
    this.state = {
      assessment:{}
    };
    this._init = this.init.bind(this);
  }

  init(){
    this.setState({
        assessment:Store.Assessment(this.props.apn)
    });
  }

  componentWillMount() {
    this.init();
    Store.addChangeListener(Constants.ASSESSMENT_RECEIVED, this._init);
  }

  componentWillUnmount() {
    Store.removeChangeListener(Constants.ASSESSMENT_RECEIVED, this._init);
  }

  render () {
    let state = this.state.assessment;
    let props = this.props;
    if(!state){
      return (<div></div>);
    }
    return (
      <div id="historyCard" className="ui segment basic taxitem no-padding-left" data-header={state.address.full} data-apn={state.apn}>
        <div className="ui fluid">
          <i className="icon plus historyAddComp floated right" data-apn={state.apn} onClick={props.selectComp}></i>
          <h4 className="ui header" onClick={props.click}>
            {state.address.full}, {state.address.state} {state.address.zip}

          </h4>
          <div className="content">
            <div className="ui cross-grid">
              <div className="ui horizontal segments">
                <div className="ui segment">
                  <div className="ui top transparent attached label centered">
                    {state.building.bedrooms}
                  </div>
                  <p></p>
                  <div className="ui bottom attached label centered">Beds</div>
                </div>
                <div className="ui segment">
                  <div className="ui top transparent attached label centered">{state.county}</div>
                  <div className="ui bottom attached label centered">County</div>
                </div>
                <div className="ui segment">
                  <div className="ui top transparent attached label centered">{numeral(state.lotSizeSquareFeet).format('0,0')}</div>
                  <div className="ui bottom attached label centered">Lot Sq Ft</div>
                </div>
                <div className="ui segment">
                  <div className="ui top transparent attached label centered">{state.building.totalRooms}</div>
                  <div className="ui bottom attached label centered">Rooms</div>
                </div>
              </div>
              <div className="ui horizontal segments">
                <div className="ui segment">
                  <div className="ui top transparent attached label centered">{state.building.baths ? state.building.baths : 0}</div>
                  <p></p>
                  <div className="ui bottom attached label centered">Baths</div>
                </div>
                <div className="ui segment">
                  <div className="ui top transparent attached label centered">{state.building.yearBuilt}</div>
                  <div className="ui bottom attached label centered">Yr Built</div>
                </div>
                <div className="ui segment">
                  <div className="ui top transparent attached label centered">{state.building.condition}</div>
                  <div className="ui bottom attached label centered">Condition</div>
                </div>
                <div className="ui segment">
                  <div className="ui top transparent attached label centered">{state.landUseCode}</div>
                  <div className="ui bottom attached label centered">Land Use</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
