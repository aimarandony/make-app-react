import React, { useEffect } from "react";

import CardScholarship from "./CardScholarship";

import styled from "styled-components";
import { getScholarships } from "../../services/ScholarshipService";

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ListScholarship = ({
  data,
  setData,
  setOpenModal,
  setScholarshipIdModal,
}) => {
  useEffect(() => {
    getScholarships().then(setData);
  }, [setData]);

  return (
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
  );
};

export default ListScholarship;
