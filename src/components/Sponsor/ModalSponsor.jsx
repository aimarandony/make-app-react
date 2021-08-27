import React, { useEffect, useState } from "react";

import { getOneSponsor } from "../../services/SponsorService";

import { Badge, Modal, Avatar } from "antd";
import { blue } from "@ant-design/colors";
import styled from "styled-components";

const avatarURL = "https://i.pravatar.cc/150?img=8";

const sponsorObj = {
  id: null,
  name: "",
  lastName: "",
  address: "",
  phone: "",
  email: "",
  country: {
    id: null,
    name: "",
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

const ModalSponsor = ({ setOpen, open, sponsorIdModal, setSponsorIdModal }) => {
  const [sponsor, setSponsor] = useState(sponsorObj);

  const {
    name,
    lastName,
    address,
    phone,
    email,
    country: { name: nameCountry },
  } = sponsor;

  const handleCloseModal = () => {
    setOpen(false);
    setSponsorIdModal(0);
    setSponsor(sponsorObj);
  };

  useEffect(() => {
    sponsorIdModal !== 0 &&
      getOneSponsor(sponsorIdModal).then((resp) => {
        console.log("MODAL", resp);
        setSponsor(resp);
      });
  }, [sponsorIdModal]);

  return (
    <Modal
      title="Información Patrocinador"
      visible={open}
      onOk={handleCloseModal}
      onCancel={handleCloseModal}
      cancelButtonProps={{ style: { display: "none" } }}
      width={400}
    >
      <InfoTop>
        <Badge color={"green"} dot>
          <Avatar shape="square" src={avatarURL} size={50} />
        </Badge>
        <NameStatus>
          <FullName>{`${name} ${lastName}`}</FullName>
        </NameStatus>
      </InfoTop>
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
              {address !== "" ? `${address} - ${nameCountry}` : "NO REGISTRADO"}
            </InfoContentText>
          </InfoContentItem>
        </InfoContent>
      </Information>
    </Modal>
  );
};

export default ModalSponsor;
