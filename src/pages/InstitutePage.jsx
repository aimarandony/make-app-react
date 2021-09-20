import React, { useEffect, useState } from "react";

import FilterWrapper from "../components/FilterWrapper";
import HeaderPage from "../components/HeaderPage";
import TableInstitute from "../components/Institute/TableInstitute";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { countInstitutes } from "../services/InstitutesService";

const InstitutePage = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [filterTable, setFilterTable] = useState(null);

  useEffect(() => {
    countInstitutes().then(setCount);
  }, []);

  return (
    <div>
      <HeaderPage
        title="Institución"
        subTitle="Mantenimiento de Instituciones y Carreras"
        button={
          <Button type="primary" icon={<PlusOutlined />} size="large">
            Nueva Institución
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
