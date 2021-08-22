import React, { useEffect, useState } from "react";

import { getStudents, updStatusStudent } from "../../services/StudentService";

import { Button, message, Popconfirm, Popover, Table, Tag } from "antd";
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
  };

  const handleChangeStatus = (id, confirm) => {
    if (confirm) {
      updStatusStudent(id)
        .then(() => {
          updateDataStudents();
          message.success("Estudiante actualizado.");
        })
        .catch(() =>
          message.warn("Hubo un problema al actualizar. Inténtelo de nuevo.")
        );
    }
  };

  const updateDataStudents = () => {
    getStudents().then((resp) => {
      resp.map((data) => {
        data.fullName = data.name + " " + data.lastName;
        data.key = data.id;
        return data;
      });
      setData(resp);
    });
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
      title: "Estado",
      render: ({ isActive, id }) => (
        <Popover content="Click para actualizar el estado.">
          <Popconfirm
            title={`¿Desea ${
              isActive ? "desactivar" : "activar"
            } este estudiante?`}
            onConfirm={() => handleChangeStatus(id, true)}
            onCancel={() => handleChangeStatus(id, false)}
            okText="Sí"
            cancelText="No"
          >
            <Tag
              color={isActive ? "green" : "red"}
              style={{ cursor: "pointer" }}
            >
              {isActive ? "Activo" : "Inactivo"}
            </Tag>
          </Popconfirm>
        </Popover>
      ),
      filters: [
        {
          text: "ACTIVO",
          value: true,
        },
        {
          text: "INACTIVO",
          value: false,
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => {
        let status = String(record.isActive);
        return status.indexOf(value) === 0;
      },
    },
    {
      title: "Acciones",
      render: ({ id, isActive }) => (
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
          {isActive && (
            <Button type="primary" size="small" icon={<EditOutlined />}>
              Editar
            </Button>
          )}
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