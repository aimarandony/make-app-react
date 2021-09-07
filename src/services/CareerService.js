import clienteAxios from "../config/AxiosConfig";

const model = "career";

const getCareers = async () => {
  const resp = await clienteAxios.get(`/${model}`);
  return resp.data;
};

const getCareerByIdInstitute = async (id) => {
  const resp = await clienteAxios.get(`/${model}/${id}`);
  return resp.data;
};

export { getCareers, getCareerByIdInstitute };
