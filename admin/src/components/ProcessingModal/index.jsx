import React, { useState } from "react";
import "./Modal.css"; // For styling the modal
import FileList from "./FileList";

const ProcessingModal = ({
  open,
  setOpen,
  appointmentData = null,
  uploadImage = () => {},
}) => {
  const closeModal = () => {
    setOpen(false);
  };

  console.log(appointmentData);

  return (
    <>
      {open && (
        <div
          className="modal-overlay"
          style={{ padding: 20 }}
          onClick={closeModal}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ margin: 10 }}>
              <button className="close-btn" onClick={closeModal}>
                x
              </button>
            </div>
            <div className="main-body">
              <div>
                <div className="add-img-upload flex-col">
                  <label htmlFor="image">
                    <button
                      className="btn upload-btn"
                      onClick={() => document.getElementById("image").click()}
                    >
                      Process File
                    </button>
                  </label>
                  <input
                    onChange={(e) =>
                      uploadImage(e.target.files[0], appointmentData)
                    }
                    type="file"
                    id="image"
                    style={{ display: "none" }}
                    accept="image/*"
                  />
                </div>
                <FileList list={appointmentData?.images ?? []} />
                <button className="btn process-btn">Process File</button>
              </div>
              <div className="processed-table">Processed Data Comes Here</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProcessingModal;
