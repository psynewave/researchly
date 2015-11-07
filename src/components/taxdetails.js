import React, { Component } from 'react';
import classNames from 'classnames';
import Grid from './grid';
import Column from './column';
import Row from './row.js';
import Segment from './segment';
import Segments from './segments';
import CrossGrid from './crossgrid';
import 'imports?$=jquery,jQuery=jquery!../../css/semantic/semantic.min.js';

export default class TaxDetails extends React.Component {
  constructor() {
    super();
  }
  render () {
    let owners;
    let props = this.props;
    let state = props.state;
    let embedImageKey = 'AIzaSyAC5JPC1hQbZ9s4TrI7rYGBr7j6DqD6E9M';
    let embedMapKey = 'AIzaSyBqu09KlXrABRt8gQcxaPiMExeLJ0Gme9A';
    let mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center=${state.coordinates.lat},${state.coordinates.lon}&markers=color:blue%7C${state.coordinates.lat},${state.coordinates.lon}&zoom=14&size=300x200&key=${embedImageKey}`
    let liveMapUrl = `https://www.google.com/maps/embed/v1/place?key=${embedMapKey}&q=${state.coordinates.lat},${state.coordinates.lon}`;
    let streetViewUrl = `https://www.google.com/maps/embed/v1/streetview?key=${embedMapKey}&location=${state.coordinates.lat},${state.coordinates.lon}&heading=210&pitch=10&fov=35`;
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
            <Segment>
              <h5 className="ui top attached label">
                Map:
              </h5>
              <iframe className="liveMapFrame" scrolling="no" frameBorder="0" src={liveMapUrl} width="100%" height="230px"></iframe>
            </Segment>
          </Column>
          <Column styles="eight">
            <Segment>
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
            </CrossGrid>
            </Segment>
            <Segments styles="piled">
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
          Notepad will go here
      </Column>
      </Row>
    </Grid>
    </div>
    );
  }
}
