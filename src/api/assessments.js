import Constants from '../constants/consts';
import Actions from '../actions/appActions';
import Store from '../stores/AppStore';
class Assessments {
    fetch(){
          var geo = Store.GeoData();
          var filter = '';
          if(geo.Loc){
            if(geo.Loc.length>15){
                filter = '&address.full='+geo.Loc;
            }else{
              if(geo.Zip){
                filter ='&address.zip=' + geo.Zip;
              }else{
                  filter = '&county=' + geo.County + '&address.city='+ geo.City;
              }
            }
          }
          $.ajax({
              url: Constants.ASSESSMENTS_URL + filter,
              dataType: "json"
          }).done(function(results){
              var payload = {
                results : results.bundle
              };
              Actions.receiveAssessments(payload);
          });
    }
    fetchParcel(apn){
          var filter = '&apn='+apn;
          $.ajax({
              url: Constants.ASSESSMENTS_URL + filter,
              dataType: "json"
          }).done(function(results){
              var payload = {
                results : results.bundle
              };
              Actions.receiveAssessment(payload);
          });
    }
}
let assessmentsAPI = new Assessments();
export default assessmentsAPI;
