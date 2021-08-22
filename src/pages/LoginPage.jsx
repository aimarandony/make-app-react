import React, { useContext } from "react";

import { Typography, Form, Input, Button } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import styled from "styled-components";
import Logo from "../assets/LogoMake.svg";
import { AuthContext } from "../auth/AuthContext";

import imageCoverURL from "../assets/loginCover01.jpg";

const imageCoverWidth = 250;
const wrapperWidth = 650;

const Login = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  width: ${wrapperWidth}px;
  height: 450px;
  box-shadow: 0 0 10px 0 rgb(183 192 206 / 20%);
`;

const ImageCover = styled.div`
  width: ${imageCoverWidth}px;
  height: 100%;
  background-image: url(${imageCoverURL});
  background-size: cover;
  background-position: center;
`;

const ContentLogin = styled.div`
  width: calc(${wrapperWidth}px - ${imageCoverWidth}px);
  padding: 40px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoMake = styled.img`
  width: 150px;
  margin-bottom: 5px;
`;

const LoginPage = () => {
  const { setAuthenticated } = useContext(AuthContext);

  const handleSubmit = () => {
    setAuthenticated(true);
  };

  return (
    <Login>
      <Wrapper>
        <ImageCover />
        <ContentLogin>
          <div>
            <LogoMake src={Logo} alt="Logo Make a Miracle" />
            <Typography.Paragraph style={{ color: "#57626d" }}>
              Bienvenido! Inicie Sesión para ingresar al sistema.
            </Typography.Paragraph>
            <Form
              layout="vertical"
              style={{ marginTop: "25px" }}
              onSubmitCapture={handleSubmit}
            >
              <Form.Item
                label="Usuario"
                name="username"
                rules={[{ required: true, message: "Usuario requerido!" }]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder="Ingrese su usuario"
                />
              </Form.Item>
              <Form.Item
                label="Contraseña"
                name="password"
                rules={[{ required: true, message: "Usuario requerido!" }]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="Ingrese su contraseña"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="full-width"
                >
                  Iniciar Sesión
                </Button>
              </Form.Item>
            </Form>
          </div>
        </ContentLogin>
      </Wrapper>
    </Login>
  );
};

export default LoginPage;
