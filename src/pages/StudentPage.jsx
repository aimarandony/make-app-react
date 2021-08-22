import React, { useState, useEffect } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { countStudents } from "../services/StudentService";

import HeaderPage from "../components/HeaderPage";
import FilterWrapper from "../components/FilterWrapper";
import TableStudent from "../components/Student/TableStudent";
import DrawerStudent from "../components/Student/DrawerStudent";
import ModalStudent from "../components/Student/ModalStudent";

const StudentPage = () => {
  const [data, setData] = useState([]);
  const [filterTable, setFilterTable] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [studentIdModal, setStudentIdModal] = useState(0);
  const [studentIdEdit, setStudentIdEdit] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    countStudents().then(setCount);
  }, []);

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
      <FilterWrapper
        setFilterTable={setFilterTable}
        data={data}
        title={`${count} Estudiantes`}
        inputPlaceholder="Buscar por Nombre, Apellido ó DNI"
      />
      <TableStudent
        data={data}
        setData={setData}
        filterTable={filterTable}
        setOpenModal={setOpenModal}
        setStudentIdModal={setStudentIdModal}
        setStudentIdEdit={setStudentIdEdit}
        setOpenDrawer={setOpenDrawer}
      />
      <DrawerStudent
        setOpen={setOpenDrawer}
        open={openDrawer}
        setData={setData}
        studentIdEdit={studentIdEdit}
        setStudentIdEdit={setStudentIdEdit}
      />
      <ModalStudent
        setOpen={setOpenModal}
        open={openModal}
        studentIdModal={studentIdModal}
        setStudentIdModal={setStudentIdModal}
      />
    </div>
  );
};

export default StudentPage;
