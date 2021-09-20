import React, { useEffect, useState } from "react";

import { getInstitutes } from "../../services/InstitutesService";

import { Button, Table, Tag } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

const TableInstitute = ({ data, setData, filterTable }) => {
  const [isLoading, setLoading] = useState(true);

  const handleDetail = (id) => {
    console.log("DETAIL", id);
  };

  const handleEdit = (id) => {
    console.log("EDIT", id);
  };

  useEffect(() => {
    getInstitutes().then((resp) => {
      resp.map((data) => {
        data.key = data.id;
        data.nameType = data.typeInstitute.name;
        data.nroCareers = "10 Carreras";
        return data;
      });
      setData(resp);
      setLoading(false);
    });
  }, [setData]);

  return (
    <Table
      loading={isLoading}
      dataSource={filterTable === null ? data : filterTable}
      pagination={{ pageSize: 4 }}
      scroll={{ x: 800 }}
    >
      <Table.Column
        title="Nombre Institución"
        render={({ name }) => <span>{name.toUpperCase()}</span>}
      />
      <Table.Column
        title="Tipo"
        render={({ nameType }) => (
          <Tag color={nameType === "UNIVERSIDAD" ? "blue" : "cyan"}>
            {nameType}
          </Tag>
        )}
      />
      <Table.Column title="N° Carreras" dataIndex="nroCareers" />
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

export default TableInstitute;
