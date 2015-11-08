import React  from 'react/addons';
import Parser from 'simple-text-parser';
export default class Message extends React.Component {
  render(){
    let props = this.props;
    var p = new Parser();
    p.addRule(/\#[\S]+/ig, function(tag) {
        let mlsUrl = `https://rets.io/api/v1/armls/listings/${tag.split('#')[1]}?access_token=43224a475a157d1286c4b16dc75d5a7c`;
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
                      ${json.bundle.publicRemarks}
                    </div>
                  </div>
                  <div class="extra content">
                    <span>
                      Beds - ${json.bundle.bedrooms}
                    </span>
                    <span>
                      Baths - ${json.bundle.baths}
                    </span>
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
