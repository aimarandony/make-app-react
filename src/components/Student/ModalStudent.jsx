import React, { useEffect, useState } from "react";

import moment from "moment";
import "moment/locale/es";

import { getOneStudent } from "../../services/StudentService";

import { Avatar, Badge, Modal, Tag } from "antd";
import { blue } from "@ant-design/colors";
import styled from "styled-components";

const avatarURL = "https://i.pravatar.cc/150?img=8";

const studentObj = {
  id: null,
  name: "",
  lastName: "",
  nrDocument: "",
  address: "",
  phone: "",
  email: "",
  dateOfBirth: "",
  isActive: true,
  district: {
    id: null,
    name: "",
    province: {
      id: null,
      name: "",
      country: {
        id: null,
        name: "",
      },
    },
  },
};

const InfoTop = styled.div`
  display: flex;
  align-items: center;
`;
const NameStatus = styled.div`
  display: block;
  margin-left: 15px;
`;
const FullName = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;
const Information = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
const InfoTitle = styled.h6`
  margin: 0;
  font-size: 16px;
  color: ${blue.primary};
`;
const InfoContent = styled.div`
  display: flex;
  margin-top: 10px;
`;
const InfoContentItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
`;
const InfoContentTitle = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
`;
const InfoContentText = styled.p`
  margin: 0;
  font-size: 15px;
  color: #5b6d86;
`;

const ModalStudent = ({ setOpen, open, studentId, setStudentId }) => {
  moment.locale("es");

  const [student, setStudent] = useState(studentObj);

  const {
    name,
    lastName,
    nrDocument,
    isActive,
    dateOfBirth,
    email,
    phone,
    address,
    district: {
      name: nameDistrict,
      province: {
        name: nameProvince,
        country: { name: nameCountry },
      },
    },
    createAt,
  } = student;

  const handleCloseModal = () => {
    setOpen(false);
    setStudentId(0);
    setStudent(studentObj);
  };

  useEffect(() => {
    studentId !== 0 && getOneStudent(studentId).then(setStudent);
  }, [studentId]);

  return (
    <Modal
      title="Información Estudiante"
      visible={open}
      onOk={handleCloseModal}
      onCancel={handleCloseModal}
      cancelButtonProps={{ style: { display: "none" } }}
      width={450}
    >
      <InfoTop>
        <Badge color={isActive ? "green" : "red"} dot>
          <Avatar shape="square" src={avatarURL} size={50} />
        </Badge>
        <NameStatus>
          <FullName>{`${name} ${lastName}`}</FullName>
          <Tag color={isActive ? "green" : "red"}>
            {isActive ? "Activo" : "Inactivo"}
          </Tag>
        </NameStatus>
      </InfoTop>
      <Information>
        <InfoTitle>Información Personal</InfoTitle>
        <InfoContent>
          <InfoContentItem>
            <InfoContentTitle>Documento</InfoContentTitle>
            <InfoContentText>{nrDocument}</InfoContentText>
          </InfoContentItem>
          <InfoContentItem>
            <InfoContentTitle>Fecha Nacimiento</InfoContentTitle>
            <InfoContentText>
              {moment(dateOfBirth).format("DD [de] MMMM [del] YYYY")}
            </InfoContentText>
          </InfoContentItem>
          <InfoContentItem>
            <InfoContentTitle>Edad</InfoContentTitle>
            <InfoContentText>
              {`${moment().diff(dateOfBirth, "years", false)} años`}
            </InfoContentText>
          </InfoContentItem>
        </InfoContent>
      </Information>
      <Information>
        <InfoTitle>Información de Contacto</InfoTitle>
        <InfoContent>
          <InfoContentItem>
            <InfoContentTitle>Correo</InfoContentTitle>
            <InfoContentText>
              {email !== "" ? email : "NO REGISTRADO"}
            </InfoContentText>
          </InfoContentItem>
          <InfoContentItem>
            <InfoContentTitle>Teléfono</InfoContentTitle>
            <InfoContentText>
              {phone !== "" ? phone : "NO REGISTRADO"}
            </InfoContentText>
          </InfoContentItem>
        </InfoContent>
        <InfoContent>
          <InfoContentItem>
            <InfoContentTitle>Dirección</InfoContentTitle>
            <InfoContentText>
              {address !== ""
                ? `${address}, ${nameDistrict}, ${nameProvince} - ${nameCountry}`
                : "NO REGISTRADO"}
            </InfoContentText>
          </InfoContentItem>
        </InfoContent>
      </Information>
      <Information>
        <InfoTitle>Otros</InfoTitle>
        <InfoContent>
          <InfoContentItem>
            <InfoContentTitle>Fecha de registro</InfoContentTitle>
            <InfoContentText>{moment(createAt).fromNow()}</InfoContentText>
          </InfoContentItem>
        </InfoContent>
      </Information>
    </Modal>
  );
};

export default ModalStudent;
