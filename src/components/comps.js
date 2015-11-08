import React, { Component } from 'react';
import $ from 'jquery';
import Constants from '../constants/consts';
import Store from '../stores/AppStore';
import Actions from '../actions/appActions';
import Grid from './grid';
import Modal from './modal';
import SideBySide from './sidebyside';

export default class Listings extends Component {
  constructor() {
    super();
    this.state = {
      comps:Store.Comps(),
      compDisplay: false,
      assessments:Store.Assessments(),
      compDetails:[]
    };
    this.removeComp = this.removeComp.bind(this);
    this.showComps = this.showComps.bind(this);
    this.closeComps = this.closeComps.bind(this);
    this._setComps = this.setComps.bind(this);
  }

  removeComp(e){
    let state = this.state;
    let apn = String($(e.target).data('apn'));
    let comps = Store.Comps().slice();
    comps = _.without(comps, apn);
    Actions.setComps(comps);
  }

  setComps(){
      this.setState({
         comps:Store.Comps(),
         assessments:Store.Assessments()
      });
  }

  showComps() {
    let state = this.state;
    let comps = state.comps;
    let assessments = state.assessments;
    let compDetails = [];

    _.each(comps, function(comp){
        compDetails.push(_.where(state.assessments, {'apn': comp})[0]);
    });

    this.setState({
      compDisplay: true,
      compDetails: compDetails
    });
  }

  closeComps() {
    this.setState({compDisplay: false});
  }

  componentWillMount() {
    Store.addChangeListener(Constants.COMPS_RECEIVED, this._setComps);
  }

  componentWillUnmount() {
    Store.removeChangeListener(Constants.COMPS_RECEIVED, this._setComps);
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
    let compList=[],compDetailsList=[];
    let state = this.state;
    let comps = state.comps ? state.comps : null;
    let compDetails = state.compDetails ? state.compDetails : null;

    if(comps.length) {
      let _comps;
      _comps = comps.map((c, k) => {
        let uniqueKey = _.uniqueId('comp');

        return (
            <a key={uniqueKey}  className="ui label">
              {c}
              <i className="icon close" data-apn={c} onClick={this.removeComp}></i>
            </a>
        );
      });
      compList = <div id="compList" className="ui top attached segment piled">

        <div className="ui top attached label">
          Comparables
          <i data-content="View Comps" className="copy link icon right popup" onClick={this.showComps}></i>
        </div>

        <div className="ui blue labels">
            {_comps}
        </div>

      </div>
    };
    if(compDetails){
      let columns = numeral(16 / compDetails.length).format('0');

      if( columns == 5 ){
        columns = "five wide column";
      } else {
        columns = "eight wide column"
      }

      compDetailsList = compDetails.map((c, k) => {
        let uKey = _.uniqueId('cdl');

        return (
          <SideBySide id={k} state={c} key={uKey} styles={columns}/>
        )

      });
    };

    return (
    <div>
        <div>
          {compList}
        </div>
        <Modal style='standard' size='fullscreen' isOpened={state.compDisplay} closeIcon closeOnOutsideClick onClose={this.closeComps}>
          <div className='header'>
           Side by Side
          </div>
          <div className="content">
            <Grid styles="ui stackable">
              {compDetailsList}
            </Grid>
          </div>
        </Modal>
    </div>
    );
  }
}
