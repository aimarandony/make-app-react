import React, { useEffect, useState } from "react";

import { getScholarshipsPaginator } from "../../services/ScholarshipService";

import CardScholarship from "./CardScholarship";

import { Pagination } from "antd";
import styled from "styled-components";

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const PaginationWrapper = styled.div`
  height: 100px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListScholarship = ({
  data,
  setData,
  setOpenModal,
  setOpenDrawer,
  setScholarshipIdModal,
  setScholarshipIdEdit,
  count,
  setCurrent,
  current,
}) => {
  const [pageSize, setPageSize] = useState(3);

  const getDataScholarship = (page, pageSize) => {
    getScholarshipsPaginator(page, pageSize).then(setData);
  };

  const handleChange = (page, pageSize) => {
    setCurrent(page);
    getDataScholarship(page - 1, pageSize);
  };

  useEffect(() => {
    getScholarshipsPaginator(0, 3).then((resp) => {
      setData(resp);
      setPageSize(3);
    });
  }, [setData]);

  return (
    <>
      <CardWrapper>
        {data.map((resp) => (
          <CardScholarship
            data={resp}
            key={resp.id}
            setOpenModal={setOpenModal}
            setScholarshipIdModal={setScholarshipIdModal}
            setScholarshipIdEdit={setScholarshipIdEdit}
            setOpenDrawer={setOpenDrawer}
          />
        ))}
      </CardWrapper>
      <PaginationWrapper>
        <Pagination
          defaultCurrent={1}
          current={current}
          pageSize={pageSize}
          total={count}
          onChange={handleChange}
        />
      </PaginationWrapper>
    </>
  );
};

export default ListScholarship;
