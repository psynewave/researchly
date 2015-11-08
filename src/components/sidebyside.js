import React, { Component } from 'react';
import classNames from 'classnames';
import Grid from './grid';
import Column from './column';
import Segment from './segment';
import Segments from './segments';
import CrossGrid from './crossgrid';
import Actions from '../actions/appActions';
import PersonalNotepad from './personalnotepad';
import Chart from './chart';

export default class SideBySide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      geoData : {
        County:this.props.state.county,
        City:this.props.state.address.city,
        Zip:this.props.state.address.zip
      }
    };
  }
  componentDidMount(){
    Actions.fetchTrends(this.state.geoData,this.props.id);
  }
  render () {
    let owners;
    let props = this.props;
    let state = props.state;
    let geo = this.state.geoData;
    let mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center=${state.coordinates.lat},${state.coordinates.lon}&markers=color:blue%7C${state.coordinates.lat},${state.coordinates.lon}&zoom=14&size=300x200&key=AIzaSyAC5JPC1hQbZ9s4TrI7rYGBr7j6DqD6E9M`
    if(typeof state.ownerName === "object"){
      owners = state.ownerName.map((o,k) => {
        return (
          <Segment key={k}>
            {o}
          </Segment>
        )
      });
    } else {
      owners = <Segment>{state.ownerName}</Segment>
    }

    return (
      <div id={props.id} className={classNames(props.styles, "detailView")}>
        <Grid styles="ui stackable">
          <Column styles="sixteen">
            <Segment styles="piled">
              <CrossGrid>
              <Segments styles="horizontal">
                <Segment>
                  <div className="ui top transparent attached label centered">
                    {state.building.bedrooms}
                  </div>
                  <p></p>
                  <div className="ui bottom attached label centered">Beds</div>
                </Segment>
                <Segment>
                  <div className="ui top transparent attached label centered">{state.county}</div>
                  <div className="ui bottom attached label centered">County</div>
                </Segment>
                <Segment>
                  <div className="ui top transparent attached label centered">{numeral(state.lotSizeSquareFeet).format('0,0')}</div>
                  <div className="ui bottom attached label centered">Lot Sq Ft</div>
                </Segment>
                <Segment>
                  <div className="ui top transparent attached label centered">{state.building.totalRooms}</div>
                  <div className="ui bottom attached label centered">Rooms</div>
                </Segment>
              </Segments>
              <Segments styles="horizontal">
                <Segment>
                  <div className="ui top transparent attached label centered">{state.building.baths ? state.building.baths : 0}</div>
                  <p></p>
                  <div className="ui bottom attached label centered">Baths</div>
                </Segment>
                <Segment>
                  <div className="ui top transparent attached label centered">{state.building.yearBuilt}</div>
                  <div className="ui bottom attached label centered">Yr Built</div>
                </Segment>
                <Segment>
                  <div className="ui top transparent attached label centered">{state.building.condition}</div>
                  <div className="ui bottom attached label centered">Condition</div>
                </Segment>
                <Segment>
                  <div className="ui top transparent attached label centered">{state.landUseCode}</div>
                  <div className="ui bottom attached label centered">Land Use</div>
                </Segment>
              </Segments>
            </CrossGrid>
            </Segment>
          </Column>
        </Grid>
        <Grid styles="ui stackable">
          <Column styles="sixteen">
            <Segments styles="piled">
              <h5 className="ui top attached header">
                Owners:
              </h5>
              {owners}
            </Segments>
          </Column>
        </Grid>
        <Grid styles="ui stackable">
          <Column styles="sixteen">
            <Segments styles="piled">
            <h5 className="ui top attached header">
              Median Sale Price in {geo.Zip} {geo.City} {geo.County}
            </h5>
            <Segment styles="attached">
              <Chart group={props.id} zip={geo.Zip} city={geo.City} county={geo.County} label="Period" column="MedSalePrice" drillDown="3"></Chart>
            </Segment>
            </Segments>
          </Column>
          <Column styles="sixteen">
            <Segments styles="piled">
            <h5 className="ui top attached header">
              Median Days On Market in {geo.Zip} {geo.City} {geo.County}
            </h5>
            <Segment styles="attached">
              <Chart group={props.id} zip={geo.Zip} city={geo.City} county={geo.County} label="Period" column="SoldMedDOM" drillDown="3"></Chart>
            </Segment>
            </Segments>
          </Column>
          <Column styles="sixteen">
            <Segments styles="piled">
            <h5 className="ui top attached header">
              Median SalePrice/Sqft in {geo.Zip} {geo.City} {geo.County}
            </h5>
            <Segment styles="attached">
              <Chart group={props.id} zip={geo.Zip} city={geo.City} county={geo.County} label="Period" column="MedSalePricePerSqft" drillDown="3"></Chart>
            </Segment>
            </Segments>
          </Column>
        </Grid>
        <Column styles="sixteen">
          <PersonalNotepad state={state} />
        </Column>
    </div>
    );
  }
}
