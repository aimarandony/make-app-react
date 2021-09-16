import React, { useEffect, useState } from "react";

import {
  getScholarshipCount,
  getScholarshipsPaginator,
} from "../../services/ScholarshipService";

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
  setScholarshipIdModal,
}) => {
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(2);
  const [current, setCurrent] = useState(1);

  const getDataScholarship = (page, pageSize) => {
    getScholarshipsPaginator(page, pageSize).then(setData);
  };

  const handleChange = (page, pageSize) => {
    setCurrent(page);
    getDataScholarship(page - 1, pageSize);
  };

  useEffect(() => {
    getDataScholarship(0, pageSize);
    getScholarshipCount().then(setCount);
    setPageSize(2);
    // eslint-disable-next-line
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
