import React from "react";

import { NavLink } from "react-router-dom";

import {
  BookOutlined,
  DatabaseOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { grey, blue } from "@ant-design/colors";

import styled from "styled-components";
import Logo from "../../assets/LogoMake.svg";

const SidebarLayout = styled.div`
  width: ${(props) => props.width}px;
  height: 100vh;
  background: white;
  box-shadow: 0 8px 10px 0 rgb(183 192 206 / 20%);
`;

const LogoContent = styled.div`
  width: 100%;
  height: ${(props) => props.height}px;
  background: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 2px solid #f2f4f9;
  border-right: 2px solid #f2f4f9;
  z-index: 999;
`;

const LogoMake = styled.img`
  width: 140px;
`;

const NavList = styled.ul`
  padding: 25px;
`;
const ListItem = styled.li`
  list-style: none;
  color: ${grey.primary} !important;
  font-size: ${(props) => (props.category ? "11px" : "16px")};
  font-weight: ${(props) => (props.category ? "700" : "400")};
  letter-spacing: ${(props) => props.category && "1px"};
  text-transform: ${(props) => props.category && "uppercase"};
  margin-bottom: ${(props) => props.category && "5px"};
  height: ${(props) => !props.category && "35px"};
  display: flex;
  align-items: center;

  .active {
    color: ${blue.primary};
  }
  &:not(:first-child) {
    margin-top: ${(props) => props.category && "20px"};
  }
`;
const Link = styled(NavLink)`
  text-decoration: none;
  color: black;
`;
const LinkName = styled.span`
  margin-left: 10px;
`;

const Sidebar = ({ width, headerHeight }) => {
  return (
    <SidebarLayout width={width}>
      <LogoContent height={headerHeight}>
        <LogoMake src={Logo} alt="Logo Make a Miracle" />
      </LogoContent>
      <NavList>
        <ListItem category>Principal</ListItem>
        <ListItem>
          <Link to="/home">
            <HomeOutlined />
            <LinkName>Inicio</LinkName>
          </Link>
        </ListItem>
        <ListItem category>Procesos</ListItem>
        <ListItem>
          <Link to="/studentr">
            <BookOutlined />
            <LinkName>Becas</LinkName>
          </Link>
        </ListItem>
        <ListItem category>Mantenimiento</ListItem>
        <ListItem>
          <Link to="/student">
            <UserOutlined />
            <LinkName>Estudiante</LinkName>
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/sponsor">
            <TeamOutlined />
            <LinkName>Patrocinador</LinkName>
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/studentr">
            <DatabaseOutlined />
            <LinkName>Institución</LinkName>
          </Link>
        </ListItem>
      </NavList>
    </SidebarLayout>
  );
};

export default Sidebar;
