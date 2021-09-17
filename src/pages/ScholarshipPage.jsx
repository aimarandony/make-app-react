import React, { useEffect, useState } from "react";

import HeaderPage from "../components/HeaderPage";
import FilterWrapper from "../components/Scholarship/FilterWrapper";
import ListScholarship from "../components/Scholarship/ListScholarship";
import DrawerScholarship from "../components/Scholarship/DrawerScholarship";
import ModalScholarship from "../components/Scholarship/ModalScholarship";

import { getScholarshipCount } from "../services/ScholarshipService";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

const ScholarshipPage = () => {
  const [data, setData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [scholarshipIdEdit, setScholarshipIdEdit] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [scholarshipIdModal, setScholarshipIdModal] = useState(0);
  const [count, setCount] = useState(0)
  const [currentPag, setCurrentPag] = useState(1)

  useEffect(() => {
    getScholarshipCount().then(setCount);
  }, [])

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
      <FilterWrapper count={count}/>
      <ListScholarship
        data={data}
        setData={setData}
        setOpenModal={setOpenModal}
        setScholarshipIdModal={setScholarshipIdModal}
        count={count}
        setCount={setCount}
        current={currentPag}
        setCurrent={setCurrentPag}
      />
      <DrawerScholarship
        setData={setData}
        setOpen={setOpenDrawer}
        open={openDrawer}
        scholarshipIdEdit={scholarshipIdEdit}
        setScholarshipIdEdit={setScholarshipIdEdit}
        setCount={setCount}
        setCurrent={setCurrentPag}
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
