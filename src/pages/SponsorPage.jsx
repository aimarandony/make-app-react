import React, { useEffect, useState } from "react";

import HeaderPage from "../components/HeaderPage";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { countSponsors } from "../services/SponsorService";
import FilterWrapper from "../components/FilterWrapper";
import TableSponsor from "../components/Sponsor/TableSponsor";
import DrawerSponsor from "../components/Sponsor/DrawerSponsor";
import ModalSponsor from "../components/Sponsor/ModalSponsor";

const SponsorPage = () => {
  const [data, setData] = useState([]);
  const [filterTable, setFilterTable] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [sponsorIdModal, setSponsorIdModal] = useState(0);
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
      <TableSponsor
        data={data}
        setData={setData}
        filterTable={filterTable}
        setOpenModal={setOpenModal}
        setSponsorIdEdit={setSponsorIdEdit}
        setSponsorIdModal={setSponsorIdModal}
        setOpenDrawer={setOpenDrawer}
      />
      <DrawerSponsor
        setData={setData}
        setOpen={setOpenDrawer}
        open={openDrawer}
        sponsorIdEdit={sponsorIdEdit}
        setSponsorIdEdit={setSponsorIdEdit}
      />
      <ModalSponsor
        setOpen={setOpenModal}
        open={openModal}
        sponsorIdModal={sponsorIdModal}
        setSponsorIdModal={setSponsorIdModal}
      />
    </div>
  );
};

export default SponsorPage;
