import React, { useEffect, useState } from "react";

import FieldInformation from "../FieldInformation";

import { getDistricts } from "../../services/DistrictService";
import { createStudent, getStudents } from "../../services/StudentService";
import { getDataOfReniec } from "../../services/ReniecService";

import { useFormik } from "formik";
import * as Yup from "yup";

import moment from "moment";
import "moment/locale/es";

import {
  Button,
  Col,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Input,
  message,
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

const dateFormatList = ["DD-MM-YYYY", "YYYY-MM-DD"];

const DrawerStudent = ({ setOpen, open, setData }) => {
  moment.locale("es");

  const [districts, setDistricts] = useState([]);
  const [formatDateText, setFormatDateText] = useState("");
  const [btnValidarLoading, setBtnValidarLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    nrDocument: Yup.string()
      .trim()
      .matches(/^[0-9]*$/, "Solo se admiten números.")
      .length(8, "El DNI debe contener 8 dígitos.")
      .required("DNI es requerido."),
    name: Yup.string()
      .trim()
      .matches(/^[ñÑa-zA-ZáéíóúÁÉÍÓÚ ]*$/, "Solo se admiten letras.")
      .required("Nombres es requerido."),
    lastName: Yup.string()
      .trim()
      .matches(/^[ñÑa-zA-ZáéíóúÁÉÍÓÚ ]*$/, "Solo se admiten letras.")
      .required("Apellidos es requerido."),
    dateUtil: Yup.string().trim().required("Fecha es requerida."),
    gender: Yup.string().trim().required("Escoga un género."),
    district: Yup.object().shape({
      id: Yup.number().nullable().required("Distrito es requerido."),
    }),
    address: Yup.string()
      .trim()
      .matches(
        /^[ñÑ0-9a-zA-ZáéíóúÁÉÍÓÚ. ]*$/,
        "No se admiten caracteres especiales."
      ),
    phone: Yup.string()
      .matches(/^[0-9]*$/, "Solo se admiten números.")
      .length(9, "El Télefono debe contenter 9 dígitos."),
    email: Yup.string()
      .trim()
      .email("Formato no válido. (ej. correo@example.com)"),
  });

  const {
    handleSubmit,
    values,
    handleChange,
    setFieldValue,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      address: "",
      phone: "",
      email: "",
      nrDocument: "",
      dateUtil: "",
      dateOfBirth: "",
      gender: "",
      typeDocument: {
        id: "2",
      },
      district: {
        id: null,
      },
    },
    validationSchema,
    onSubmit: (data) => {
      console.log("DATA FORMIK", data);
      createStudent(data)
        .then(() => {
          message.success("Estudiante registrado correctamente.");
          updateDataStudents();
          handleCloseDrawer();
        })
        .catch(() =>
          message.error("Ocurrió un error al registrar. Inténtelo de nuevo.")
        );
    },
  });

  const handleChangeDate = (date, dateString) => {
    console.log();
    setFieldValue("dateOfBirth", dateString);
    setFieldValue("dateUtil", date);
    dateString !== ""
      ? setFormatDateText(moment(dateString).format("DD [de] MMMM [del] YYYY"))
      : setFormatDateText("");
  };

  const handleValidateDNI = () => {
    setBtnValidarLoading(true);
    if (values.nrDocument.length === 8) {
      getDataOfReniec({ dni: values.nrDocument }).then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          const nameAPI = resp.response.nombres;
          const lastNameAPI =
            resp.response.paterno + " " + resp.response.materno;
          setFieldValue("name", nameAPI);
          setFieldValue("lastName", lastNameAPI);
          message.success("DNI válido - RENIEC.");
        } else if (resp.status === 404) {
          setFieldValue("name", "");
          setFieldValue("lastName", "");
          message.error("DNI no encontrado - RENIEC.");
        }

        setBtnValidarLoading(false);
      });

      setTimeout(() => {
        message.warn("El tiempo de espera ha terminado. Vuelva a intentarlo.");
        setBtnValidarLoading(false);
        return true;
      }, 8000);
    }
  };

  const handleCloseDrawer = () => {
    resetForm();
    setOpen(false);
    setFormatDateText("");
  };

  const updateDataStudents = () => {
    getStudents().then((resp) => {
      resp.map((data) => {
        data.fullName = data.name + " " + data.lastName;
        data.key = data.id;
        return data;
      });
      setData(resp);
    });
  };

  useEffect(() => {
    getDistricts().then(setDistricts);
  }, []);

  return (
    <Drawer
      width={400}
      title="Registrar Estudiante"
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
                Registrar
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
            <Form.Item label="DNI" required>
              <Input
                name="nrDocument"
                value={values.nrDocument}
                onChange={handleChange}
              />
              {errors.nrDocument && touched.nrDocument ? (
                <div className="error-field">{errors.nrDocument}</div>
              ) : null}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label=".">
              <Button onClick={handleValidateDNI} loading={btnValidarLoading}>
                Validar
              </Button>
            </Form.Item>
          </Col>
        </Row>
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
        <Row>
          <Col>
            <Form.Item label="Género" required>
              <Radio.Group
                name="gender"
                value={values.gender}
                onChange={handleChange}
              >
                <Radio.Button value="MASCULINO">Masculino</Radio.Button>
                <Radio.Button value="FEMENINO">Femenino</Radio.Button>
              </Radio.Group>
              {errors.gender && touched.gender ? (
                <div className="error-field">{errors.gender}</div>
              ) : null}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item label="Fecha de Nacimiento" required>
              <DatePicker
                name="dateUtil"
                value={values.dateUtil}
                onChange={handleChangeDate}
                format={dateFormatList[1]}
                className="full-width"
              />
              {errors.dateUtil && touched.dateUtil ? (
                <div className="error-field">{errors.dateUtil}</div>
              ) : null}
              <FieldInformation text={formatDateText} />
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
                value={values.district.id}
                onChange={(id) => setFieldValue("district.id", id)}
                placeholder="Selecciona un Distrito"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {districts.map((data) => (
                  <Select.Option value={data.id} key={data.id}>
                    {data.name}
                  </Select.Option>
                ))}
              </Select>
              {errors.district && touched.district ? (
                <div className="error-field">{errors.district.id}</div>
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

export default DrawerStudent;
