import Constants from '../constants/consts';
import Actions from '../actions/appActions';
import Store from '../stores/AppStore';
class Assessments {
    fetch(){
          var filter = '';
          $.ajax({
              url: Constants.ASSESSMENTS_URL+filter,
              dataType: "json"
          }).done(function(results){
              var payload = {
                results : results.bundle
              };
              Actions.receiveAssessments(payload);
          });
    }
}
let assessmentsAPI = new Assessments();
export default assessmentsAPI;
