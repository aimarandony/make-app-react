import React, { useEffect, useState } from "react";

import FilterWrapper from "../components/FilterWrapper";
import HeaderPage from "../components/HeaderPage";
import TableInstitute from "../components/Institute/TableInstitute";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

const InstitutePage = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [filterTable, setFilterTable] = useState(null);

  useEffect(() => {
    setCount(5);
  }, []);

  return (
    <div>
      <HeaderPage
        title="Institución"
        subTitle="Mantenimiento de Instituciones y Carreras"
        button={
          <Button type="primary" icon={<PlusOutlined />} size="large">
            Nuevo Institución
          </Button>
        }
      />
      <FilterWrapper
        setFilterTable={setFilterTable}
        data={data}
        title={`${count} Instituciones`}
        inputPlaceholder="Buscar por nombre"
      />
      <TableInstitute data={data} setData={setData} filterTable={filterTable} />
    </div>
  );
};

export default InstitutePage;
