import React, { Component } from 'react';
import classNames from 'classnames';
import Grid from './grid';
import Column from './column';
import Row from './row.js';
import Segment from './segment';
import Segments from './segments';
import CrossGrid from './crossgrid';
import 'imports?$=jquery,jQuery=jquery!../../css/semantic/semantic.min.js';
import Chart from './chart';
import PersonalNotepad from './personalnotepad';

export default class TaxDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    let props = this.props;
    let that = this;
    let state = props.state;
    let transactionUrl = `https://rets.io/api/v1/pub/parcels/9797740/transactions?access_token=43224a475a157d1286c4b16dc75d5a7c`;
    let parcelUrl = `https://rets.io/api/v1/pub/parcels?access_token=43224a475a157d1286c4b16dc75d5a7c&id=${state.id}`

    //Fuck it hackathon baby :)
    $.getJSON( parcelUrl )
      .done(function( json ) {
        this.setState({
          parcel: json.bundle[0]
        });
        let trannyUrl = `${this.state.parcel.transactionsUrl}?access_token=43224a475a157d1286c4b16dc75d5a7c`;
        $.getJSON( trannyUrl , function( data ) {
          this.setState({
            transactions: data.bundle[0]
          });
        }.bind(this));
      }.bind(this))
      .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    }.bind(this));
  }

  render () {
    let owners;
    let props = this.props;
    let state = props.state;
    let long = state.coordinates[0];
    let lat = state.coordinates[1];
    let embedImageKey = 'AIzaSyAC5JPC1hQbZ9s4TrI7rYGBr7j6DqD6E9M';
    let embedMapKey = 'AIzaSyBqu09KlXrABRt8gQcxaPiMExeLJ0Gme9A';
    let mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center=${lat},${long}&markers=color:blue%7C${lat},${long}&zoom=14&size=300x200&key=${embedImageKey}`
    let liveMapUrl = `https://www.google.com/maps/embed/v1/place?key=${embedMapKey}&q=${lat},${long}`;
    let streetViewUrl = `https://www.google.com/maps/embed/v1/streetview?key=${embedMapKey}&location=${lat},${long}&heading=210&pitch=10&fov=35`;
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
      <div id={props.id} className={classNames(props.styles, "detailView")} data-apn={state.apn}>

        <Grid styles="ui stackable">
        <Column styles="sixteen">

        <Grid styles="ui stackable">
          <Column styles="eight">
            <Segment id="detailMap">
              <h5 className="ui top attached label">
                Map:
              </h5>
              <iframe className="liveMapFrame" scrolling="no" frameBorder="0" src={liveMapUrl} width="100%" height="330px"></iframe>
            </Segment>
          </Column>
          <Column styles="eight">
            <Segments id="ownersTable" styles="piled">
              <h5 className="ui top attached label">
                Owners:
              </h5>
              {owners}
            </Segments>
            <Segment id="factsTable">
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
      </Column>
    </Grid>
    <Grid styles="ui stackable">
      <Row>
        <Column styles="sixteen">
          <PersonalNotepad state={state} />
        </Column>
      </Row>
      <Row>
      <Column styles="sixteen">
        <Segments styles="piled">
          <h5 className="ui top attached header light-grey">
            Street View
          </h5>
          <Segment styles="attached">
            <iframe className="streetviewFrame" scrolling="no" frameBorder="0" src={streetViewUrl} width="100%" height="400px"></iframe>
          </Segment>
        </Segments>
      </Column>
      </Row>
    </Grid>
    <Grid styles="ui stackable">
      <Column styles="eight">
        <Segments styles="piled">
        <h5 className="ui top attached header light-grey">
          Median Sale Price:
        </h5>
        <Segment styles="attached">
          <Chart label="Period" column="MedSalePrice" drillDown="3"></Chart>
        </Segment>
        </Segments>
      </Column>
      <Column styles="eight">
        <Segments styles="piled">
        <h5 className="ui top attached header light-grey">
          Median Days On Market:
        </h5>
        <Segment styles="attached">
          <Chart label="Period" column="SoldMedDOM" drillDown="3"></Chart>
        </Segment>
        </Segments>
      </Column>
    </Grid>
    </div>
    );
  }
}
