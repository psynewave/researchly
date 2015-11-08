import React  from 'react/addons';
import Parser from 'simple-text-parser';
export default class Message extends React.Component {
  render(){
    let props = this.props;
    var p = new Parser();
    p.addRule(/\#[\S]+/ig, function(tag) {
        return '<a class="ui green label">'+ tag.substr(1) +'</a>';
    });
    let message =  p.parse(props.thread.title);

    return (
      <div className='comment' onClick={ props.handleClick.bind(null) } className={ props.show ? 'bg-warning' : 'bg-info'}>

              <img className="ui avatar image" src={props.thread.avatar} alt={props.thread.name} />
              <div className="ui segment left pointing label">
                <div dangerouslySetInnerHTML={{__html: message}} />
                <i onClick={ props.removeMessage.bind(null) } className="close icon"></i>
             </div>
      </div>
    );
  }
}
