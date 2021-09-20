import React, { useState } from "react";

import { HiOutlineDotsVertical } from "react-icons/hi";

import {
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button, Tag, Menu, Dropdown, Modal, Input, Form, message } from "antd";

import moment from "moment";
import "moment/locale/es";

import styled from "styled-components";
import { updateStatus } from "../../services/ScholarshipService";

const { confirm } = Modal;

const avatarSponsorURL = "https://i.pravatar.cc/150?img=32";
const avatarStudentURL = "https://i.pravatar.cc/150?img=8";

const GroupAvatar = styled.div`
  position: relative;
  width: 80px;
  margin-bottom: 10px;
`;
const StudentAvatar = styled.img`
  width: 100%;
  border-radius: 500px;
`;
const ContentSponsorAvatar = styled.div`
  width: 45px;
  height: 45px;
  position: absolute;
  bottom: -15px;
  right: -15px;
  border-radius: 500px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SponsorAvatar = styled.img`
  width: 40px;
  border-radius: 500px;
`;

const Card = styled.div`
  width: 100%;
  padding: 20px 30px;
  background: white;
  box-shadow: 0px 1px 5px rgba(9, 30, 66, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  column-gap: 35px;
`;
const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 20px;
`;
const InfoContentItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 0;
`;
const InfoTitle = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 22px;
  color: #64748b;
`;
const InfoData = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: #1e293b;
`;

const GroupButtons = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;
const ButtonDots = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardScholarship = ({
  data,
  setOpenModal,
  setScholarshipIdModal,
  setOpenDrawer,
  setScholarshipIdEdit,
}) => {
  moment.locale("es");

  const [obs, setObs] = useState("");

  const {
    id,
    studentFullName,
    sponsorFullName,
    instituteName,
    careerName,
    createAt,
    status,
  } = data;

  const handleChangeObs = (e) => {
    console.log(String(e.target.value));
    setObs(String(e.target.value));
  };

  const handleChangeStatus = (status) => {
    confirm({
      title: `¿Desea ${status} la beca de ${studentFullName}?`,
      icon: <ExclamationCircleOutlined />,
      content: (
        <Form
          layout="vertical"
          style={{ marginTop: "15px", marginBottom: "0" }}
        >
          <Form.Item label="Comentario:">
            <Input.TextArea
              rows={4}
              name="obs"
              onChange={handleChangeObs}
              placeholder="Escriba una Observación ..."
            ></Input.TextArea>
          </Form.Item>
        </Form>
      ),
      okText: `Si, ${status}`,
      cancelText: "No, Cancelar",
      onOk() {
        console.log(obs);
        if (status === "SUSPENDER") {
          updateStatus(id, { status: "suspendido", observation: obs })
            .then(() => {
              message.success("Estado actualizado a SUSPENDIDO.");
            })
            .catch(() => {
              message.warn(
                "El estado no se pudo actualizar. Inténtalo de nuevo."
              );
            });
        } else if (status === "FINALIZAR") {
          updateStatus(id, { status: "finalizado", observation: obs })
            .then(() => {
              message.success("Estado actualizado a FINALIZADO.");
            })
            .catch(() => {
              message.warn(
                "El estado no se pudo actualizar. Inténtalo de nuevo."
              );
            });
        }
      },
    });
  };

  const menu = (
    <Menu>
      <Menu.ItemGroup title="Cambiar Estado">
        <Menu.Item key="0">
          <Button type="text" onClick={() => handleChangeStatus("SUSPENDER")}>
            Suspender
          </Button>
        </Menu.Item>
        <Menu.Item key="1">
          <Button type="text" onClick={() => handleChangeStatus("FINALIZAR")}>
            Finalizar
          </Button>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );

  const getColorByStatus = () => {
    switch (status.toLowerCase()) {
      case "activo":
        return "green";
      case "suspendido":
        return "purple";
      case "finalizado":
        return "blue";
      default:
        return "activo";
    }
  };

  const handleDetail = (id) => {
    setOpenModal(true);
    setScholarshipIdModal(id);
  };

  const handleEdit = (id) => {
    setOpenDrawer(true);
    setScholarshipIdEdit(id);
  };

  return (
    <Card>
      <Content>
        <GroupAvatar>
          <StudentAvatar src={avatarStudentURL} alt="Student Avatar" />
          <ContentSponsorAvatar>
            <SponsorAvatar src={avatarSponsorURL} alt="Sponsor Avatar" />
          </ContentSponsorAvatar>
        </GroupAvatar>
        <InfoContent style={{ width: "150px" }}>
          <InfoContentItem>
            <InfoTitle>Estudiante:</InfoTitle>
            <InfoData style={{ textTransform: "capitalize" }}>
              {String(studentFullName).length > 19
                ? String(studentFullName).toLowerCase().substring(0, 16) + "..."
                : String(studentFullName).toLowerCase()}
            </InfoData>
          </InfoContentItem>
          <InfoContentItem>
            <InfoTitle>Patrocinador:</InfoTitle>
            <InfoData style={{ textTransform: "capitalize" }}>
              {String(sponsorFullName).length > 19
                ? String(sponsorFullName).toLowerCase().substring(0, 16) + "..."
                : String(sponsorFullName).toLowerCase()}
            </InfoData>
          </InfoContentItem>
        </InfoContent>
        <InfoContent style={{ width: "200px" }}>
          <InfoContentItem>
            <InfoTitle>Institución:</InfoTitle>
            <InfoData>{String(instituteName).toUpperCase()}</InfoData>
          </InfoContentItem>
          <InfoContentItem>
            <InfoTitle>Carrera:</InfoTitle>
            <InfoData style={{ textTransform: "capitalize" }}>
              {String(careerName).length > 25
                ? String(careerName).toLowerCase().substring(0, 22) + "..."
                : String(careerName).toLowerCase()}
            </InfoData>
          </InfoContentItem>
        </InfoContent>
        <InfoContent>
          <InfoContentItem>
            <InfoTitle>Fecha otorgada:</InfoTitle>
            <InfoData>
              {moment(createAt).format("DD [de] MMMM [del] YYYY")}
            </InfoData>
          </InfoContentItem>
          <InfoContentItem>
            <InfoTitle>Estado Beca:</InfoTitle>
            <InfoData>
              <Tag
                color={getColorByStatus()}
                style={{ textTransform: "capitalize" }}
              >
                {status}
              </Tag>
            </InfoData>
          </InfoContentItem>
        </InfoContent>
      </Content>
      <GroupButtons>
        <Dropdown overlay={menu} trigger={["click"]}>
          <ButtonDots icon={<HiOutlineDotsVertical />} />
        </Dropdown>
        <Button icon={<EyeOutlined />} onClick={() => handleDetail(id)}>
          Ver Detalle
        </Button>
        <Button
          type="primary"
          onClick={() => handleEdit(id)}
          icon={<EditOutlined />}
        >
          Editar
        </Button>
      </GroupButtons>
    </Card>
  );
};

export default CardScholarship;
