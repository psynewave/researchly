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

export default class Listings extends Component {
  constructor() {
    super();

    this.state = {
      items: []
    };
    this.selectComp = this.selectComp.bind(this);
  }

  init(){
      let noteBase = 'history';
      this.ref = base.syncState(noteBase, {
          context: this,
          asArray: true,
          state: 'items'
      });
  }

  selectComp(e) {
    let apn = String($(e.target).data('apn'));
    Actions.fetchByAPN(apn);
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

  componentDidUpdate() {
      $('.accordion').accordion({
        selector: {
          trigger: '.title .icon'
        }
      });
      $('.popup').popup();
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
    let history = this.state.items;
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
            <a key={uniqueKey}  className="ui label">
              {apn}
               <i className="icon plus" data-apn={apn} onClick={this.selectComp}></i>
            </a>
        );
      });
    }

    return (
          <div id="assessmentList">
            {list}
          </div>
    );
  }
}
