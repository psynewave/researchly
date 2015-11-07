import Constants from '../constants/consts';
import Actions from '../actions/appActions';
import Store from '../stores/AppStore';
class GeoAPI {
    resolve(loc){
      $.ajax({
          url : 'http://maps.google.com/maps/api/geocode/json',
          type : 'GET',
          data : {
              address : loc,
              sensor : false
          },
          async : false,
          success : function(result) {
              try {
                var i = result.results[0].address_components.length;
                var lat = result.results[0].geometry.location.lat;
                var lng = result.results[0].geometry.location.lng;
                var payload={
                  Zip:'',
                  City:'',
                  County:'',
                  State:''
                }; //dumb parsing code
                if(i==4){
                  payload.City = result.results[0].address_components[0].short_name;
                  payload.County = result.results[0].address_components[1].short_name.replace(' County','');
                }
                if(i==5){
                  payload.Zip = result.results[0].address_components[0].short_name;
                  payload.City = result.results[0].address_components[1].short_name;
                  payload.County = result.results[0].address_components[2].short_name.replace(' County','');
                }
                if(i==6){
                  payload.City = result.results[0].address_components[1].short_name;
                  payload.County = result.results[0].address_components[2].short_name.replace(' County','');
                  payload.Zip = result.results[0].address_components[5].short_name;
                }
                if(i==7){
                  payload.City = result.results[0].address_components[2].short_name;
                  payload.County = result.results[0].address_components[3].short_name.replace(' County','');
                  payload.Zip = result.results[0].address_components[6].short_name;
                }
                if(i==8){
                  payload.City = result.results[0].address_components[2].short_name;
                  payload.County = result.results[0].address_components[3].short_name.replace(' County','');
                  payload.Zip = result.results[0].address_components[6].short_name;
                }
                if(i==9){
                  payload.City = result.results[0].address_components[3].short_name;
                  payload.County = result.results[0].address_components[4].short_name.replace(' County','');
                  payload.Zip = result.results[0].address_components[7].short_name;
                }
                Actions.receiveGeo(payload);

              } catch(err) {
                  console.log(err);
              }
          }
      });
    }
}

let geoAPI = new GeoAPI();
export default geoAPI;
