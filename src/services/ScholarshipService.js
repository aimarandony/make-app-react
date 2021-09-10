import clienteAxios from "../config/AxiosConfig";

const model = "scholarships";

const getScholarships = async () => {
  const resp = await clienteAxios.get(`/${model}`);
  return resp.data;
};

const getOneScholarship = async (id) => {
  const resp = await clienteAxios.get(`/${model}/detail/${id}`);
  return resp.data;
};

const createScholarship = async (data) => {
  const resp = await clienteAxios.post(`/${model}`, data);
  return resp.data;
};

export { getScholarships, createScholarship, getOneScholarship };
