import React from "react";

import { MdSchool, MdBook, MdDateRange } from "react-icons/md";

import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";

import moment from "moment";
import "moment/locale/es";

import styled from "styled-components";

const avatarSponsorURL = "https://i.pravatar.cc/150?img=32";
const avatarStudentURL = "https://i.pravatar.cc/150?img=8";

const Card = styled.div`
  width: 550px;
  height: 200px;
  padding: 20px 30px;
  background: white;
  box-shadow: 0px 1px 5px rgba(9, 30, 66, 0.1);
  display: flex;
  align-items: center;
`;

const Profile = styled.div`
  width: 150px;
  margin-right: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
const ProfileInfo = styled.div`
  display: block;
  text-align: center;
`;
const FullName = styled.h2`
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 2px;
`;

const Information = styled.div`
  margin-bottom: 15px;
`;
const RowInformation = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;
const HighText = styled.span`
  font-size: 14px;
  font-weight: 600;
`;
const IconInfo = styled.div`
  color: #64748b;
  height: auto;
  display: flex;
  align-items: center;
  * {
    font-size: 15px;
  }
`;
const InfoText = styled.span`
  font-size: 14px;
  font-weight: 400;
  margin-left: 5px;
`;

const CardScholarship = ({ data, setOpenModal, setScholarshipIdModal }) => {
  moment.locale("es");

  const handleDetail = (id) => {
    setOpenModal(true);
    setScholarshipIdModal(id);
  };

  const {
    id,
    studentFullName,
    sponsorFullName,
    instituteName,
    careerName,
    createAt,
    status,
  } = data;

  return (
    <Card>
      <Profile>
        <GroupAvatar>
          <StudentAvatar src={avatarStudentURL} alt="Student Avatar" />
          <ContentSponsorAvatar>
            <SponsorAvatar src={avatarSponsorURL} alt="Sponsor Avatar" />
          </ContentSponsorAvatar>
        </GroupAvatar>
        <ProfileInfo>
          <FullName>{studentFullName}</FullName>
          <Tag color="green">Beca {status}</Tag>
        </ProfileInfo>
      </Profile>
      <div>
        <Information>
          <RowInformation>
            <HighText>Patrocinado por:</HighText>
            <InfoText>{sponsorFullName}</InfoText>
          </RowInformation>
          <RowInformation>
            <IconInfo>
              <MdSchool />
            </IconInfo>
            <InfoText>{instituteName}</InfoText>
          </RowInformation>
          <RowInformation>
            <IconInfo>
              <MdBook />
            </IconInfo>
            <InfoText>{careerName}</InfoText>
          </RowInformation>
          <RowInformation>
            <IconInfo>
              <MdDateRange />
            </IconInfo>
            <InfoText>
              {moment(createAt).format("[Otorgado el] DD [de] MMMM [del] YYYY")}
            </InfoText>
          </RowInformation>
        </Information>
        <div>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleDetail(id)}
            style={{ marginRight: "10px" }}
          >
            Ver Detalle
          </Button>
          <Button type="primary" icon={<EditOutlined />}>
            Editar
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CardScholarship;
