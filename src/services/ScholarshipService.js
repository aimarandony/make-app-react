import clienteAxios from "../config/AxiosConfig";

const model = "scholarship";

const getScholarships = async () => {
  const resp = await clienteAxios.get(`/${model}`);
  return resp.data;
};

const createScholarship = async (data) => {
  const resp = await clienteAxios.post(`/${model}`, data);
  return resp.data;
};

export { getScholarships, createScholarship };
