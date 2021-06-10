import React from 'react'

export const ModalDialog = ({ header, body, footer, show }) => {
  return show && (
    <section className='modal-background'>
      <div className='modal-dialog'>
        <div className='modal-header'>
          {header}
        </div>
        <div className='modal-body'>
          {body}
        </div>
        <div className='modal-footer'>
          {footer}
        </div>
      </div>
    </section>
  )
}

