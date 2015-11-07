import Constants from '../constants/consts';
import Actions from '../actions/appActions';
import Store from '../stores/AppStore';
class Parcels {
    fetch(){
          var filter = '';
          $.ajax({
              url: Constants.PARCELS_URL+filter,
              dataType: "json"
          }).done(function(results){
              var payload = {
                results :  results.bundle
              };
              Actions.receiveParcels(payload);
          });
    }
}
let parcelsAPI = new Parcels();
export default parcelsAPI;
