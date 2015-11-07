import Constants from '../constants/consts';
import Actions from '../actions/appActions';
import Store from '../stores/AppStore';
class Trends {
    fetch(periodType,geoType,geoName,eventName){
      var results = Store.Trends(geoType,geoName);
      if(results.length>0){
          var payload = {
            eventName : eventName,
            geoType : geoType,
            geoName : geoName,
            results : results
          }
          Actions.receiveTrends(payload);
        }else{
          var filter ="%20and%20PeriodType%20eq%20%27"+periodType+"%27%20and%20GeographyType%20eq%20%27"+geoType+"%27%20and%20GeographyName%20eq%20%27"+geoName+"%27";
          $.ajax({
              url: Constants.TRENDS_URL+filter,
              dataType: "json"
          }).done(function(results){
              var payload = {
                eventName : eventName,
                geoType : geoType,
                geoName : geoName,
                results : results
              }
              Actions.receiveTrends(payload);
          });
        }
    }
}

let trendsAPI = new Trends();
export default trendsAPI;
