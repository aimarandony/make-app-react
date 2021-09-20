import React from "react";
import { Modal } from "antd";

const ModalChangeStatus = () => {
  const handleOk = () => {
    //SAVE AND CLOSE
  };

  const handleCancel = () => {
    //CLOSE
  };

  return (
    <Modal
      title="Cambiar Estado Beca"
      visible={false}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default ModalChangeStatus;
