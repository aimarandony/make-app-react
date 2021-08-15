import React, { useEffect, useState } from "react";

import { InfoCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

const Field = styled.div`
  width: 100%;
  background: #dfe1e5;
  padding: 5px 10px;
  border: 0.2px dashed #2e3a59;
  border-top: none;
  display: flex;
  align-items: center;
`;

const Icon = styled(InfoCircleOutlined)`
  font-size: 16px;
  color: #2e3a59;
`;

const Text = styled.span`
  margin: 0;
  font-size: 14px;
  color: #2e3a59;
  margin-left: 10px;
`;

const FieldInformation = ({ text }) => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    text === "" ? setHidden(true) : setHidden(false);
  }, [text]);

  return (
    <>
      {!hidden && (
        <Field>
          <Icon />
          <Text>{text}</Text>
        </Field>
      )}
    </>
  );
};

export default FieldInformation;
