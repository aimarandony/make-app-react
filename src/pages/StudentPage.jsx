import React, { useState } from "react";

import HeaderPage from "../components/HeaderPage";

import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import FilterWrapper from "../components/FilterWrapper";
import TableStudent from "../components/Student/TableStudent";
import DrawerStudent from "../components/Student/DrawerStudent";

const StudentPage = () => {
  const [data, setData] = useState([]);
  const [filterTable, setFilterTable] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

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
      <TableStudent data={data} setData={setData} filterTable={filterTable} />
      <DrawerStudent setOpen={setOpenDrawer} open={openDrawer}/>
    </div>
  );
};

export default StudentPage;
