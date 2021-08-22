import React, { useEffect, useState } from "react";

import { getStudents } from "../../services/StudentService";

import { Button, Table } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

const TableStudent = ({
  data,
  setData,
  filterTable,
  setOpenModal,
  setStudentId,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleDetail = (id) => {
    setOpenModal(true);
    setStudentId(id);
    console.log(id);
  };

  const columns = [
    {
      title: "Nombre y Apellido",
      dataIndex: "fullName",
    },
    {
      title: "DNI",
      dataIndex: "nrDocument",
    },
    {
      title: "Correo",
      dataIndex: "email",
    },
    {
      title: "Celular",
      dataIndex: "phone",
    },
    {
      title: "Acciones",
      render: ({ id }) => (
        <>
          <Button
            type="ghost"
            size="small"
            icon={<EyeOutlined />}
            style={{ marginRight: "8px" }}
            onClick={() => handleDetail(id)}
          >
            Ver Detalle
          </Button>
          <Button type="primary" size="small" icon={<EditOutlined />}>
            Editar
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    getStudents().then((resp) => {
      resp.map((data) => {
        data.fullName = data.name + " " + data.lastName;
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
      columns={columns}
      dataSource={filterTable === null ? data : filterTable}
      pagination={{ pageSize: 4 }}
      scroll={{ x: 800 }}
    />
  );
};

export default TableStudent;
