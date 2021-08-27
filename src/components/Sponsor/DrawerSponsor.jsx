import React, { useEffect, useState } from "react";

import { blue } from "@ant-design/colors";
import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
} from "antd";

import { useFormik } from "formik";
import * as Yup from "yup";

import styled from "styled-components";
import { getCountries } from "../../services/CountryService";
import {
  createSponsor,
  getOneSponsor,
  getSponsors,
  updateSponsor,
} from "../../services/SponsorService";

const DividerForm = styled(Divider)`
  margin: 0 !important;
  margin-bottom: 20px !important;
  color: ${blue.primary} !important;
  font-size: 14px !important;

  &:not(:first-child) {
    margin-top: 15px !important;
  }
`;

const DrawerSponsor = ({
  setOpen,
  open,
  setData,
  sponsorIdEdit,
  setSponsorIdEdit,
}) => {
  const [countries, setCountries] = useState([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .matches(/^[ñÑa-zA-ZáéíóúÁÉÍÓÚ ]*$/, "Solo se admiten letras.")
      .required("Nombres es requerido."),
    lastName: Yup.string()
      .trim()
      .matches(/^[ñÑa-zA-ZáéíóúÁÉÍÓÚ ]*$/, "Solo se admiten letras.")
      .required("Apellidos es requerido."),
    address: Yup.string()
      .trim()
      .matches(
        /^[ñÑ0-9a-zA-ZáéíóúÁÉÍÓÚ. ]*$/,
        "No se admiten caracteres especiales."
      ),
    phone: Yup.string().matches(/^[0-9]*$/, "Solo se admiten números."),
    email: Yup.string()
      .trim()
      .email("Formato no válido. (ej. correo@example.com)"),
    country: Yup.object().shape({
      id: Yup.number().nullable().required("País es requerido."),
    }),
  });

  const {
    handleSubmit,
    values,
    handleChange,
    setFieldValue,
    errors,
    touched,
    resetForm,
    setValues,
  } = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      address: "",
      phone: "",
      email: "",
      country: {
        id: null,
      },
    },
    validationSchema,
    onSubmit: (data) => {
      console.log(data);
      if (sponsorIdEdit === 0) {
        createSponsor(data)
          .then(() => {
            message.success("Patrocinador creado correctamente.");
            updateDataSponsors();
            handleCloseDrawer();
          })
          .catch(() => {
            message.error("Ocurrió un error al registrar.Inténtelo de nuevo.");
          });
      } else {
        updateSponsor(data, sponsorIdEdit)
          .then(() => {
            message.success("Patrocinador actualizado correctamente");
            updateDataSponsors();
            handleCloseDrawer();
          })
          .catch(() => {
            message.error("Ocurrió un error al actualizar.Inténtelo de nuevo.");
          });
      }
    },
  });

  const updateDataSponsors = () => {
    getSponsors().then((resp) => {
      resp.map((data) => {
        data.fullName = data.name + " " + data.lastName;
        data.countryName = data.country.name;
        data.key = data.id;
        return data;
      });
      setData(resp);
    });
  };

  const handleCloseDrawer = () => {
    resetForm();
    setOpen(false);
    setSponsorIdEdit(0);
  };

  const setDataSponsor = () => {
    getOneSponsor(sponsorIdEdit).then((resp) => {
      console.log("DRAWER", resp);
      setValues({
        id: resp.id,
        name: resp.name,
        lastName: resp.lastName,
        address: resp.address,
        phone: resp.phone,
        email: resp.email,
        country: {
          id: resp.country.id,
        },
      });
    });
  };

  useEffect(() => {
    getCountries().then(setCountries);
    sponsorIdEdit !== 0 && setDataSponsor();
    // eslint-disable-next-line
  }, [sponsorIdEdit]);

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
              <Button size="large" type="primary" onClick={handleSubmit} block>
                {sponsorIdEdit !== 0 ? "Actualizar" : "Registrar"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      }
    >
      <Form layout="vertical" onSubmitCapture={handleSubmit}>
        <DividerForm orientation="left">1. Información Personal</DividerForm>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Nombres" required>
              <Input name="name" value={values.name} onChange={handleChange} />
              {errors.name && touched.name ? (
                <div className="error-field">{errors.name}</div>
              ) : null}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Apellidos" required>
              <Input
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
              />
              {errors.lastName && touched.lastName ? (
                <div className="error-field">{errors.lastName}</div>
              ) : null}
            </Form.Item>
          </Col>
        </Row>
        <DividerForm orientation="left">2. Información de Contacto</DividerForm>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="País" required>
              <Select
                showSearch
                name="country.id"
                value={values.country.id}
                onChange={(id) => setFieldValue("country.id", id)}
                placeholder="Selecciona un País"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {countries.map((data) => (
                  <Select.Option value={data.id} key={data.id}>
                    {data.name}
                  </Select.Option>
                ))}
              </Select>
              {errors.country && touched.country ? (
                <div className="error-field">{errors.country.id}</div>
              ) : null}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Teléfono">
              <Input
                name="phone"
                value={values.phone}
                onChange={handleChange}
              />
              {errors.phone && touched.phone ? (
                <div className="error-field">{errors.phone}</div>
              ) : null}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label="Dirección">
              <Input
                name="address"
                value={values.address}
                onChange={handleChange}
              />
              {errors.address && touched.address ? (
                <div className="error-field">{errors.address}</div>
              ) : null}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Correo">
              <Input
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && touched.email ? (
                <div className="error-field">{errors.email}</div>
              ) : null}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default DrawerSponsor;
