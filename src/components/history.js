import React, { Component } from 'react';
import $ from 'jquery';
import 'imports?$=jquery,jQuery=jquery!../../css/semantic/semantic.min.js';
import Constants from '../constants/consts';
import Store from '../stores/AppStore';
import Actions from '../actions/appActions';
import Modal from './modal';
import TaxItem from './taxitem';
import TaxDetails from './taxdetails';
import Grid from './grid';
import Rebase from 're-base';
var base = Rebase.createClass('https://researchly.firebaseio.com/');
import APNCard from './apncard';
export default class Listings extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      apn:null
    };
    this._selectComp = this.selectComp.bind(this);
    this._showCard = this.showCard.bind(this);

  }

  init(){
      let noteBase = 'history';
      this.ref = base.syncState(noteBase, {
          context: this,
          asArray: true,
          state: 'items'
      });
  }

  showCard(e){
    let apn = $(e.target).parents('.history.item').data('apn');
    let props = this.props;

    this.apn = apn;
    this.setState({
      apn:apn
    });
    Actions.fetchByAPN(apn);
    props.historyOpen();
  }

  selectComp(e) {
    let apn = String($(e.target).data('apn'));
    let comps = Store.Comps().slice();
    let compIndex = _.indexOf(comps, apn);

    if( compIndex < 0 ){
       comps.push(apn);
       Actions.setComps(comps);
    } else {
      comps = _.without(comps, apn);
      Actions.setComps(comps);
    }
  }
  componentWillMount(){
  }
  componentDidMount(){
    this.init();
  }
  componentWillUnmount(){
    if(this.ref){
      base.removeBinding(this.ref);
    }
  }
  componentWillReceiveProps(){
    if(this.ref){
      base.removeBinding(this.ref);
    }
    this.init();
  }


  render() {
    let comps = Store.Comps();
    let props = this.props;
    let history = this.state.items;
    let apn =this.apn;
    let list = [];
    if(history){
      list = Object.keys(history).map((i) => {
        let selected = false;
        let uniqueKey = _.uniqueId('tax');
        let apn = history[i].key;
        if( _.indexOf(comps, apn) !== -1 ){
          selected = true;
        }
        return (
            <div className="history item" key={uniqueKey} data-apn={apn} onClick={this._showCard}>
             <div className="historyLabel"><i className="icon eye open"></i> {apn}</div>
            </div>
        );
      });
    }

    return (
          <div id="historyPortal">
            {list}
            <APNCard click={props.click} apn={apn} selectComp={this._selectComp}/>
          </div>
    );
  }
}
