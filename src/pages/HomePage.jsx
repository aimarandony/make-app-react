import React from "react";

import HeaderPage from "../components/HeaderPage";
import CardCount from "../components/Dashboard/CardCount";

import { Button } from "antd";
import {
  BookOutlined,
  DatabaseOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import styled from "styled-components";

const ListCardCount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const HomePage = () => {
  const handleClickMain = () => {
    alert("Hello");
  };

  return (
    <div>
      <HeaderPage
        title="Dashboard"
        subTitle="Resumen general."
        button={
          <Button type="primary" onClick={handleClickMain} size="large">
            Asignar Beca
          </Button>
        }
      />
      <ListCardCount>
        <CardCount
          count="75"
          text="Estudiantes"
          icon={<UserOutlined />}
          bgIcon="#FFDEC0"
          colorIcon="#F88114"
        />
        <CardCount
          count="62"
          text="Patrocinadores"
          icon={<TeamOutlined />}
          bgIcon="#FFC0D7"
          colorIcon="#F52872"
        />
        <CardCount
          count="71"
          text="Becas Otorgadas"
          icon={<BookOutlined />}
          bgIcon="#ABFFE1"
          colorIcon="#10C786"
        />
        <CardCount
          count="21"
          text="Instituciones"
          icon={<DatabaseOutlined />}
          bgIcon="#E4C2FF"
          colorIcon="#AE53F4"
        />
      </ListCardCount>
    </div>
  );
};

export default HomePage;
