import React, { PureComponent, Fragment } from 'react'

import ModalTrigger from './ModalTrigger'
import ModalContent from './ModalContent'

class Modal extends PureComponent {
  state = { isOpen: false }

  onOpen = () => {
    this.setState({ isOpen: true }, () => {
      this.closeButtonNode.focus()
    })
    this.toggleScrollLock()
  }

  onClose = () => {
    this.setState({ isOpen: false })
    this.openButtonNode.focus()
    this.toggleScrollLock()
  }

  onClickAway = e => {
    if (this.modalNode && this.modalNode.contains(e.target)) return
    this.onClose()
  }

  toggleScrollLock = () => document.querySelector('html').classList.toggle('u-lock-scroll')

  render() {
    const { isOpen } = this.state
    const { children, triggerText, role } = this.props
    return (
      <Fragment>
        <ModalTrigger onOpen={this.onOpen} buttonRef={n => (this.openButtonNode = n)} text={triggerText} />
        {isOpen && (
          <ModalContent
            buttonRef={n => (this.closeButtonNode = n)}
            modalRef={n => (this.modalNode = n)}
            content={children}
            onClickAway={this.onClickAway}
            onClose={this.onClose}
          />
        )}
      </Fragment>
    )
  }
}

export default Modal
