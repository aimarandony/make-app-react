import React, { useState } from "react";

import HeaderPage from "../components/HeaderPage";

import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FilterWrapper from "../components/FilterWrapper";
import TableStudent from "../components/Student/TableStudent";
import DrawerStudent from "../components/Student/DrawerStudent";
import ModalStudent from "../components/Student/ModalStudent";

const StudentPage = () => {
  const [data, setData] = useState([]);
  const [filterTable, setFilterTable] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [studentId, setStudentId] = useState(0);

  return (
    <div>
      <HeaderPage
        title="Estudiante"
        subTitle="Mantenimiento de estudiantes."
        button={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => setOpenDrawer(true)}
          >
            Nuevo Estudiante
          </Button>
        }
      />
      <FilterWrapper setFilterTable={setFilterTable} data={data} />
      <TableStudent
        data={data}
        setData={setData}
        filterTable={filterTable}
        setOpenModal={setOpenModal}
        setStudentId={setStudentId}
        setOpenDrawer={setOpenDrawer}
      />
      <DrawerStudent
        setOpen={setOpenDrawer}
        open={openDrawer}
        setData={setData}
        studentId={studentId}
        setStudentId={setStudentId}
      />
      <ModalStudent
        setOpen={setOpenModal}
        open={openModal}
        studentId={studentId}
        setStudentId={setStudentId}
      />
    </div>
  );
};

export default StudentPage;
