import React, { useEffect, useState } from "react";

import { Table } from "antd";

const TableInstitute = ({ data, setData, filterTable }) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
      setLoading(false)
  }, []);

  return (
    <Table
      loading={isLoading}
      dataSource={filterTable === null ? data : filterTable}
      pagination={{ pageSize: 4 }}
      scroll={{ x: 800 }}
    >
      <Table.Column title="Nombre Institución" />
      <Table.Column title="Tipo" />
      <Table.Column title="N° Carreras" />
      <Table.Column title="Acciones" />
    </Table>
  );
};

export default TableInstitute;
