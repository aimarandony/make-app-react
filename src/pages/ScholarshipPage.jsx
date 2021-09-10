import React, { useState } from "react";

import HeaderPage from "../components/HeaderPage";

import ListScholarship from "../components/Scholarship/ListScholarship";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import DrawerScholarship from "../components/Scholarship/DrawerScholarship";
import ModalScholarship from "../components/Scholarship/ModalScholarship";

const ScholarshipPage = () => {
  const [data, setData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [scholarshipIdEdit, setScholarshipIdEdit] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [scholarshipIdModal, setScholarshipIdModal] = useState(0);

  return (
    <div>
      <HeaderPage
        title="Becas"
        subTitle="Proceso de becas."
        button={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenDrawer(true)}
            size="large"
          >
            Nueva Beca
          </Button>
        }
      />
      <ListScholarship
        data={data}
        setData={setData}
        setOpenModal={setOpenModal}
        setScholarshipIdModal={setScholarshipIdModal}
      />
      <DrawerScholarship
        setData={setData}
        setOpen={setOpenDrawer}
        open={openDrawer}
        scholarshipIdEdit={scholarshipIdEdit}
        setScholarshipIdEdit={setScholarshipIdEdit}
      />
      <ModalScholarship
        setOpen={setOpenModal}
        open={openModal}
        scholarshipIdModal={scholarshipIdModal}
        setScholarshipIdModal={setScholarshipIdModal}
      />
    </div>
  );
};

export default ScholarshipPage;
