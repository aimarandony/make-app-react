import React from "react";

import { blue } from "@ant-design/colors";
import { HiUser } from "react-icons/hi";

import styled from "styled-components";
import { Input } from "antd";

const Content = styled.div`
  width: 100%;
  padding: 15px;
  background: white;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-left: 8px;
`;

const Information = styled.div`
  display: flex;
  align-items: center;
`;

const InputContent = styled.div`
  width: 320px;
`;

const FilterWrapper = ({ setFilterTable, data, title, inputPlaceholder }) => {
  const handleSearch = (value) => {
    setFilterTable(
      data.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(value.toLowerCase())
        )
      )
    );
  };

  return (
    <Content>
      <Information>
        <HiUser size="24" color={blue.primary} />
        <Title>{title}</Title>
      </Information>
      <InputContent>
        <Input.Search
          size="large"
          placeholder={inputPlaceholder}
          onKeyUpCapture={(e) => handleSearch(e.target.value)}
        />
      </InputContent>
    </Content>
  );
};

export default FilterWrapper;
