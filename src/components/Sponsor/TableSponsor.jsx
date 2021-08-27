import React, { useEffect, useState } from "react";

import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { getSponsors } from "../../services/SponsorService";

const TableSponsor = ({
  data,
  setData,
  filterTable,
  setOpenDrawer,
  setSponsorIdEdit,
  setOpenModal,
  setSponsorIdModal,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleDetail = (id) => {
    setOpenModal(true);
    setSponsorIdModal(id);
  };

  const handleEdit = (id) => {
    setOpenDrawer(true);
    setSponsorIdEdit(id);
  };

  useEffect(() => {
    getSponsors().then((resp) => {
      resp.map((data) => {
        data.fullName = data.name + " " + data.lastName;
        data.countryName = data.country.name;
        data.key = data.id;
        return data;
      });
      setData(resp);
      setIsLoading(false);
    });
  }, [setData]);

  return (
    <Table
      loading={isLoading}
      dataSource={filterTable === null ? data : filterTable}
      pagination={{ pageSize: 4 }}
      scroll={{ x: 800 }}
    >
      <Table.Column title="Nombre y Apellido" dataIndex="fullName" />
      <Table.Column
        title="Celular"
        render={({ phone }) => (
          <span style={{ color: `${!phone && "gray"}` }}>
            {phone ? phone : "NO REGISTRADO"}
          </span>
        )}
      />
      <Table.Column
        title="Correo"
        render={({ email }) => (
          <span style={{ color: `${!email && "gray"}` }}>
            {email ? email : "NO REGISTRADO"}
          </span>
        )}
      />
      <Table.Column title="País" dataIndex="countryName" />
      <Table.Column
        title="Acciones"
        render={({ id }) => (
          <>
            <Button
              type="ghost"
              size="small"
              onClick={() => handleDetail(id)}
              icon={<EyeOutlined />}
              style={{ marginRight: "8px" }}
            >
              Ver Detalle
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => handleEdit(id)}
              icon={<EditOutlined />}
            >
              Editar
            </Button>
          </>
        )}
      />
    </Table>
  );
};

export default TableSponsor;
