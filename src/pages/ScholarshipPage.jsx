import React, { useState } from "react";

import HeaderPage from "../components/HeaderPage";

import ListScholarship from "../components/Scholarship/ListScholarship";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

const ScholarshipPage = () => {
  const [data, setData] = useState([]);

  return (
    <div>
      <HeaderPage
        title="Becas"
        subTitle="Proceso de becas."
        button={
          <Button type="primary" icon={<PlusOutlined />} size="large">
            Nueva Beca
          </Button>
        }
      />
      <ListScholarship data={data} setData={setData} />
    </div>
  );
};

export default ScholarshipPage;
