import React, { useEffect, useState } from "react";

import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { getSponsors } from "../../services/SponsorService";

const TableSponsor = ({ data, setData, filterTable }) => {
  const [isLoading, setIsLoading] = useState(true);

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
      <Table.Column title="Celular" dataIndex="phone" />
      <Table.Column title="Correo" dataIndex="email" />
      <Table.Column title="País" dataIndex="countryName" />
      <Table.Column
        title="Acciones"
        render={() => (
          <>
            <Button
              type="ghost"
              size="small"
              icon={<EyeOutlined />}
              style={{ marginRight: "8px" }}
            >
              Ver Detalle
            </Button>
            <Button type="primary" size="small" icon={<EditOutlined />}>
              Editar
            </Button>
          </>
        )}
      />
    </Table>
  );
};

export default TableSponsor;
