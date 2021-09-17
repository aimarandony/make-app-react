import React from "react";

import { blue } from "@ant-design/colors";
import { HiBookmark } from "react-icons/hi";

import styled from "styled-components";
// import { Input } from "antd";

const Content = styled.div`
  width: 100%;
  padding: 15px;
  background: white;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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

const FilterWrapper = ({ count }) => {
  return (
    <Content>
      <Information>
        <HiBookmark size="24" color={blue.primary} />
        <Title>{count} Becados</Title>
      </Information>
      <InputContent>
        {/* <Input.Search
          size="large"
          placeholder={inputPlaceholder}
          onKeyUpCapture={(e) => handleSearch(e.target.value)}
        /> */}
      </InputContent>
    </Content>
  );
};

export default FilterWrapper;
