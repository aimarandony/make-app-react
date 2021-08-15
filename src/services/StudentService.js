import clienteAxios from "../config/AxiosConfig";

const getStudents = async () => {
  const resp = await clienteAxios.get("/student");
  return resp.data;
};

const countStudents = async () => {
  const resp = await clienteAxios.get("/student/count");
  return resp.data;
};

const createStudent = async (data) => {
  const resp = await clienteAxios.post("/student", data);
  return resp.data;
};

export { getStudents, countStudents, createStudent };
