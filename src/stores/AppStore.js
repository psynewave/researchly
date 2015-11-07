import {EventEmitter} from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/consts.js';
import Dispatcher from '../dispatcher/AppDispatcher';

let _geo_data = {
  'County' : null,
  'City' : null,
  'Zip' : null
};
let _comps = [];
let _notes = [];
let _assessments = [];
let _transactions = [];
let _parcels = [];
let _trends = [];
let _level = 3;
export default class BaseStore extends EventEmitter {
    constructor() {
        super();
    }

    emitChange(te) {
        this.emit(te);
    }

    addChangeListener(te, cb) {
        this.on(te, cb)
    }

    removeChangeListener(te, cb) {
        this.removeListener(te, cb);
    }

    GeoData(){
      return _geo_data;
    }

    Parcels(){
      return _parcels;
    }

    Assessments(){
      return _assessments;
    }

    Transactions(){
      return _transactions;
    }

    Trends(geoType,geoName){
        if(!geoName){
          geoName=_geo_data[geoType];
        }
        var data = _.where(_trends, {
          'geoType': geoType,
          'geoName': geoName
        });
        if(data.length>0){
          return data[0].results.value;
        }
        return [];
    }

    Comps(){
      return _comps;
    }

    Notes(){
      return _notes;
    }

    Level(){
      return _level;
    }
}

let AppStore = new BaseStore();

Dispatcher.register(action => {
    switch(action.actionType) {
        case Constants.NEW_TRENDS:
            if(AppStore.Trends(action.payload.geoType,action.payload.geoName).length==0){
              action.payload.results.value.reverse();
              _trends.push(action.payload);
            }
            AppStore.emitChange(action.payload.eventName);
            break;
        case Constants.NEW_LOC:
            _geo_data=action.payload;
            AppStore.emitChange(Constants.NEW_LOC);
            break;
        case Constants.NEW_LEVEL:
            _level=action.payload;
            AppStore.emitChange(Constants.NEW_LEVEL);
            break;
        case Constants.NEW_PARCELS:
            _parcels=action.payload.results;
            AppStore.emitChange(Constants.PARCELS_RECEIVED);
            break;
        case Constants.NEW_ASSESSMENTS:
            _assessments=action.payload.results;
            AppStore.emitChange(Constants.ASSESSMENTS_RECEIVED);
            break;
        case Constants.NEW_TRANSACTIONS:
            _transactions=action.payload.results;
            AppStore.emitChange(Constants.TRANSACTIONS_RECEIVED);
            break;
        case Constants.NEW_COMPS:
            _comps=action.payload;
            AppStore.emitChange(Constants.COMPS_RECEIVED);
            break;
        case Constants.NEW_NOTES:
            _notes=action.payload;
            AppStore.emitChange(Constants.NOTES_RECEIVED);
            break;            
        default:
            // no op
    }
});
export default AppStore;
