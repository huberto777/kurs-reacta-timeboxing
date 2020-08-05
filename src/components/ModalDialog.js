import React from 'react';
import Portal from './Portal';
import TimeboxCreator from './TimeboxCreator';

function ModalDialog({ onClose, children, onCreate }) {
  return (
    <Portal>
      <div className="modal">
        <div
          style={{
            backgroundColor: 'maroon',
            padding: 40,
          }}
        >
          {children}
          <h2 className="title">Dodanie timeboxa</h2>
          <TimeboxCreator onCreate={onCreate} onClose={onClose} />
        </div>
      </div>
    </Portal>
  );
}

export default ModalDialog;
