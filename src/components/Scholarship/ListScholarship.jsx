import React, { useEffect } from "react";

import CardScholarship from "./CardScholarship";

import styled from "styled-components";
import { getScholarships } from "../../services/ScholarshipService";

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const ListScholarship = ({ data, setData }) => {
  useEffect(() => {
    getScholarships().then(setData);
  }, [setData]);

  return (
    <CardWrapper>
      {data.map((resp) => (
        <CardScholarship data={resp} key={resp.id} />
      ))}
    </CardWrapper>
  );
};

export default ListScholarship;
