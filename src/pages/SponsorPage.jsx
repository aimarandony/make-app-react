import React, { useEffect, useState } from "react";

import HeaderPage from "../components/HeaderPage";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { countSponsors } from "../services/SponsorService";
import FilterWrapper from "../components/FilterWrapper";
import TableSponsor from "../components/Sponsor/TableSponsor";
import DrawerSponsor from "../components/Sponsor/DrawerSponsor";

const SponsorPage = () => {
  const [data, setData] = useState([]);
  const [filterTable, setFilterTable] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(true);
  const [sponsorIdEdit, setSponsorIdEdit] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    countSponsors().then(setCount);
  }, []);

  return (
    <div>
      <HeaderPage
        title="Patrocinador"
        subTitle="Mantenimiento de patrocinador."
        button={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => setOpenDrawer(true)}
          >
            Nuevo Patrocinador
          </Button>
        }
      />
      <FilterWrapper
        setFilterTable={setFilterTable}
        data={data}
        title={`${count} Patrocinadores`}
        inputPlaceholder="Buscar por Nombre y Apellido"
      />
      <TableSponsor data={data} setData={setData} filterTable={filterTable} />
      <DrawerSponsor
        setOpen={setOpenDrawer}
        open={openDrawer}
        sponsorIdEdit={sponsorIdEdit}
        setSponsorIdEdit={setSponsorIdEdit}
      />
    </div>
  );
};

export default SponsorPage;
