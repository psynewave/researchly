import React  from 'react/addons';

var Message = React.createClass({

  render(){
    let props = this.props;
    return (
      <div className='comment' onClick={ props.handleClick.bind(null) } className={ props.show ? 'bg-warning' : 'bg-info'}>
            <i onClick={ props.removeMessage.bind(null) } className="close icon"></i> { props.thread.title }
      </div>
    );
  }
});

export default Message
