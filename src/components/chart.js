import React, { Component } from 'react';
import classNames from 'classnames';
import trends from '../api/trends';
import Store from '../stores/AppStore';
import Constants from '../constants/consts';

var LineChart = require("react-chartjs").Line;

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level:Store.Level(),
      results:{},
      chartData : {
          labels: [],
          datasets: [
              {
                  label:"County",
                  fillColor: "rgba(252,222,168,.3)",
                  strokeColor: "rgba(252,222,168,.5)",
                  pointColor: "rgba(252,222,168,1)",
                  data:[]
              },
              {
                  label:"City",
                  fillColor: "rgba(5,108,152,0)",
                  strokeColor: "rgba(5,108,152,.5)",
                  pointColor: "rgba(5,108,152,1)",
                  data: []
              },
              {
                  label:"Zip",
                  fillColor: "rgba(4, 83, 118,0)",
                  strokeColor: "rgba(4, 83, 118,1)",
                  pointColor: "rgba(4, 83, 118,1)",
                  data: []
              }
        ]
      },
      chartOptions : {
        pointDotRadius: 1,
        bezierCurve: true,
        scaleShowVerticalLines: false,
        scaleGridLineColor: "silver",
        responsive: true,
        scaleShowGridLines : false,
        scaleLabel : function (valuePayload) {
            if(valuePayload.value > 1000){
              return numeral(valuePayload.value).format('$ 0.00 a');
            } else {
              return Number(valuePayload.value);
            }
        },
        multiTooltipTemplate: function (valuePayload) {
            if(valuePayload.value > 1000){
              return numeral(valuePayload.value).format('$ 0.00 a');
            } else {
              return Number(valuePayload.value);
            }
        }
      }
    };
    this._loadCounty = this.loadCounty.bind(this);
    this._loadCity = this.loadCity.bind(this);
    this._loadZip = this.loadZip.bind(this);
    this._newLevel = this.newLevel.bind(this);
  }

  setSeries(data,n){
    var labels=[], series = [],lab = this.props.label, col = this.props.column;
    $.each(data, function( index, value ) {
      if(value.Period>2005){
        labels.push(value[lab]);
        series.push(value[col]);
      }
    });
    if(n==1){
      this.state.chartData.labels=labels;
    }
    this.state.chartData.datasets[n-1].data = series;
  }

  loadZip(){
    this.setSeries(Store.Trends("Zip",this.props.zip),3);
    this.setState({
    });
  }

  loadCity(){
    this.setSeries(Store.Trends("City",this.props.city),2);
    this.setState({
    });
  }

  loadCounty(){
    this.setSeries(Store.Trends("County",this.props.county),1);
    this.setState({
    });
  }

  loadData(){
    this.state.chartData.datasets[1].data = [];
    this.state.chartData.datasets[2].data = [];

    this.setSeries(Store.Trends("County",this.props.county),1);
    Store.addChangeListener(this.props.group + Constants.TREND_EVENT_COUNTY, this._loadCounty);

    if(this.state.level>1){
      this.setSeries(Store.Trends("City",this.props.city),2);
      Store.addChangeListener(this.props.group + Constants.TREND_EVENT_CITY, this._loadCity);
    }
    if(this.state.level>2){
      this.setSeries(Store.Trends("Zip",this.props.zip),3);
      Store.addChangeListener(this.props.group + Constants.TREND_EVENT_ZIP, this._loadZip);
    }
  }

  unload(){
    Store.removeChangeListener(this.props.group + Constants.TREND_EVENT_COUNTY, this._loadCounty);
    if(this.state.level>1){
      Store.removeChangeListener(this.props.group + Constants.TREND_EVENT_CITY, this._loadCity);
    }
    if(this.state.level>2){
      Store.removeChangeListener(this.props.group + Constants.TREND_EVENT_ZIP, this._loadZip);
    }
  }

  componentWillMount() {
    this.loadData();
    Store.addChangeListener(Constants.NEW_LEVEL, this._newLevel);
  }

  componentWillUpdate(){
    this.unload();
    this.state.level = Store.Level();
    this.loadData();
  }

  newLevel(){
    this.unload();
    this.state.level = Store.Level();
    this.loadData();
    this.setState({
    });
  }

  componentDidUpdate(){
  }

  componentWillUnmount(){
    this.unload();
    Store.removeChangeListener(Constants.NEW_LEVEL, this._newLevel);
  }

  render () {
    return (
      <LineChart data={this.state.chartData} options={this.state.chartOptions} redraw />
    );
  }
}
