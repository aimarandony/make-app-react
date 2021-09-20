import clienteAxios from "../config/AxiosConfig";

const model = "institutes"

const getInstitutes = async () => {
  const resp = await clienteAxios.get(`/${model}`);
  return resp.data;
};

const countInstitutes = async () => {
  const resp = await clienteAxios.get(`/${model}/count`);
  return resp.data;
};

export { getInstitutes, countInstitutes };
