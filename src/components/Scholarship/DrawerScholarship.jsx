import React, { useEffect, useState } from "react";

import { getStudents } from "../../services/StudentService";
import { getSponsors } from "../../services/SponsorService";

import { blue } from "@ant-design/colors";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Row,
  Form,
  Select,
  Divider,
  Input,
  message,
} from "antd";

import { getInstitutes } from "../../services/InstitutesService";
import { getCareerByIdInstitute } from "../../services/CareerService";

import { useFormik } from "formik";
import * as Yup from "yup";

import styled from "styled-components";
import {
  createScholarship,
  getOneScholarship,
  getScholarshipCount,
  getScholarshipsPaginator,
} from "../../services/ScholarshipService";

const DividerForm = styled(Divider)`
  margin: 0 !important;
  margin-bottom: 20px !important;
  color: ${blue.primary} !important;
  font-size: 14px !important;

  &:not(:first-child) {
    margin-top: 15px !important;
  }
`;

const DrawerScholarship = ({
  setData,
  setOpen,
  open,
  setScholarshipIdEdit,
  scholarshipIdEdit,
  setCount,
  setCurrent
}) => {
  const [students, setStudents] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [careers, setCareers] = useState([]);
  const [careerDisabled, setCareerDisabled] = useState(true);

  const validationSchema = Yup.object().shape({
    student: Yup.object().shape({
      id: Yup.number().nullable().required("Estudiante es requerido."),
    }),
    sponsor: Yup.object().shape({
      id: Yup.number().nullable().required("Patrocinador es requerido."),
    }),
    institute: Yup.object().shape({
      id: Yup.number().nullable().required("Instituto es requerido."),
    }),
    career: Yup.object().shape({
      id: Yup.number().nullable().required("Carrera es requerido."),
    }),
    studentCode: Yup.string()
      .trim()
      .matches(/^[ñÑ0-9a-zA-Z ]*$/, "No se admiten caracteres especiales."),
  });

  const {
    handleSubmit,
    values,
    handleChange,
    setFieldValue,
    errors,
    touched,
    resetForm
  } = useFormik({
    initialValues: {
      student: {
        id: null,
      },
      sponsor: {
        id: null,
      },
      institute: {
        id: null,
      },
      career: {
        id: null,
      },
      studentCode: "",
    },
    validationSchema,
    onSubmit: (data) => {
      if (scholarshipIdEdit === 0) {
        createScholarship(data)
          .then(() => {
            message.success("Beca creada correctamente.");
            updateDataScholarships();
            handleCloseDrawer();
          })
          .catch(() => {
            message.error("Ocurrió un error al registrar.Inténtelo de nuevo.");
          });
      } else {
        console.log("EDIT");
      }
    },
  });

  const updateDataScholarships = () => {
    getScholarshipsPaginator(0, 4).then(setData);
    getScholarshipCount().then(setCount)
    setCurrent(1)
  };

  const handleCloseDrawer = () => {
    resetForm();
    setOpen(false);
    setScholarshipIdEdit(0);
  };

  const handleChangeInstitute = (id) => {
    if (id !== undefined) {
      getCareerByIdInstitute(id).then(setCareers);
      setFieldValue("institute.id", id);
      setCareerDisabled(false);
    } else {
      setCareers([]);
      setFieldValue("institute.id", null);
      setFieldValue("career.id", null);
      setCareerDisabled(true);
    }
  };

  const setDataScholarship = () => {
    getOneScholarship(scholarshipIdEdit).then(resp => {
      console.log("DRAWER", resp);
    })
  }

  useEffect(() => {
    getStudents().then(setStudents);
    getSponsors().then(setSponsors);
    getInstitutes().then(setInstitutes);
    scholarshipIdEdit !== 0 && setDataScholarship()
    // eslint-disable-next-line
  }, [scholarshipIdEdit]);

  return (
    <Drawer
      width={400}
      title="Becas"
      onClose={handleCloseDrawer}
      visible={open}
      footer={
        <Row gutter={12}>
          <Col span={8}>
            <Form.Item>
              <Button size="large" onClick={handleCloseDrawer} block>
                Cancelar
              </Button>
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item>
              <Button size="large" type="primary" onClick={handleSubmit} block>
                {scholarshipIdEdit !== 0 ? "Actualizar" : "Registrar"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      }
    >
      <Form layout="vertical" onSubmitCapture={handleSubmit}>
        <Row gutter={12}>
          <Col span={16}>
            <Form.Item label="Estudiante" required>
              <Select
                showSearch
                allowClear
                name="student.id"
                value={values.student.id}
                onChange={(id) => setFieldValue("student.id", id)}
                placeholder="Selecciona un Estudiante"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {students.map(({ id, name, lastName }) => (
                  <Select.Option value={id} key={id}>
                    {String(`${name} ${lastName}`).toUpperCase()}
                  </Select.Option>
                ))}
              </Select>
              {errors.student && touched.student ? (
                <div className="error-field">{errors.student.id}</div>
              ) : null}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label=".">
              <Button icon={<PlusOutlined />} block>
                Añadir
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={16}>
            <Form.Item label="Patrocinador" required>
              <Select
                showSearch
                allowClear
                name="sponsor.id"
                value={values.sponsor.id}
                onChange={(id) => setFieldValue("sponsor.id", id)}
                placeholder="Selecciona un Patrocinador"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {sponsors.map(({ id, name, lastName }) => (
                  <Select.Option value={id} key={id}>
                    {String(`${name} ${lastName}`).toUpperCase()}
                  </Select.Option>
                ))}
              </Select>
              {errors.sponsor && touched.sponsor ? (
                <div className="error-field">{errors.sponsor.id}</div>
              ) : null}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label=".">
              <Button icon={<PlusOutlined />} block>
                Añadir
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <DividerForm orientation="left">Datos de la Institución</DividerForm>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item label="Institución" required>
              <Select
                showSearch
                allowClear
                name="institute.id"
                value={values.institute.id}
                onChange={handleChangeInstitute}
                placeholder="Selecciona una Institución"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {institutes.map(({ id, name }) => (
                  <Select.Option value={id} key={id}>
                    {String(name).toUpperCase()}
                  </Select.Option>
                ))}
              </Select>
              {errors.institute && touched.institute ? (
                <div className="error-field">{errors.institute.id}</div>
              ) : null}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item label="Carrera" required>
              <Select
                showSearch
                allowClear
                name="career.id"
                value={values.career.id}
                onChange={(id) => setFieldValue("career.id", id)}
                placeholder="Selecciona una Carrera"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                disabled={careerDisabled}
              >
                {careers.map(({ id, nameCareer }) => (
                  <Select.Option value={id} key={id}>
                    {String(nameCareer).toUpperCase()}
                  </Select.Option>
                ))}
              </Select>
              {errors.career && touched.career ? (
                <div className="error-field">{errors.career.id}</div>
              ) : null}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item label="Código del Estudiante">
              <Input
                name="studentCode"
                value={values.studentCode}
                onChange={handleChange}
              />
              {errors.studentCode && touched.studentCode ? (
                <div className="error-field">{errors.studentCode}</div>
              ) : null}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default DrawerScholarship;
