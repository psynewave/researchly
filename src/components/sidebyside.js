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
            <Segment styles="piled">
              <h5 className="ui top attached label">
                Facts:
              </h5>
              <table className="ui fixed single striped line celled table center aligned">
                <tbody>
                  <tr>
                    <td>{state.building.bedrooms ? state.building.bedrooms : 0}</td>
                    <td>{state.county ? state.county : 'unk'}</td>
                    <td>{numeral(state.lotSizeSquareFeet).format('0,0')}</td>
                    <td>{state.building.condition ? state.building.condition : 'unk'}</td>
                  </tr>
                  <tr>
                    <td>Beds</td>
                    <td>County</td>
                    <td>Lot Sq Ft</td>
                    <td>Condition</td>
                  </tr>
                  <tr>
                    <td>{state.building.totalRooms ? state.building.totalRooms : 0}</td>
                    <td>{state.building.baths ? state.building.baths : 0}</td>
                    <td>{state.building.yearBuilt ? state.building.yearBuilt : 'unk'}</td>
                    <td>{state.landUseCode ? state.landUseCode : 'unk'}</td>
                  </tr>
                  <tr>
                    <td>Rooms</td>
                    <td>Baths</td>
                    <td>Yr Built</td>
                    <td>Land Use</td>
                  </tr>
                  <tr>
                    <td>{state.fips ? state.fips : "unk"}</td>
                    <td>{state.taxYear ? state.taxYear : "unk"}</td>
                    <td>{state.taxAmount ? numeral(state.taxAmount).format('$0,0') : 'unk'}</td>
                    <td>{state.totalValue ? numeral(state.totalValue).format('$0,0') : 'unk'}</td>
                  </tr>
                  <tr>
                    <td>Fips</td>
                    <td>Tax Year</td>
                    <td>Tax Amount</td>
                    <td>Total Value</td>
                  </tr>
                </tbody>
              </table>
            </Segment>
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
