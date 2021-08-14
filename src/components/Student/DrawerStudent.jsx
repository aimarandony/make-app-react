import React from "react";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  Radio,
  Row,
  Select,
} from "antd";
import { blue } from "@ant-design/colors";

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

const DrawerStudent = ({ setOpen, open }) => {
  return (
    <Drawer
      width={400}
      title="Registrar Estudiante"
      onClose={() => setOpen(false)}
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
                Registrar
              </Button>
            </Form.Item>
          </Col>
        </Row>
      }
    >
      <Form layout="vertical">
        <DividerForm orientation="left">1. Información Personal</DividerForm>
        <Row gutter={12}>
          <Col span={18}>
            <Form.Item label="DNI" required>
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label=".">
              <Button>Validar</Button>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Nombres" required>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Apellidos" required>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Género" required>
              <Radio.Group defaultValue="M">
                <Radio.Button value="M">Masculino</Radio.Button>
                <Radio.Button value="F">Femenino</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Fecha de Nacimiento" required>
              <DatePicker className="full-width" />
            </Form.Item>
          </Col>
        </Row>
        <DividerForm orientation="left">2. Información de Contacto</DividerForm>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Distrito" required>
              <Select
                showSearch
                placeholder="Selecciona un Distrito"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Select.Option value="jack">San Juan de Lurigancho</Select.Option>
                <Select.Option value="lucy">Callao</Select.Option>
                <Select.Option value="tom">Comas</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Teléfono">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Dirección">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Correo">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default DrawerStudent;
