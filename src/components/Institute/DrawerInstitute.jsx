import { Drawer } from "antd";
import React from "react";

const DrawerInstitute = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      title="Institución"
      placement="right"
      onClose={handleClose}
      visible={open}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};

export default DrawerInstitute;
