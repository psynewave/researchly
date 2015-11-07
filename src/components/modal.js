import React, { Component, PropTypes } from 'react';
import Portal from 'react-portal';
import classNames from 'classnames';

class InnerModal extends Component {
  constructor(props) {
    super(props);
    this.state = { modalHeight: 0 };
  }

  componentDidMount() {
    let props = this.props;
    let modalHeight = window.$('#reactInnerModal').outerHeight();
    this.setState({
      modalHeight: modalHeight
    });
  }

  render() {
    let props = this.props;
    let closeIcon = null;

    if (props.closeIcon) {
      closeIcon =  <i className='close icon' onClick={props.closePortal}></i>;
    }

    return (
      <div id='reactInnerModal' className={classNames('ui', 'modal', 'transition', 'visible', 'active', props.style, props.size)} style={{'marginTop': - this.state.modalHeight / 2}}>
        {closeIcon}
        {props.children}
      </div>
    );
  }
}

InnerModal.propTypes = {
  style: PropTypes.oneOf(['standard', 'basic']),
  size: PropTypes.oneOf(['', 'small', 'large', 'fullscreen']),
  closeIcon: PropTypes.bool
};
InnerModal.defaultProps = {
  style: 'standard',
  size: ''
};

export default class Modal extends Component {
  render() {
    let props = this.props;
    return (
      <Portal className={classNames('ui', 'dimmer', 'modals', 'visible', 'active', 'page', 'transition', props.className)} isOpened={props.isOpened} closeOnEsc={props.closeOnEsc} closeOnOutsideClick={props.closeOnOutsideClick} onClose={props.onClose}>
        <InnerModal style={props.style} size={props.size} closeIcon = {props.closeIcon} qlikInfo = {props.qlikInfo}>
          {props.children}
        </InnerModal>
      </Portal>
    );
  }
}

Modal.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  closeOnEsc: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
  onClose: PropTypes.func,
  closeIcon: PropTypes.bool,
  style: PropTypes.oneOf(['standard', 'basic']),
  size: PropTypes.oneOf(['', 'small', 'large', 'fullscreen'])
};
Modal.defaultProps = {
  style: 'standard',
  size: ''
};
