import React, { useState } from "react";
import "./Modal.css"; // For styling the modal
import FileList from './FileList';

const Modal = ({open}) => {
  const [isOpen, setIsOpen] = useState(open);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={openModal} className="open-modal-btn">Open Modal</button>
      
      {isOpen && (
        <div className="modal-overlay" style={{padding:20}} onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div>
            <button className="close-btn" onClick={closeModal}>x</button>
            </div>
            <div className="main-body">
              <div>
                <button className="btn upload-btn">Upload File</button>
                <FileList />
                <button className="btn process-btn">Process File</button>
              </div>
              <div className="processed-table">
                Processed Data Comes Here
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
