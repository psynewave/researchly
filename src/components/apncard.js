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
