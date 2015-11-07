import Constants from '../constants/consts';
import Actions from '../actions/appActions';
import Store from '../stores/AppStore';
class Transactions {
    fetch(){
          var filter = '';
          $.ajax({
              url: Constants.TRANSACTIONS_URL+filter,
              dataType: "json"
          }).done(function(results){
              var payload = {
                results :  results.bundle
              };
              Actions.receiveTransactions(payload);
          });
    }
}
let transactionsAPI = new Transactions();
export default transactionsAPI;
