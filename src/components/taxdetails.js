import React, { Component } from 'react';
import classNames from 'classnames';
import Grid from './grid';
import Column from './column';
import Row from './row.js';
import Segment from './segment';
import Segments from './segments';
import CrossGrid from './crossgrid';
import 'imports?$=jquery,jQuery=jquery!../../css/semantic/semantic.min.js';
import ChatBox from '../chat/chatbox';
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
              <iframe className="liveMapFrame" scrolling="no" frameBorder="0" src={liveMapUrl} width="100%" height="260px"></iframe>
            </Segment>
          </Column>
          <Column styles="eight">
            <Segment id="factsTable">
              <h5 className="ui top attached label">
                Facts:
              </h5>
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
                  <div className="ui bottom attached label centered">Total Rooms</div>
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
              <Segments styles="horizontal">
                <Segment>
                  <div className="ui top transparent attached label centered">{state.fips}</div>
                  <p></p>
                  <div className="ui bottom attached label centered">fips</div>
                </Segment>
                <Segment>
                  <div className="ui top transparent attached label centered">{state.taxYear}</div>
                  <div className="ui bottom attached label centered">Tax Year</div>
                </Segment>
                <Segment>
                  <div className="ui top transparent attached label centered">{state.taxAmount}</div>
                  <div className="ui bottom attached label centered">Tax</div>
                </Segment>
                <Segment>
                  <div className="ui top transparent attached label centered">{state.totalValue}</div>
                  <div className="ui bottom attached label centered">Total Value</div>
                </Segment>
              </Segments>
            </CrossGrid>
            </Segment>
            <Segments id="ownersTable" styles="piled">
              <h5 className="ui top attached label">
                Owners:
              </h5>
              {owners}
            </Segments>
          </Column>
        </Grid>
        <Grid styles="ui stackable">
          <Column styles="eight">
            <Segments styles="piled">
            <h5 className="ui top attached header light-grey">
              Median Sale Price:
            </h5>
            <Segment styles="attached">
              chart will go here
            </Segment>
            </Segments>
          </Column>
          <Column styles="eight">
            <Segments styles="piled">
            <h5 className="ui top attached header light-grey">
              Median Days On Market:
            </h5>
            <Segment styles="attached">
              chart will go here
            </Segment>
            </Segments>
          </Column>
        </Grid>
      </Column>
    </Grid>
    <Grid styles="ui stackable">
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
      <Row>
        <Column styles="sixteen">
          <PersonalNotepad state={state} />
        </Column>
      </Row>
    </Grid>
    <Grid>
      <Row>
      <Column id="detailChatHolder" styles="sixteen">
      </Column>
      </Row>
    </Grid>
    </div>
    );
  }
}
