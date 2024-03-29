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
import Comps from './comps';
import AppBar from './appbar.js';
import History from './history';

export default class Listings extends Component {
  constructor() {
    super();
    this.state = {
      isOpened: false,
      comps:Store.Comps(),
      historyOpen: false
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.selectComp = this.selectComp.bind(this);
    this.removeComp = this.removeComp.bind(this);
    this._compsUpdated = this.compsUpdated.bind(this);
    this._setParcels = this.setParcels.bind(this);
    this._setAssessments = this.setAssessments.bind(this);
    this._setTransactions = this.setTransactions.bind(this);
    this.historyOpen = this.historyOpen.bind(this);
    this.historyClosed = this.historyClosed.bind(this);
  }

  open(e) {
    let props = this.props;
    let state = this.state;
    let apn = String($(e.target).parents('.taxitem').data('apn'));

    let parcel = _.where(state.parcels, {'apn': apn})[0];
    let assessment = Store.Assessment(apn);
    let taxDetailAddress = $(e.target).parents('.taxitem').data('header');
    let transaction = _.where(state.transactions, {'apn': apn})[0];

    Actions.rebindPaper(apn);
    this.setState({
      apn: apn,
      parcel: parcel,
      assessment: assessment,
      taxDetailAddress: taxDetailAddress,
      transaction: transaction,
      isOpened: true
    });

    if(!props.chatHidden){
      props.toggleChat();
    }

  }

  close() {
    Actions.rebindPaper(null);
    this.setState({
      isOpened: false
    });
  }

  historyOpen(){
    this.setState({
      historyOpen: true
    });
  }

  historyClosed(){
    //console.log('close');
    this.setState({
      historyOpen: false
    });
  }

  selectComp(e) {
    let state = this.state;
    let apn = String($(e.target).parents('.taxitem').data('apn'));
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
    let props = this.props;
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
      detailItem = <TaxDetails id="taxDetails" state={state.assessment} toggleChat={this.close} fullChat={props.fullChat} />;
    }

    return (
    <div>
        <div>
          <div id="assessmentErrors">
            {errorMessage}
          </div>

          <div id="historyList" className={state.historyOpen ? "historyOpen" : ""}>
            <div id="historyOuterContainer" className="ui text menu">
              <div id="historyInnerContainer" className="ui left dropdown item">
                <i className="star right blue icon"></i>
                <div id="historyMenu" className="menu">
                  <i id="dismissHistory" className="close icon" onClick={this.historyClosed}></i>
                  <History historyOpen={this.historyOpen} click={this.open} />
                </div>
              </div>
            </div>
          </div>

          <Comps />

          <div id="assessmentList">
            {assessmentList}
          </div>

        </div>
        <Modal style='standard' size='fullscreen' isOpened={state.isOpened} closeIcon onClose={this.close}>
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
