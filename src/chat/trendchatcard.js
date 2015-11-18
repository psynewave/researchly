import React, { Component } from 'react';
import Constants from '../constants/consts';
import 'imports?$=jquery,jQuery=jquery!../../css/slick/slick.min.js';

export default class TrendChatCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      trends: null
    }
  }

  componentWillMount(){
    let props = this.props;
    let trendsUrl = `https://mlspro.staging.mlslistings.com/odata/Growth/MarketTrends?$filter=Class%20eq%20%27Residential%20-%20Single%20Family%27%20and%20PeriodType%20eq%20%27Year%27%20and%20Period%20eq%20%272015%27and%20GeographyType%20eq%20%27Zip%27%20and%20GeographyName%20eq%20%27${props.zipcode}%27`;

    $.getJSON( trendsUrl )
      .done(function( json ) {
        this.setState({
          trends: json.value[0]
        });
      }.bind(this))
      .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    }.bind(this));
  }

  render () {

    let props = this.props;
    let state = this.state;
    let trends = state.trends ? state.trends : null;
    let trendCard;

    if(trends){
      trendCard = <div className="trends ui">
        <div className="ui segments">
          <div className="ui">
            <div className="ui hidden divider"></div>
            <div className="ui equal width grid center aligned">

              <div className="trendHeader column">
                <div className="ui statistic">
                  <div className="value">
                    {trends.PendingCount}
                  </div>
                  <div className="label">
                    Pending
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="ui statistic">
                  <div className="value">
                    {trends.ActiveAvgDOM}
                  </div>
                  <div className="label">
                    DOM
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="ui statistic">
                  <div className="value">
                    {trends.ActiveCount}
                  </div>
                  <div className="label">
                    Active
                  </div>
                </div>
              </div>
            <div className="column">
              <div className="ui statistic">
                <div className="value">
                  {trends.AvgMonthsToSell}
                </div>
                <div className="label">
                  Avg MSI
                </div>
              </div>
            </div>

          </div>
          <div className="ui secondary segment no-border-radius">
            <div className="grid ui equal width">
              <div className="column">
                <i className="trendIcon circular line chart icon float left no-padding-top no-padding-bottom"></i>
                <h5 className="trendLabel header">
                {trends.County} County - {trends.Period} - {trends.GeographyName}</h5>
              <img className="avatar" src="./Portal/images/mlslistings-logo.png" width="80px"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    }

    return (
      <div id={props.id}>
        {trendCard}
      </div>
    );
  }
}
