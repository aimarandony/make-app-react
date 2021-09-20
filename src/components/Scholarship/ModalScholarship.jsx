import React, { useEffect, useState } from "react";

import { getOneScholarship } from "../../services/ScholarshipService";

import { Modal, Tag } from "antd";
import { MdSchool, MdBook, MdDateRange } from "react-icons/md";

import moment from "moment";
import "moment/locale/es";

import styled from "styled-components";

const avatarSponsorURL = "https://i.pravatar.cc/150?img=32";
const avatarStudentURL = "https://i.pravatar.cc/150?img=8";

const InfoTop = styled.div`
  display: flex;
  align-items: center;
  column-gap: 30px;
`;
const NameStatus = styled.div`
  display: block;
`;
const FullName = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

const GroupAvatar = styled.div`
  position: relative;
  width: 80px;
  margin-bottom: 20px;
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

const Information = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin-top: 25px;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2px;
`;

const InfoContentTitle = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: bold;
`;

const InfoContentText = styled.p`
  margin: 0;
  font-size: 16px;
`;

const InfoComment = styled.div`
  padding: 10px;
  border-radius: 3px;
  background: #e2e8f0;
  margin-top: 5px;
`;

const InfoContentTextIcon = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

const InfoIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  font-size: 20px;
  color: #64748b;
`;

const scholarshipObj = {};

const ModalScholarship = ({
  setOpen,
  open,
  scholarshipIdModal,
  setScholarshipIdModal,
}) => {
  moment.locale("es");

  const [scholarship, setScholarship] = useState(scholarshipObj);

  const {
    studentFullName,
    sponsorFullName,
    instituteName,
    studentCode,
    careerName,
    createAt,
    finishAt,
    description,
    status,
  } = scholarship;

  const handleCloseModal = () => {
    setOpen(false);
    setScholarshipIdModal(0);
    setScholarship(scholarshipObj);
  };

  const getColorByStatus = () => {
    switch (String(status).toLowerCase()) {
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

  useEffect(() => {
    scholarshipIdModal !== 0 &&
      getOneScholarship(scholarshipIdModal).then(setScholarship);
  }, [scholarshipIdModal]);

  return (
    <Modal
      title="Información Beca"
      visible={open}
      onOk={handleCloseModal}
      onCancel={handleCloseModal}
      cancelButtonProps={{ style: { display: "none" } }}
      width={380}
    >
      <InfoTop>
        <GroupAvatar>
          <StudentAvatar src={avatarStudentURL} alt="Student Avatar" />
          <ContentSponsorAvatar>
            <SponsorAvatar src={avatarSponsorURL} alt="Sponsor Avatar" />
          </ContentSponsorAvatar>
        </GroupAvatar>
        <NameStatus>
          <FullName>{studentFullName}</FullName>
          <Tag color={getColorByStatus()}>Beca {status}</Tag>
        </NameStatus>
      </InfoTop>
      <Information>
        <InfoContent>
          <InfoContentTitle>Patrocinado por:</InfoContentTitle>
          <InfoContentText>{sponsorFullName}</InfoContentText>
        </InfoContent>
        <InfoContent>
          <InfoContentTitle>Código Estudiante: </InfoContentTitle>
          <InfoContentText>{studentCode}</InfoContentText>
        </InfoContent>
        <InfoContent>
          <InfoContentTextIcon>
            <InfoIcon>
              <MdSchool />
            </InfoIcon>
            <InfoContentText>{instituteName}</InfoContentText>
          </InfoContentTextIcon>
          <InfoContentTextIcon>
            <InfoIcon>
              <MdBook />
            </InfoIcon>
            <InfoContentText>{careerName}</InfoContentText>
          </InfoContentTextIcon>
          <InfoContentTextIcon>
            <InfoIcon>
              <MdDateRange />
            </InfoIcon>
            <InfoContentText>
              {moment(createAt).format("[Otorgado el] DD [de] MMMM [del] YYYY")}
            </InfoContentText>
          </InfoContentTextIcon>
          <InfoContentTextIcon style={{ display: !finishAt && "none" }}>
            <InfoIcon>
              <MdDateRange />
            </InfoIcon>
            <InfoContentText>
              {moment(finishAt).format("[Finalizó el] DD [de] MMMM [del] YYYY")}
            </InfoContentText>
          </InfoContentTextIcon>
        </InfoContent>
        <InfoContent>
          <InfoContentTitle>Comentario:</InfoContentTitle>
          <InfoComment>
            <InfoContentText>
              {description ? description : "NO HAY COMENTARIOS."}
            </InfoContentText>
          </InfoComment>
        </InfoContent>
      </Information>
    </Modal>
  );
};

export default ModalScholarship;
