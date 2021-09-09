import clienteAxios from "../config/AxiosConfig";

const model = "students";

const getStudents = async () => {
  const resp = await clienteAxios.get(`/${model}`);
  return resp.data;
};

const getOneStudent = async (id) => {
  const resp = await clienteAxios.get(`/${model}/${id}`);
  return resp.data;
};

const countStudents = async () => {
  const resp = await clienteAxios.get(`/${model}/count`);
  return resp.data;
};

const createStudent = async (data) => {
  const resp = await clienteAxios.post(`/${model}`, data);
  return resp.data;
};

const updStatusStudent = async (id) => {
  const resp = await clienteAxios.patch(`/${model}/${id}`);
  return resp.data;
};

const updateStudent = async (data, id) => {
  const resp = await clienteAxios.put(`/${model}/${id}`, data);
  return resp.data;
};

export {
  getStudents,
  countStudents,
  createStudent,
  updateStudent,
  getOneStudent,
  updStatusStudent,
};
