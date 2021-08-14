import React from "react";

import { grey } from "@ant-design/colors";

import styled from "styled-components";

const Card = styled.div`
  width: 23%;
  min-width: 250px;
  background: white;
  box-shadow: 0 0 10px 0 rgb(183 192 206 / 20%);
  margin-bottom: 15px;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Count = styled.div`
  font-size: 30px;
  font-weight: bolder;
`;
const Text = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${grey.primary};
`;

const Icon = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
  border-radius: 10px;
  font-size: 18px;
`;

const CardCount = ({ count, text, bgIcon, colorIcon, icon }) => {
  return (
    <Card>
      <div>
        <Count>{count}</Count>
        <Text>{text}</Text>
      </div>
      <Icon bg={bgIcon} color={colorIcon}>
        {icon}
      </Icon>
    </Card>
  );
};

export default CardCount;
