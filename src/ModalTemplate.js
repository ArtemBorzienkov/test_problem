import * as React from 'react'

import './index.css'

class ModalTemplate extends React.PureComponent {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal)
    document.addEventListener('mousedown', this.closeModal)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal)
    document.removeEventListener('mousedown', this.closeModal)
  }

  node = null

  closeModal = (e) => {
    if (e.keyCode && e.keyCode !== 27) {
      return
    }

    if (this.node.contains(e.target)) {
      return
    }

    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  render() {
    return (
      <div className='modal-wrapper' ref={node => {this.node = node}}>
        <img
          onClick={() => this.props.onClose()}
          src='https://www.freeiconspng.com/uploads/white-close-button-png-16.png' 
          alt='' 
        />
        <div className='modal-wrapper__body-content'>{this.props.children}</div>
      </div>
    )
  }
}

export default ModalTemplate