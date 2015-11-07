import React, { Component } from 'react';
import classNames from 'classnames';

export default class TaxItem extends React.Component {
  render () {

    let props = this.props;
    let state = props.state;
    let selectedState = props.selected ? "check circle outline icon left compare" : "radio icon left compare";

    return (
      <div className="ui segment basic taxitem no-padding-left" data-header={state.address.full} data-apn={state.apn}>
        <div className="ui accordion fluid">
          <i className={selectedState} onClick={props.selectComp}></i>
          <h4 className="ui header" onClick={props.click}>
            {state.address.full}, {state.address.state} {state.address.zip}
          </h4>
          <div className="title left">
            <i className="dropdown icon"></i>
          </div>
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
