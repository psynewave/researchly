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
export default class Listings extends Component {
  constructor() {
    super();
    this.state = {
      isOpened: false,
      comps:Store.Comps()
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.selectComp = this.selectComp.bind(this);
    this.removeComp = this.removeComp.bind(this);
    this._compsUpdated = this.compsUpdated.bind(this);
    this._setParcels = this.setParcels.bind(this);
    this._setAssessments = this.setAssessments.bind(this);
    this._setTransactions = this.setTransactions.bind(this);
  }

  open(e) {
    let state = this.state;
    let apn = $(e.target).parents('.taxitem').data('apn');

    let parcel = _.where(state.parcels, {'apn': apn})[0];
    let assessment = _.where(state.assessments, {'apn': apn})[0];
    let taxDetailAddress = $(e.target).parents('.taxitem').data('header');
    let transaction = _.where(state.transactions, {'apn': apn})[0];
    // let transaction = _.filter(state.transactions, function(tax) {
    //         return _.where(tax, {'apn': apn}).length > 0;
    //     })[0];

    this.setState({
      apn: apn,
      parcel: parcel,
      assessment: assessment,
      taxDetailAddress: taxDetailAddress,
      transaction: transaction,
      isOpened: true
    });
  }

  close() {
    this.setState({
      isOpened: false
    });
  }

  selectComp(e) {
    let state = this.state;
    let apn = $(e.target).parents('.taxitem').data('apn');
    let comps = Store.Comps().slice();
    let compIndex = _.indexOf(comps, apn);

    if( comps.length === 3 && compIndex < 0 ){
      this.setState({error: "Max of 3 comps allowed"});
      setTimeout(() => {
        if( this.state.error ){
          this.setState({error: null});
        }
      }, 3000)	;
      return false;
    }

    if( compIndex < 0 ){
       comps.push(apn);
       Actions.setComps(comps);
    } else {
      comps = _.without(comps, apn);
      Actions.setComps(comps);
    }
  }

  compsUpdated(){
    this.setState({
      comps: Store.Comps()
    });
  }

  removeComp(e){
    let state = this.state;
    let apn = $(e.target).data('apn');
    let comps = Store.Comps().slice();
    comps = _.without(comps, apn);
    Actions.setComps(comps);
  }

  setParcels(){
    this.setState({
      parcels: Store.Parcels()
    });
  }
  setAssessments(){
    this.setState({
      assessments: Store.Assessments()
    });
  }
  setTransactions(){
    this.setState({
      transactions: Store.Transactions()
    });
  }

  componentWillMount() {
    Store.addChangeListener(Constants.PARCELS_RECEIVED, this._setParcels);
    Store.addChangeListener(Constants.ASSESSMENTS_RECEIVED, this._setAssessments);
    Store.addChangeListener(Constants.TRANSACTIONS_RECEIVED, this._setTransactions);
    Store.addChangeListener(Constants.COMPS_RECEIVED, this._compsUpdated);
  }
  componentWillUnmount() {
    Store.removeChangeListener(Constants.PARCELS_RECEIVED, this._setParcels);
    Store.removeChangeListener(Constants.ASSESSMENTS_RECEIVED, this._setAssessments);
    Store.removeChangeListener(Constants.TRANSACTIONS_RECEIVED, this._setTransactions);
    Store.removeChangeListener(Constants.COMPS_RECEIVED, this._compsUpdated);
  }

  componentDidUpdate() {
      $('.accordion').accordion({
        selector: {
          trigger: '.title .icon'
        }
      });
      $('.popup').popup();
  }

  render() {
    let state = this.state, parcelList, assessmentList, detailItem, errorMessage;
    let assessments = state.assessments ? state.assessments : null;
    let parcels = state.parcels ? state.parcels : null;
    let details = state.parcel ? state.parcel : null;
    let assessmentDetails = state.assessment ? state.assessment : null;
    let error = state.error ? state.error : null;
    let comps = state.comps;
    if(error){
      errorMessage = <div className="ui inverted red segment">
          <p>{state.error}</p>
      </div>
    }
    if(assessments){
      assessmentList = assessments.map((i, k) => {
        let selected = false;
        let uniqueKey = _.uniqueId('tax');

        if( _.indexOf(comps, i.apn) !== -1 ){
          selected = true;
        }

        return (
          <TaxItem key={uniqueKey} state={i} selected={selected} click={this.open} selectComp={this.selectComp}/>
        );
      });
    }

    if(assessmentDetails){
      detailItem = <TaxDetails id="taxDetails" state={state.assessment} />;
    }

    return (
    <div>
        <div>
          {errorMessage}
          {assessmentList}
        </div>
        <Modal style='standard' size='fullscreen' isOpened={state.isOpened} closeIcon closeOnOutsideClick onClose={this.close}>
          <div className='header'>
           {state.taxDetailAddress}
          </div>
          <div className="content">
            {detailItem}
          </div>
        </Modal>
    </div>
    );
  }
}
