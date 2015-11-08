import React  from 'react/addons';
export default class Message extends React.Component {
  render(){
    let props = this.props;
    return (
      <div className='comment' onClick={ props.handleClick.bind(null) } className={ props.show ? 'bg-warning' : 'bg-info'}>

              <img className="ui avatar image" src={props.thread.avatar} />
              <div className="ui segment left pointing label">
                { props.thread.title }
                <i onClick={ props.removeMessage.bind(null) } className="close icon"></i>
             </div>
      </div>
    );
  }
}
