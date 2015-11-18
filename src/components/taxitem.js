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
          <h5 className="ui sub header">
            {state.apn}
          </h5>
          <div className="title left">
            <i className="plus orange icon"></i>
          </div>
          <div className="content">
            <table className="ui fixed single striped line celled table center aligned">
              <tbody>
                <tr>
                  <td>{state.building.bedrooms ? state.building.bedrooms : 0}</td>
                  <td>{state.county ? state.county : 'unk'}</td>
                  <td>{numeral(state.lotSizeSquareFeet).format('0,0')}</td>
                  <td>{state.building.condition ? state.building.condition : 'unk'}</td>
                </tr>
                <tr>
                  <td>Beds</td>
                  <td>County</td>
                  <td>Lot Sq Ft</td>
                  <td>Condition</td>
                </tr>
                <tr>
                  <td>{state.building.totalRooms ? state.building.totalRooms : 0}</td>
                  <td>{state.building.baths ? state.building.baths : 0}</td>
                  <td>{state.building.yearBuilt ? state.building.yearBuilt : 'unk'}</td>
                  <td>{state.landUseCode ? state.landUseCode : 'unk'}</td>
                </tr>
                <tr>
                  <td>Rooms</td>
                  <td>Baths</td>
                  <td>Yr Built</td>
                  <td>Land Use</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
