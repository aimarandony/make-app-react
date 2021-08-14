import React, { useContext } from "react";

import Sidebar from "../Sidebar";
import { AuthContext } from "../../auth/AuthContext";

import { Avatar, Button, Dropdown, Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import styled from "styled-components";

const sidebarWidth = 250;
const headerHeight = 60;

const avatarURL =
  "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";

const DashboardLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const ContentRight = styled.div`
  width: calc(100% - ${sidebarWidth}px);
  height: 100vh;
`;

const Header = styled.div`
  width: 100%;
  height: ${headerHeight}px;
  background: white;
  box-shadow: 3px 0 10px 0 rgb(183 192 206 / 20%);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 30px;
`;

const Content = styled.div`
  width: 100%;
  height: calc(100vh - ${headerHeight}px);
  padding: 30px;
  overflow: auto;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${(props) => props.large && "column"};
  cursor: ${(props) => (props.large ? "default" : "pointer")};
  padding: ${(props) => props.large && "20px"};
`;

const ProfileName = styled.p`
  margin: 0;
  font-size: 15px;
  font-size: ${(props) => (props.large ? "16px" : "15px")};
  font-weight: 600;
  line-height: 1.2;
  text-align: ${(props) => props.large && "center"};
  margin-top: ${(props) => props.large && "10px"};
`;

const ProfileRole = styled.p`
  margin: 0;
  font-size: 13px;
  font-size: ${(props) => (props.large ? "14px" : "13px")};
  line-height: 1.2;
  color: #57626d;
  text-align: ${(props) => props.large && "center"};
`;

const Dashboard = ({ children }) => {
  const { setAuthenticated } = useContext(AuthContext);

  const handleLogOut = () => {
    setAuthenticated(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1menu">
        <Profile large>
          <Avatar src={avatarURL} style={{ width: "60px", height: "60px" }} />
          <div>
            <ProfileName large>Aimar Andony</ProfileName>
            <ProfileRole large>Administrador</ProfileRole>
          </div>
        </Profile>
      </Menu.Item>
      <Menu.Item key="2menu">
        <Button type="text" icon={<LogoutOutlined />} onClick={handleLogOut}>
          Cerrar Sesión
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <DashboardLayout>
      <Sidebar width={sidebarWidth} headerHeight={headerHeight} />
      <ContentRight>
        <Header>
          <Dropdown
            overlay={menu}
            placement="bottomRight"
            trigger={["click"]}
            overlayStyle={{ marginTop: "200px" }}
          >
            <Profile>
              <Avatar src={avatarURL} style={{ marginRight: "10px" }} />
              <div>
                <ProfileName>Aimar Andony</ProfileName>
                <ProfileRole>Administrador</ProfileRole>
              </div>
            </Profile>
          </Dropdown>
        </Header>
        <Content className="container">{children}</Content>
      </ContentRight>
    </DashboardLayout>
  );
};

export default Dashboard;
