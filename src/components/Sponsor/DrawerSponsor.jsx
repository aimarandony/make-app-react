import React from "react";

import { blue } from "@ant-design/colors";
import { Button, Col, Divider, Drawer, Form, Input, Row, Select } from "antd";

import styled from "styled-components";

const DividerForm = styled(Divider)`
  margin: 0 !important;
  margin-bottom: 20px !important;
  color: ${blue.primary} !important;
  font-size: 14px !important;

  &:not(:first-child) {
    margin-top: 15px !important;
  }
`;

const DrawerSponsor = ({ setOpen, open, sponsorIdEdit, setSponsorIdEdit }) => {
  const handleCloseDrawer = () => {
    setOpen(false);
  };

  return (
    <Drawer
      width={400}
      title="Patrocinador"
      onClose={handleCloseDrawer}
      visible={open}
      footer={
        <Row gutter={12}>
          <Col span={8}>
            <Form.Item>
              <Button size="large" onClick={() => setOpen(false)} block>
                Cancelar
              </Button>
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item>
              <Button size="large" type="primary" block>
                {sponsorIdEdit !== 0 ? "Actualizar" : "Registrar"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      }
    >
      <Form layout="vertical">
        <DividerForm orientation="left">1. Información Personal</DividerForm>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Nombres" required>
              <Input name="name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Apellidos" required>
              <Input name="lastName" />
            </Form.Item>
          </Col>
        </Row>
        <DividerForm orientation="left">2. Información de Contacto</DividerForm>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Distrito" required>
              <Select
                showSearch
                name="district.id"
                placeholder="Selecciona un Distrito"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Select.Option>PERU</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Teléfono">
              <Input name="phone" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Dirección">
              <Input name="address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Correo">
              <Input name="email" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default DrawerSponsor;
