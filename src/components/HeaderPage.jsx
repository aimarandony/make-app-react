import React from "react";

import { PageHeader } from "antd";

import styled from "styled-components";

const Header = styled(PageHeader)`
  padding: 0;
  margin-bottom: 25px;
`;

const HeaderPage = ({ title, subTitle, button }) => {
  return <Header title={title} subTitle={subTitle} extra={button} />;
};

export default HeaderPage;
