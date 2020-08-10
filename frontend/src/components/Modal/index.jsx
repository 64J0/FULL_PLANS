import React, { useState, useEffect } from "react";
import ReactModal from 'react-modal';
import { CircularProgress } from '@material-ui/core';

export default function Modal({ isOpen, setIsOpen }) {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen, modalStatus]);

  return (
    <ReactModal
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          display: 'flex',
          justifyContent: "center",
          textAlign: 'center',
          alignItems: 'center',
          background: 'transparent',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      <CircularProgress size="8rem" color="secondary" />
    </ReactModal>
  );
}