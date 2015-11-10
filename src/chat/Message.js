import React  from 'react/addons';
import Parser from 'simple-text-parser';
import Constants from '../constants/consts';

export default class Message extends React.Component {
  render(){
    let props = this.props;
    var p = new Parser();
    p.addRule(/\#mls[\S]+/ig, function(tag) {
          //let mlsUrl = `https://rets.io/api/v1/armls/listings/${tag.split('#mls')[1]}?access_token=43224a475a157d1286c4b16dc75d5a7c`;
          let mlsUrl = `${Constants.LISTINGS_URL}${tag.split('#mls')[1]}?access_token=43224a475a157d1286c4b16dc75d5a7c`;
          $.getJSON( mlsUrl )
            .done(function( json ) {
              $(tag).html(`
                <div class="listing ui card full">
                  <div class="image">
                    <img src="${json.bundle.media[0].url}">
                  </div>
                  <div class="content">
                    <a class="header">${json.bundle.address} - ${numeral(json.bundle.price).format('$0,0')}</a>
                    <div class="description">
                        <h5 class="header metadata">
                          <span>
                            Beds - ${json.bundle.bedrooms}
                          </span>
                          <span>
                            Baths - ${json.bundle.baths}
                          </span>
                        </h5>
                        ${json.bundle.publicRemarks}
                    </div>

                  </div>
                  <div class="extra content">
                    <img class="logo left" src="./Portal/images/retsly-logo.png" width="80px"/>
                    <img class="logo right" src="./Portal/images/armls-logo.gif" width="80px"/>
                </div>
              </div>
              <div class="ui items listing tiny">
                <div class="item">
                  <div class="ui small image">
                    <img src="${json.bundle.media[0].url}">
                  </div>
                  <div class="content">
                    <div class="header">${json.bundle.address}</div>
                    <div class="meta">
                      <span class="price">${numeral(json.bundle.price).format('$0,0')}</span>
                      <span class="stay">${json.bundle.bedrooms} bds ${json.bundle.baths} bths</span>
                    </div>
                    <div class="description">
                      <br />
                      <img class="logo left" src="./Portal/images/retsly-logo.png" width="80px"/>
                      <img class="logo right" src="./Portal/images/armls-logo.gif" width="80px"/>
                  </div>
                  </div>
                </div>
                `);
            })
            .fail(function( jqxhr, textStatus, error ) {
              var err = textStatus + ", " + error;
              console.log( "Request Failed: " + err );
          });
        return `<span id="${tag.substr(1)}">${tag.substr(1)}</span>`;
    });

    p.addRule(/\#apn[\S]+/ig, function(tag) {
        //let apnUrl = `https://rets.io/api/v1/pub/parcels?access_token=43224a475a157d1286c4b16dc75d5a7c&limit=10&apn=${tag.split('#apn')[1]}`;
        let apn = tag.split('#apn')[1];
        let apnUrl = Constants.PARCELS_URL;
          $.getJSON( apnUrl )
            .done(function( json ) {
              $(tag).html(`
                <div class="apnTable">
                  <table class="ui fixed single striped line celled table center aligned">
                    <thead>
                      <tr><th class="aligned left" colspan="4">
                        ${json.bundle[0].apn}
                      </th>
                    </tr></thead>
                    <tbody>
                      <tr>
                        <td>${json.bundle[0].building.bedrooms}</td>
                        <td>${json.bundle[0].county}</td>
                        <td>${numeral(json.bundle[0].lotSizeSquareFeet).format('0,0')}</td>
                        <td>${json.bundle[0].building.condition}</td>
                      </tr>
                      <tr>
                        <td>Beds</td>
                        <td>County</td>
                        <td>Lot Sq Ft</td>
                        <td>Condition</td>
                      </tr>
                      <tr>
                        <td>${json.bundle[0].building.totalRooms}</td>
                        <td>${json.bundle[0].building.baths}</td>
                        <td>${json.bundle[0].building.yearBuilt}</td>
                        <td>${json.bundle[0].landUseCode}</td>
                      </tr>
                      <tr>
                        <td>Rooms</td>
                        <td>Baths</td>
                        <td>Yr Built</td>
                        <td>Land Use</td>
                      </tr>
                      <tr>
                        <td>${json.bundle[0].fips}</td>
                        <td>${json.bundle[0].taxYear}</td>
                        <td>${json.bundle[0].taxAmount}</td>
                        <td>${json.bundle[0].totalValue}</td>
                      </tr>
                      <tr>
                        <td>Fips</td>
                        <td>Tax Year</td>
                        <td>Tax Amount</td>
                        <td>Total Value</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="4">
                          <img class="avatar left" src="./Portal/images/retsly-logo.png" width="80px"/>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                `);
            })
            .fail(function( jqxhr, textStatus, error ) {
              var err = textStatus + ", " + error;
              console.log( "Request Failed: " + err );
          });
        return `<span id="${tag.substr(1)}">${tag.substr(1)}</span>`;
    });

    p.addRule(/\#trends[\S]+/ig, function(tag) {
        let trendsUrl = `https://mlspro.staging.mlslistings.com/odata/Growth/MarketTrends?$filter=Class%20eq%20%27Residential%20-%20Single%20Family%27%20and%20PeriodType%20eq%20%27Year%27%20and%20Period%20eq%20%272015%27and%20GeographyType%20eq%20%27Zip%27%20and%20GeographyName%20eq%20%27${tag.split('#trends')[1]}%27`;
          $.getJSON( trendsUrl )
            .done(function( json ) {
              $(tag).html(`
                <div class="trends ui">
                  <div class="ui segments">
                    <div class="ui">
                      <div class="ui hidden divider"></div>
                      <div class="ui equal width grid center aligned">

                        <div class="trendHeader column">
                          <div class="ui statistic">
                            <div class="value">
                              ${json.value[0].PendingCount}
                            </div>
                            <div class="label">
                              Pending
                            </div>
                          </div>
                        </div>
                        <div class="column">
                          <div class="ui statistic">
                            <div class="value">
                              ${json.value[0].ActiveAvgDOM}
                            </div>
                            <div class="label">
                              DOM
                            </div>
                          </div>
                        </div>
                        <div class="column">
                          <div class="ui statistic">
                            <div class="value">
                              ${json.value[0].ActiveCount}
                            </div>
                            <div class="label">
                              Active
                            </div>
                          </div>
                        </div>
                      <div class="column">
                        <div class="ui statistic">
                          <div class="value">
                            ${json.value[0].AvgMonthsToSell}
                          </div>
                          <div class="label">
                            Avg MSI
                          </div>
                        </div>
                      </div>

                    </div>
                    <div class="ui secondary segment no-border-radius">
                      <div class="grid ui equal width">
                        <div class="column">
                          <i class="trendIcon circular line chart icon float left no-padding-top no-padding-bottom"></i>
                          <h5 class="trendLabel header">
                          ${json.value[0].County} County - ${json.value[0].Period} - ${json.value[0].GeographyName}</h5>
                        <img class="avatar" src="./Portal/images/mlslistings-logo.png" width="80px"/>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                `);
            })
            .fail(function( jqxhr, textStatus, error ) {
              var err = textStatus + ", " + error;
              console.log( "Request Failed: " + err );
          });
        return `<span id="${tag.substr(1)}">${tag.substr(1)}</span>`;
    });


    let message =  p.parse(props.thread.title);

    return (
      <div className='comment' onClick={ props.handleClick.bind(null) } className={ props.show ? 'bg-warning' : 'bg-info'}>

              <img className="ui avatar image" src={props.thread.avatar} alt={props.thread.name} />
              <div className="ui segment left pointing label">
                <i onClick={ props.removeMessage.bind(null) } className="close icon"></i>
                <div dangerouslySetInnerHTML={{__html: message}} />
             </div>
      </div>
    );
  }
}
