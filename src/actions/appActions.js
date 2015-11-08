import Constants from '../constants/consts';
import Dispatcher from '../dispatcher/AppDispatcher';
import Trends from '../api/trends';
import Geo from '../api/geo';
import Parcels from '../api/parcels';
import Assessments from '../api/assessments';
import Transactions from '../api/transactions';
import Store from '../stores/AppStore';

export default {
  fetchTrends(geoData, chartId) {
      Trends.fetch("Year","County",geoData.County,chartId + Constants.TREND_EVENT_COUNTY);
      Trends.fetch("Year","City",geoData.City,chartId + Constants.TREND_EVENT_CITY);
      Trends.fetch("Year","Zip",geoData.Zip,chartId + Constants.TREND_EVENT_ZIP);
  },
  fetchResults() {
    Parcels.fetch();
    Assessments.fetch();
    Transactions.fetch();
  },
  rebindPaper(payload){
    Dispatcher.dispatch({
        actionType: Constants.REBIND_PAPER,
        payload
    });
  },
  geoCode(loc){
      Geo.resolve(loc);
  },
  setLevel(payload) {
      Dispatcher.dispatch({
          actionType: Constants.NEW_LEVEL,
          payload
      });
  },
  setComps(payload){
    Dispatcher.dispatch({
        actionType: Constants.NEW_COMPS,
        payload
    });
  },
  setNotes(payload){
    Dispatcher.dispatch({
        actionType: Constants.NEW_NOTES,
        payload
    });
  },
  receiveParcels(payload) {
      Dispatcher.dispatch({
          actionType: Constants.NEW_PARCELS,
          payload
      });
  },
  receiveAssessments(payload) {
      Dispatcher.dispatch({
          actionType: Constants.NEW_ASSESSMENTS,
          payload
      });
  },
  receiveTransactions(payload) {
      Dispatcher.dispatch({
          actionType: Constants.NEW_TRANSACTIONS,
          payload
      });
  },
  receiveTrends(payload) {
      Dispatcher.dispatch({
          actionType: Constants.NEW_TRENDS,
          payload
      });
  },
  receiveGeo(payload) {
      Dispatcher.dispatch({
          actionType: Constants.NEW_LOC,
          payload
      });
  }
};
