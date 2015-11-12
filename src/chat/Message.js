import React, { Component } from 'react';
import Parser from 'simple-text-parser';
import Constants from '../constants/consts';
import 'imports?$=jquery,jQuery=jquery!../../css/slick/slick.min.js';

export default class Message extends React.Component {
  render(){
    let props = this.props;
    var p = new Parser();
    p.addRule(/\#mls[\S]+/ig, function(tag) {
          let mlsUrl = `${Constants.LISTINGS_URL}${tag.split('#mls')[1]}?access_token=43224a475a157d1286c4b16dc75d5a7c`;
          let uniqueKey = _.uniqueId('ml');
          $.getJSON( mlsUrl )
            .done(function( json ) {
              var slider = '';
              $(json.propertyDetailResults.hrImageList).each(function(i, img){
                slider += `<div class="ui segment basic">
                    <img class="ui centered image slick-image" data-lazy="${img}">
                </div>`
              });
              $(`${tag}-${uniqueKey}`).html(`
                <div class="listing ui card full">
                  <div id="${uniqueKey}-${json.propertyDetailResults.MLSNumber}" class="slick">
                    ${slider}
                  </div>
                  <div class="content">
                    <a class="header">${json.propertyDetailResults.propertyAddress}</a>
                    <div class="description">
                        <h5 class="header metadata">
                          <span>
                            Beds - ${json.propertyDetailResults.beds}
                          </span>
                          <span>
                            Baths - ${json.propertyDetailResults.baths}
                          </span>
                        </h5>
                        <p>${json.propertyDetailResults.publicRemarks}</p>
                    </div>

                  </div>
                  <div class="extra content">
                    <img class="logo right" src="./Portal/images/mlslistings-logo.png" width="80px"/>
                </div>
              </div>
              <div class="ui items listing tiny">
                <div class="item">
                  <div class="ui small image">
                    <img src="${json.propertyDetailResults.thumbNailImageList[0]}">
                  </div>
                  <div class="content">
                    <div class="header">${json.propertyDetailResults.propertyAddress}</div>
                    <div class="meta">
                      <span class="price">${json.propertyDetailResults.formatedListSalePrice}</span>
                      <span class="stay">${json.propertyDetailResults.beds} bds ${json.propertyDetailResults.baths} bths</span>
                    </div>
                    <div class="description">
                      <br />
                      <img class="logo right" src="./Portal/images/mlslistings-logo.png" width="80px"/>
                  </div>
                  </div>
                </div>
                `);
                $(`#${uniqueKey}-${json.propertyDetailResults.MLSNumber}`).slick({
                  lazyLoad: 'ondemand',
                  slidesToShow: 1,
                  fade: true,
                  cssEase: 'linear',
                  prevArrow: '<button type="button" class="slick-prev"><i class="chevron circle left icon"></i></button>',
                  nextArrow: '<button type="button" class="slick-next"><i class="chevron circle right icon"></i></button>'
                });
            })
            .fail(function( jqxhr, textStatus, error ) {
              var err = textStatus + ", " + error;
              console.log( "Request Failed: " + err );
          });
        return `<span id="${tag.substr(1)}-${uniqueKey}">${tag.substr(1)}</span>`;
    });

    p.addRule(/\#cs[\S]+/ig, function(tag) {
          let csUrl = `${Constants.COMING_SOON_URL}`;
          $.getJSON( csUrl )
            .done(function( json ) {
              var prop = json.comingSoon[0];
              $(tag).html(`
                <div class="listing ui card full">
                  <div class="image">
                    <img src="https://lm4.mlslistings.com/comingsoon/photo/${prop.Photos[0]}">
                  </div>
                  <div class="content">
                    <a class="header">${prop.StreetNumber} ${prop.StreetName} ${prop.CityPostalName} - ${numeral(prop.PreMarketPrice).format('$0,0')}</a>
                    <div class="description">
                        <h5 class="header metadata">
                          <span>
                            Beds - ${prop.BedsTotal}
                          </span>
                          <span>
                            Baths - ${prop.BathsTotal}
                          </span>
                        </h5>
                        ${prop.Comments}
                    </div>

                  </div>
                  <div class="extra content">
                    <img class="logo right" src="./Portal/images/mlslistings-logo.png" width="80px"/>
                </div>
              </div>
              <div class="ui items listing tiny">
                <div class="item">
                  <div class="ui small image">
                    <img src="https://lm4.mlslistings.com/comingsoon/photo/${prop.Photos[0]}">
                  </div>
                  <div class="content">
                    <div class="header">${prop.StreetNumber} ${prop.StreetName} ${prop.CityPostalName}</div>
                    <div class="meta">
                      <span class="price">${numeral(prop.PreMarketPrice).format('$0,0')}</span>
                      <span class="stay">${prop.BedsTotal} bds ${prop.BathsTotal} bths</span>
                    </div>
                    <div class="description">
                      <br />
                      <img class="logo right" src="./Portal/images/mlslistings-logo.png" width="80px"/>
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
        let apn = tag.split('#apn')[1];
        //let apnUrl = Constants.PARCELS_URL;
        let apnUrl = `https://rets.io/api/v1/pub/parcels?access_token=43224a475a157d1286c4b16dc75d5a7c&limit=10&apn=${tag.split('#apn')[1]}`;
        let uniqueKey = _.uniqueId('apn');
          $.getJSON( apnUrl )
            .done(function( json ) {
              $(`${tag}-${uniqueKey}`).html(`
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
        return `<span id="${tag.substr(1)}-${uniqueKey}">${tag.substr(1)}</span>`;
    });

    p.addRule(/\#trends[\S]+/ig, function(tag) {
        let trendsUrl = `https://mlspro.staging.mlslistings.com/odata/Growth/MarketTrends?$filter=Class%20eq%20%27Residential%20-%20Single%20Family%27%20and%20PeriodType%20eq%20%27Year%27%20and%20Period%20eq%20%272015%27and%20GeographyType%20eq%20%27Zip%27%20and%20GeographyName%20eq%20%27${tag.split('#trends')[1]}%27`;
        let uniqueKey = _.uniqueId('tr');
          $.getJSON( trendsUrl )
            .done(function( json ) {
              $(`${tag}-${uniqueKey}`).html(`
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
        return `<span id="${tag.substr(1)}-${uniqueKey}">${tag.substr(1)}</span>`;
    });


    let message =  p.parse(props.thread.title);

    return (
      <div className='comment'>
              <img className="ui avatar image" src={props.thread.avatar} alt={props.thread.name} />
              <div className="ui segment left pointing label">
                <i onClick={ props.removeMessage.bind(null) } className="close icon"></i>
                <div dangerouslySetInnerHTML={{__html: message}} />
             </div>
      </div>
    );
  }
}
